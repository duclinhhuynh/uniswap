// SPDX-License-Identifier: MIT
pragma solidity >0.6.0 <0.9.0;
pragma abicoder v2;

import "@uniswap/v3-core/contracts/interfaces/IUniswapV3Pool.sol";
import "@uniswap/v3-core/contracts/libraries/TickMath.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "@uniswap/v3-periphery/contracts/libraries/TransferHelper.sol";
import "@uniswap/v3-periphery/contracts/interfaces/INonfungiblePositionManager.sol";
import "@uniswap/v3-periphery/contracts/base/LiquidityManagement.sol";
import "hardhat/console.sol";

contract UniswapV3Liquidity is IERC721Receiver {
    address private constant DAI = 0x6B175474E89094C44Da98b954EedeAC495271d0F;
    address private constant WETH = 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2;
    address private constant USDC = 0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48;
    // 0.01% fee
    uint24 public constant poolFee = 100;
    INonfungiblePositionManager public nongfungiblePositionManager = 
        INonfungiblePositionManager(0xC36442b4a4522E871399CD717aBDD847Ab11FE88);

    struct Deposit {
        address owner;
        uint128 liquidity;
        address token0;
        address token1;
    }

    mapping(uint => Deposit) public deposits;
    // store token id used in this example 
    uint public tokenId;

    // Implementing `onERC721Recived` so this contract can receive custody 
    function onERC721Received(
        address operator,
        address,
        uint _tokenId,
        bytes calldata
    ) external override returns (bytes4) {
        _createDeposit(operator, _tokenId);
        return this.onERC721Received.selector;
    }

    function _createDeposit(address owner, uint _tokenId) internal {
        (
            ,
            ,
            address token0,
            address token1,
            ,
            ,
            ,
            uint128 liquidity,
            ,
            ,
            ,
        ) = nongfungiblePositionManager.positions(_tokenId);
        // set the owner and data for position 
        deposits[_tokenId] = Deposit({
            owner: owner,
            liquidity: liquidity,
            token0: token0,
            token1: token1
        });
        console.log("Token id", _tokenId);
        console.log("Liquidity", liquidity);
        tokenId = _tokenId;
    }

    function mintNewPosition()
        external
        returns (
            uint _tokenId,
            uint128 liquidity,
            uint amount0,
            uint amount1
        )
    {
        uint amount0ToMint = 100 * 1e18;
        uint amount1ToMint = 100 * 1e6;
        // Approve the position manager
        TransferHelper.safeApprove(
            DAI,
            address(nongfungiblePositionManager),
            amount0ToMint
        );
        TransferHelper.safeApprove(
            USDC,
            address(nongfungiblePositionManager),
            amount1ToMint
        );
        INonfungiblePositionManager.MintParams memory params = INonfungiblePositionManager.MintParams({
            token0: DAI,
            token1: USDC,
            fee: poolFee,
            tickLower: TickMath.MIN_TICK,
            tickUpper: TickMath.MAX_TICK,
            amount0Desired: amount0ToMint,
            amount1Desired: amount1ToMint,
            amount0Min: 0,
            amount1Min: 0,
            recipient: address(this),
            deadline: block.timestamp 
        });

        // that the pool defined by DAI/USDC and fee tier 0.01% must 
        // already be created and initialized in order to mint
        (_tokenId, liquidity ,amount0, amount1) = nongfungiblePositionManager.mint(params);
        // create a deposit 
        _createDeposit(msg.sender, _tokenId);
        // Remove 
        if(amount0 < amount0ToMint) {
            TransferHelper.safeApprove(
                DAI,
                address(nongfungiblePositionManager),
                0
            );
            uint refund0 = amount0ToMint - amount0;
            TransferHelper.safeTransfer(DAI, msg.sender, refund0);
        }
         if(amount1 < amount1ToMint) {
            TransferHelper.safeApprove(
                USDC,
                address(nongfungiblePositionManager),
                0
            );
            uint refund1 = amount1ToMint - amount1;
            TransferHelper.safeTransfer(USDC, msg.sender, refund1);
        }
    }

    function collectAllFees() external returns (uint256 amount0, uint256 amount1){
        // set amount0Max and amount1Max to  uint256.max to collect all fees 
        // alternatively can set recipient to msg.sender and avoid another transaction in `sendToOwner`
        INonfungiblePositionManager.CollectParams memory params = 
            INonfungiblePositionManager.CollectParams({
                tokenId: tokenId,
                recipient: address(this),
                amount0Max: type(uint128).max,
                amount1Max: type(uint128).max
            });
        (amount0, amount1) = nongfungiblePositionManager.collect(params);
        console.log("fee 0", amount0);
        console.log("fee 1", amount1);
    }

    function increaseLiquidityCurrentRange(
        uint256 amountToAdd0,
        uint256 amountToAdd1
    )
        external
        returns (
            uint128 liquidity,
            uint256 amount0,
            uint256 amount1
        )
    {
        TransferHelper.safeTransferFrom(DAI, msg.sender, address(this), amountToAdd0);
        TransferHelper.safeTransferFrom(USDC, msg.sender, address(this), amountToAdd1);
        TransferHelper.safeApprove(DAI, address(nongfungiblePositionManager), amountToAdd0);
        TransferHelper.safeApprove(USDC, address(nongfungiblePositionManager), amountToAdd1);
        INonfungiblePositionManager.IncreaseLiquidityParams memory params = 
            INonfungiblePositionManager.IncreaseLiquidityParams({
                tokenId: tokenId,
                amount0Desired: amountToAdd0,
                amount1Desired: amountToAdd1,
                amount0Min: 0,
                amount1Min: 0,
                deadline: block.timestamp
            });
        (liquidity, amount0, amount1) = nongfungiblePositionManager.increaseLiquidity(params);
        console.log("liquidity", liquidity);
        console.log("amount 0", amount0);
        console.log("amount 1", amount1);
    }

    function getLiquidity(uint _tokenId) external view returns (uint128){
        (
            ,
            ,
            ,
            ,
            ,
            ,
            ,
            uint128 liquidity,
            ,
            ,
            ,
        ) = nongfungiblePositionManager.positions(_tokenId);
        return liquidity;
    }


    function decreaseLiquidity(uint128 liquidity) external returns (uint amount0, uint amount1){
        INonfungiblePositionManager.DecreaseLiquidityParams memory params = 
            INonfungiblePositionManager.DecreaseLiquidityParams({
                tokenId: tokenId,
                liquidity: liquidity,
                amount0Min: 0,
                amount1Min: 0,
                deadline: block.timestamp
        });
        (amount0, amount1) = nongfungiblePositionManager.decreaseLiquidity(params);
        console.log("amount 0", amount0);
        console.log("amount 1", amount1);
    }
   
}

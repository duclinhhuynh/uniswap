// SPDX-License-Identifier: MIT

pragma solidity >=0.7.6 <0.9.0;
pragma abicoder v2;

import "./interfaces/IERC20.sol";
import "./interfaces/IWETH.sol";
import "./interfaces/ISwapRouter.sol";

contract UniswapV3MultiHopSwap {
    ISwapRouter private constant router =
        ISwapRouter(0xE592427A0AEce92De3Edee1F18E0157C05861564);

    address private constant WETH = 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2;
    address private constant USDC = 0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48;
    address private constant DAI = 0x6B175474E89094C44Da98b954EedeAC495271d0F;

    IWETH private constant weth = IWETH(WETH);
    IERC20 private constant dai = IERC20(DAI);
    // This section specifies the contract's SPDX license identifier and pragma directives.
    // It imports necessary interfaces for ERC20 tokens, WETH (Wrapped Ether), and the Uniswap V3 router.
    // The contract then declares variables for the Uniswap V3 router (router) and the addresses of WETH, USDC, and DAI tokens.

    function swapExactInputMultiHop(uint amountIn, uint amountOutMin) external {
        weth.transferFrom(msg.sender, address(this), amountIn);
        weth.approve(address(router), amountIn);

        bytes memory path = abi.encodePacked(
            WETH,
            uint24(3000),
            USDC,
            uint24(100),
            DAI
        );

        ISwapRouter.ExactInputParams memory params = ISwapRouter
            .ExactInputParams({
                path: path,
                recipient: msg.sender,
                deadline: block.timestamp,
                amountIn: amountIn,
                amountOutMinimum: amountOutMin
            });

        router.exactInput(params);
    }
    //  allows users to swap a specific amount of input token (WETH) 
    // for an output token (DAI) with a minimum expected output.
    // creates an ExactInputParams struct containing information about the swap.

    function swapExactOutputMultiHop(uint amountOut, uint amountInMax)
        external
    {
        weth.transferFrom(msg.sender, address(this), amountInMax);
        weth.approve(address(router), amountInMax);

        bytes memory path = abi.encodePacked(
            DAI,
            uint24(100),
            USDC,
            uint24(3000),
            WETH
        );

        ISwapRouter.ExactOutputParams memory params = ISwapRouter
            .ExactOutputParams({
                path: path,
                recipient: msg.sender,
                deadline: block.timestamp,
                amountOut: amountOut,
                amountInMaximum: amountInMax
            });

        uint amountIn = router.exactOutput(params);

        if (amountIn < amountInMax) {
            weth.approve(address(router), 0);
            weth.transfer(msg.sender, amountInMax - amountIn);
        }
    }

}

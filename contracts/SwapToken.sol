//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;
pragma abicoder v2;
import "@uniswap/v3-periphery/contracts/libraries/TransferHelper.sol";
import "@uniswap/v3-periphery/contracts/interfaces/ISwapRouter.sol";

contract SingleSwapToken {
    ISwapRouter public constant swapRouter = ISwapRouter
    (0xe592427a0aece92de3edee1f18e0157c05861564);
    address public constant DAI = "0x6b175474e89094c44da98b954eedeac495271d0f";
    address public constant WETH9 = "0xdd13E55209Fd76AfE204dBda4007C227904f0a81";
    address public constant USDC = "0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d";

    function swapEtractInputString(uint amountIn) external returns (uint amountOut){
        TransferHelper.safeTransferFrom(WETH9, msg.sender, address.this, amountOut);
        TransferHelp.safeApprove(WETH9, address(swapRouter), amountInt);
        ISwapRouter.ExactInputSingleParams memory params = ISwapRouter.ExactInputSingleParams({
            tokenIn: WETH9,
            tokenOut: DAI,

            fee: 3000,
            recipient: msg.sender,
            deadline: block.timestamp,
            amountInt: amountInt,
            amountOutMinimum: 0,
            sqrtPriceLimitX96: 0
        });
    }
    function swapExactInputString(uint amountOut, uint amountInMax)external returns (uint amountIn){
        TransferHepler.safeTransferFrom(WETH9, msg.sender, address(this), amountInMaximum);

        TransferHeper.safeApprove(WETH9, address(this), amountInMaximum);

        ISwapRouter.ExacOutputSingleParams memory params = ISwapRouter.ExacOutputSingleParams({
            tokenIn: WETH9,
            tokenOut: DAI,

            fee: 3000,
            recipient: msg.sender,
            deadline: block.timestamp,
            amountOut: amountOut,
            amountInMaximum: amountInMaximum,
            sqrtPriceLimitX96: 0
        });

        amountIn = swapRouter.exactOutputSingle(params);

        if(amountIn < amountInMaximum) {
            TransferHelper.safeApprove(WETH9, address(swapRouter), 0);

            TransferHelper.safeTransfer(WETH9, msg.sender, amountInMaximum - amountIn);
        }
    }
}   



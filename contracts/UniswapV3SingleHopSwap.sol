// SPDX-License-Identifier: GPL-2.0-or-later

pragma solidity >=0.7.6 <0.9.0;
pragma abicoder v2;

import "@uniswap/v3-periphery/contracts/interfaces/ISwapRouter.sol";
import "@uniswap/v3-periphery/contracts/libraries/TransferHelper.sol";
// import "./interfaces/IERC20.sol";

// import "./interfaces/ISwapRouter.sol";

contract UniswapV3SingleHopSwap {
    ISwapRouter private constant router =
        ISwapRouter(0xE592427A0AEce92De3Edee1F18E0157C05861564);

    // address private constant token1 = 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2;
    // address private constant token2 = 0x6B175474E89094C44Da98b954EedeAC495271d0F;

    // Itoken1 private constant token1 = Itoken1(token1);
    // IERC20 private constant token2 = IERC20(token2);

    function swapExactInputSingleHop(address token1, address token2, uint amountIn, uint amountOutMin)
        external
    {
        TransferHelper.safeTransferFrom(token1,msg.sender, address(this), amountIn);
        TransferHelper.safeApprove(token1, address(router), amountIn);
        ISwapRouter.ExactInputSingleParams memory params = ISwapRouter
            .ExactInputSingleParams({
                tokenIn: token1,
                tokenOut: token2,
                fee: 3000,
                recipient: msg.sender,
                deadline: block.timestamp,
                amountIn: amountIn,
                amountOutMinimum: amountOutMin,
                sqrtPriceLimitX96: 0
            });
        router.exactInputSingle(params);
    }

    function swapExactOutputSingleHop(address token1, address token2,uint amountOut, uint amountInMax)
        external
    {
        TransferHelper.safeTransferFrom(token1, msg.sender, address(this), amountInMax);
        TransferHelper.safeApprove(token1,address(router), amountInMax);
        ISwapRouter.ExactOutputSingleParams memory params = ISwapRouter
            .ExactOutputSingleParams({
                tokenIn: token1,
                tokenOut: token2,
                fee: 3000,
                recipient: msg.sender,
                deadline: block.timestamp,
                amountOut: amountOut,
                amountInMaximum: amountInMax,
                sqrtPriceLimitX96: 0
            });
        uint amountIn = router.exactOutputSingle(params);

        if (amountIn < amountInMax) {
            TransferHelper.safeApprove(token1, address(router), 0);
            TransferHelper.safeTransfer(
                token1, 
                msg.sender, 
                amountInMax - amountIn
                );
        }
    }
}

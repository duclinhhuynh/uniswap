const { ethers } = require("hardhat");
const { expect } = require("chai");
const { BigNumber } = require("ethers");

const WETH = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
const USDC = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";
const DAI = "0x6B175474E89094C44Da98b954EedeAC495271d0F";

describe("UniswapV3", function () {
  describe("Uniswap V3 Single Hop Swap", function () {
    let accounts, dai, weth, uniswapV3SingleHopSwap;

    beforeEach(async function () {
      accounts = await ethers.getSigners();
      dai = await ethers.getContractAt("ERC20", DAI);
      weth = await ethers.getContractAt("IWETH", WETH);

      const UniswapV3SingleHopSwap = await ethers.getContractFactory(
        "UniswapV3SingleHopSwap"
      );

      uniswapV3SingleHopSwap = await UniswapV3SingleHopSwap.deploy();
      await uniswapV3SingleHopSwap.deployed();
    });

    // it("swapExactInputSingle", async function () {
    //   const amountIn = BigNumber.from("3");

    //   await weth.deposit({ value: amountIn });

    //   await weth.approve(uniswapV3SingleHopSwap.address, amountIn);

    //   await uniswapV3SingleHopSwap.swapExactInputSingleHop(amountIn, 1);

    //   const daiBalance = await dai.balanceOf(accounts[0].address);
    //   console.log("DAI balance after", daiBalance);
    // });
    it("swapExactInputSingle", async function () {
      const amountIn = 10n ** 18n;

      await weth.deposit({ value: amountIn });

      await weth.approve(uniswapV3SingleHopSwap.address, amountIn);

      await uniswapV3SingleHopSwap.swapExactInputSingleHop(amountIn, 1);
      console.log("acc", accounts[0].address);
      const daiBalance = await dai.balanceOf(accounts[0].address);
      const TokenLeft = BigNumber.from(daiBalance).toString();
      const tokenTokenBal = ethers.utils.formatEther(TokenLeft);
      console.log("DAI balance after", tokenTokenBal);
    });
  });

  // describe("UniswapV3MultiHopSwap", function () {
  //   let accounts, dai, weth, uniswapV3MultiHopSwap;

  //   beforeEach(async function () {
  //     accounts = await ethers.getSigners();

  //     dai = await ethers.getContractAt("ERC20", DAI);
  //     weth = await ethers.getContractAt("IWETH", WETH);

  //     const UniswapV3MultiHopSwap = await ethers.getContractFactory(
  //       "UniswapV3MultiHopSwap"
  //     );

  //     uniswapV3MultiHopSwap = await UniswapV3MultiHopSwap.deploy();
  //     await uniswapV3MultiHopSwap.deployed();
  //   });

  //   it("swapExactInputMultiHop", async function () {
  //     const amountIn = 10n ** 18n;

  //     await weth.deposit({ value: amountIn });
  //     await weth.approve(uniswapV3MultiHopSwap.address, amountIn);

  //     await uniswapV3MultiHopSwap.swapExactInputMultiHop(amountIn, 1);

  //     console.log(
  //       "DAI balance after",
  //       await dai.balanceOf(accounts[0].address)
  //     );
  //   });

  //   it("swapExactOutputMultiHop", async function () {
  //     // 1 ETH will be sent and we will try to get 100 DAI
  //     const amountInMax = 10n ** 18n;
  //     const amountOut = 100n * 10n ** 18n;

  //     await weth.deposit({ value: amountInMax });
  //     await weth.approve(uniswapV3MultiHopSwap.address, amountInMax);

  //     await uniswapV3MultiHopSwap.swapExactOutputMultiHop(
  //       amountOut,
  //       amountInMax
  //     );

  //     console.log(
  //       "DAI balance after",
  //       await dai.balanceOf(accounts[0].address)
  //     );
  //   });
  // });
});

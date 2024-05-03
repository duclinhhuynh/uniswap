const { expect } = require("chai");
const { ethers } = require("hardhat")

const DAI = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
const WETH9 = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
const USDC = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";

describe("SingleSwapToken", function () {
  let accounts;
  let singleSwapToken;
  let weth;
  let dai;
  let usdc;

  before(async () => {
    accounts = await ethers.getSigners(2); // Increased to 2 signers for better testing
    const SingleSwapToken = await ethers.getContractFactory("SingleSwapToken");
    singleSwapToken = await SingleSwapToken.deploy();
    await singleSwapToken.deployed();

    weth = await ethers.getContractAt("IWETH", WETH9);
    dai = await ethers.getContractAt("IERC20", DAI);
    usdc = await ethers.getContractAt("IERC20", USDC);

    console.log("Contract deployed to:", singleSwapToken.address);

    // console.log(weth);
    // console.log(dai);
    // console.log(usdc);
    // console.log("accounts", accounts);
    // console.log("singleSwapToken",singleSwapToken);
  });
  it("swapExactInputSingle", async () => {
    const amountIn = ethers.BigNumber.from(10); // Use ethers.BigNumber for consistency

    // Deposit WETH into the contract
    console.log("Depositing WETH into the contract...");
    await weth.deposit({ value: amountIn });
    console.log("WETH deposited.");

    // Approve the contract to spend WETH
    console.log("Approving contract to spend WETH...");
    await weth.approve(singleSwapToken.address, amountIn);
    console.log("Approval granted.");

    try {
        // Swap WETH for DAI
        console.log("Swapping WETH for DAI...");
        await singleSwapToken.swapExactInputSingle(amountIn);
        console.log("WETH swapped for DAI.");

        // Check DAI balance
        const daiBalance = await dai.balanceOf(accounts[1].address);
        console.log("Dai balance:", ethers.utils.formatEther(daiBalance));
    } catch (error) {
        console.error("Swap failed:", error.message);
    }
});

  // it("swapExactOutputSingle", async() => {
  //   const wethAmountInMax = 10n ** 18n;
  //   const daiAmounOut = 100n * 10n ** 18n;
  //   // Deposit weth
  //   await weth.deposit({value: wethAmountInMax});
  //   await weth.approve(singleSwapToken.address, wethAmountInMax);

  //   // swap
  //   await singleSwapToken.swapExactOutputSingle(daiAmounOut, wethAmountInMax)
  //   console.log(accounts[0].address);
  //   console.log(accounts[1].address);
  //   console.log("Dai balance", await dai.balanceOf(accounts[0].address));
  //   console.log("Dai balance", await dai.balanceOf(accounts[1].address));
  // });
});
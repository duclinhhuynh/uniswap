const { expect } = require("chai");
const { ethers } = require("hardhat")

const DAI = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
const WETH9 = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
const USDC = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";

describe("SwapMultiHop", function () {
  let accounts;
  let swapMultiHop;
  let weth;
  let dai;
  let usdc;

  before(async () => {
    accounts = await ethers.getSigners(2); 

    const SwapMultiHop = await ethers.getContractFactory("SwapMultiHop");
    swapMultiHop = await SwapMultiHop.deploy();
    await swapMultiHop.deployed();
    console.log("swap",swapMultiHop);
    weth = await ethers.getContractAt("IWETH", WETH9);
    dai = await ethers.getContractAt("IERC20", DAI);
    usdc = await ethers.getContractAt("IERC20", USDC);

    console.log("Contract deployed to:", swapMultiHop.address);
  });
  it("swapExactInputMultiHop", async () => {
    const amountIn = 1n ** 1n; // Use ethers.BigNumber for consistency

    // Deposit WETH into the contract
    console.log("Depositing WETH into the contract...");
    await weth.deposit({ value: amountIn });
    console.log("WETH deposited.");

    // Approve the contract to spend WETH
    console.log("Approving contract to spend WETH...");
    await weth.approve(swapMultiHop.address, amountIn);
    console.log("Approval granted.");

    try {
        // Swap WETH for DAI
        console.log("Swapping WETH for DAI...");
        await swapMultiHop.swapExactInputMultiHop(amountIn);
        console.log("WETH swapped for DAI.");

        // Check DAI balance
        const daiBalance = await dai.balanceOf(accounts[0].address);
        console.log("Dai balance:", daiBalance);
    } catch (error) {
        console.error("Swap failed:", error.message);
    }
});

});

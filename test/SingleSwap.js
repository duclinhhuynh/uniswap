const { expect } = require("chai");
const { ethers } = require("hardhat");

const DAI = "0x6b175474e89094c44da98b954eedeac495271d0f";
const WETH9 = "0xdd13E55209Fd76AfE204dBda4007C227904f0a81";
const USDC = "0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d";

describe("SingleSwapToken", function () {
  it("Should return the new greeting once it's changed", async function () {
    let SingleSwapToken;
    let accounts;
    let weth;
    let dai;
    let usdc;

    before(async() => {
      accounts = await ethers.getSigners(1);

      const SingleSwapToken = await ethers.getContractFactory("SingSwapToken");
      singleSwapToken = await SingleSwapToken.deploy();
      
      await singleSwapToken.deployed();

      weth = await ethers.getContractAt("IWETH", WETH9());
      weth = await ethers.getContractAt("IERC20", DAI());
      weth = await ethers.getContractAt("IERC20", USDC());

      console.log(weth);
      console.log(dai);
      console.log(usdc);
      console.log(accounts);
      console.log(singleSwapToken);
    })
    await greeter.deployed();

    expect(await greeter.greet()).to.equal("Hello, world!");

    const setGreetingTx = await greeter.setGreeting("Hola, mundo!");

    // wait until the transaction is mined
    await setGreetingTx.wait();

    expect(await greeter.greet()).to.equal("Hola, mundo!");
  });
});

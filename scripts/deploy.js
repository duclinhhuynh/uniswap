// script/deploy.js
const { ethers } = require("hardhat");

async function main() {
  try {
    // Load the Greeter contract factory
    const BooToken = await ethers.getContractFactory("BooToken");

    // Deploy the Greeter contract
    const booToken = await BooToken.deploy();
    await booToken.deployed();

    console.log("BooToken deployed to:", booToken.address);

    // life
    const LifeToken = await ethers.getContractFactory("LifeToken");
    const life = await LifeToken.deploy();
    await life.deployed();

    console.log("Greeter LifeToken to:", life.address);

    const UniswapV3SingleHopSwap = await ethers.getContractFactory("UniswapV3SingleHopSwap");
    const Single = await UniswapV3SingleHopSwap.deploy();
    await Single.deployed();

    console.log("Single deployed to:", Single.address);


    const UniswapV3MultiHopSwap = await ethers.getContractFactory("UniswapV3MultiHopSwap");
    const swapMultiHop = await UniswapV3MultiHopSwap.deploy();
    await swapMultiHop.deployed();

    console.log("Muitilple deployed to:", swapMultiHop.address);
  } catch (error) {
    console.error("Error deploying Single:", error);
    process.exit(1); // Exit with error code 1 if there's an error
  }
}

// Execute the main function
main();

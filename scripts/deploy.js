// script/deploy.js
const { ethers } = require("hardhat");

async function main() {
  try {
    // Load the Greeter contract factory
    
    // Deploy the Greeter contract
    // Huynh token
    const HuynhToken = await ethers.getContractFactory("HuynhToken");
    const huynhToken = await HuynhToken.deploy();
    await huynhToken.deployed();
    console.log("Huynh Token deployed to:", huynhToken.address);

    // Doan Token 
    const DoanToken = await ethers.getContractFactory("DoanToken");
    const doanToken = await DoanToken.deploy();
    await doanToken.deployed();
    console.log("Doan Token deployed to:", doanToken.address);
    // Duc token
    const DucToken = await ethers.getContractFactory("DucToken");
    const ducToken = await DucToken.deploy();
    await ducToken.deployed();
    console.log("Duc Token deployed to:", ducToken.address);
    // Linh Token 
    const LinhToken = await ethers.getContractFactory("LinhToken");
    const linhToken = await LinhToken.deploy();
    await linhToken.deployed();
    console.log("Linh Token deployed to:", linhToken.address);
    // // Boo
    // const BooToken = await ethers.getContractFactory("BooToken");
    // const booToken = await BooToken.deploy();
    // await booToken.deployed();

    // console.log("BooToken deployed to:", booToken.address);

    // // life
    // const LifeToken = await ethers.getContractFactory("LifeToken");
    // const life = await LifeToken.deploy();
    // await life.deployed();

    // console.log("LifeToken to:", life.address);

    // weth token

    // single
    const UniswapV3SingleHopSwap = await ethers.getContractFactory("UniswapV3SingleHopSwap");
    const Single = await UniswapV3SingleHopSwap.deploy();
    await Single.deployed();

    console.log("Single deployed to:", Single.address);


    // const UniswapV3MultiHopSwap = await ethers.getContractFactory("UniswapV3MultiHopSwap");
    // const swapMultiHop = await UniswapV3MultiHopSwap.deploy();
    // await swapMultiHop.deployed();

    // console.log("Muitilple deployed to:", swapMultiHop.address);
  } catch (error) {
    console.error("Error deploying Single:", error);
    process.exit(1); // Exit with error code 1 if there's an error
  }
}

// Execute the main function
main();

// script/deploy.js
const { ethers } = require("hardhat");

async function main() {
  try {
    // Load the Greeter contract factory
    const Greeter = await ethers.getContractFactory("Greeter");

    // Deploy the Greeter contract
    console.log("Deploying Greeter...");
    const greeter = await Greeter.deploy("Hello, Hardhat!");
    await greeter.deployed();

    console.log("Greeter deployed to:", greeter.address);
  } catch (error) {
    console.error("Error deploying Greeter:", error);
    process.exit(1); // Exit with error code 1 if there's an error
  }
}

// Execute the main function
main();

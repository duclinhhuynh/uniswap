const hre = require("hardhat");

async function main() {
  try {
    // Get the contract factory for Greeter
    const Greeter = await hre.ethers.getContractFactory("Greeter");
    
    // Deploy the Greeter contract
    const greeter = await Greeter.deploy("Hello, Hardhat!");
    await greeter.deployed();

    console.log("Greeter deployed to:", greeter.address);
  } catch (error) {
    console.error(error);
    process.exit(1); // Exit with error code 1 if there's an error
  }
}

// Execute the main function
main().then(() => process.exit(0)).catch((error) => {
  console.error(error);
  process.exit(1); // Exit with error code 1 if there's an error
});
require("@nomiclabs/hardhat-waffle");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: {
    version: "0.8.20", // Update this to the desired Solidity compiler version
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },

  // networks:{
  //   hardhat:{
  //     forking:{
  //       url: "https://eth-mainnet.g.alchemy.com/v2/G620jCKVEA5SJSth08jgKl-sgtQ2Lw6_"
  //     }
  //   }
  // }
};
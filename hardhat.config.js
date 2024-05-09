require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.7.6",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },

      // { version: "0.4.11" },
      { version: "0.8.17" },
    ],
  },
  defaultNetwork: 'hardhat',
  networks: {
    hardhat: {
      forking: {
        url: `https://eth-mainnet.g.alchemy.com/v2/8f4wH1YOAWdIav37DTEjj7qXcpGlvj7D`,
      },
    },
  },
  // networks: {
  //   hardhat: {
  //     forking: {
  //       url: `http://localhost:8545`,
  //     },
  //   },
  // },
};

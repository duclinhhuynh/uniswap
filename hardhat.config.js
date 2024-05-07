require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.7.6",
        settings: {
          evmVersion: "istanbul",
          optimizer: {
            enabled: true,
            runs: 1000,
          },
        },
      },

      // { version: "0.4.11" },
      { version: "0.8.17" },
    ],
  },
  networks: {
    hardhat: {
      forking: {
        url: `https://eth-mainnet.g.alchemy.com/v2/8f4wH1YOAWdIav37DTEjj7qXcpGlvj7D`,
      },
    },
  },
};

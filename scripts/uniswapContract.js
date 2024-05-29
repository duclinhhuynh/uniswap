const { ContractFactory, utils } = require("ethers");
const { ethers } = require("hardhat");
const artifacts = {
    WETH: require("../context/WETH9.json"),
    UniswapV3Factory: require("@uniswap/v3-core/artifacts/contracts/UniswapV3Factory.sol/UniswapV3Factory.json"),
    SwapRouter: require("@uniswap/v3-periphery/artifacts/contracts/SwapRouter.sol/SwapRouter.json"),
    NFTDescriptor: require("@uniswap/v3-periphery/artifacts/contracts/libraries/NFTDescriptor.sol/NFTDescriptor.json"),
    NonfungiblePositionManager: require("@uniswap/v3-periphery/artifacts/contracts/NonfungiblePositionManager.sol/NonfungiblePositionManager.json"),
    NonfungiblePositionDescriptor: require("@uniswap/v3-periphery/artifacts/contracts/NonfungibleTokenPositionDescriptor.sol/NonfungibleTokenPositionDescriptor.json")
};

const linkLibraries = ({ bytecode, linkReferences }, libraries) => {
    Object.keys(linkReferences).forEach((fileName) => {
        Object.keys(linkReferences[fileName]).forEach((contractName) => {
            if (!libraries.hasOwnProperty(contractName)) {
                throw new Error(`Missing link library name ${contractName}`);
            }
            const address = utils
                .getAddress(libraries[contractName])
                .toLowerCase()
                .slice(2);
            linkReferences[fileName][contractName].forEach(({ start, length }) => {
                const start2 = 2 + start * 2;
                const length2 = length * 2;

                bytecode =
                    bytecode.slice(0, start2) +
                    address +
                    bytecode.slice(start2 + length2);
            });
        });
    });
    return bytecode;
};

async function main() {
    const [owner] = await ethers.getSigners();

    console.log("Deploying WETH...");
    console.log("WETH ABI:", artifacts.WETH.abi);
    console.log("WETH Bytecode:", artifacts.WETH.bytecode);

    if (!artifacts.WETH.bytecode) {
        throw new Error("WETH bytecode is missing");
    }

    const WethFactory = new ContractFactory(
        artifacts.WETH.abi,
        artifacts.WETH.bytecode,
        owner
    );
    const weth = await WethFactory.deploy();
    await weth.deployed();
    console.log("WETH deployed at:", weth.address);

    console.log("Deploying UniswapV3Factory...");
    const Factory = new ContractFactory(
        artifacts.UniswapV3Factory.abi,
        artifacts.UniswapV3Factory.bytecode,
        owner
    );
    const factory = await Factory.deploy();
    await factory.deployed();
    console.log("UniswapV3Factory deployed at:", factory.address);

    console.log("Deploying SwapRouter...");
    const SwapRouterFactory = new ContractFactory(
        artifacts.SwapRouter.abi,
        artifacts.SwapRouter.bytecode,
        owner
    );
    const swapRouter = await SwapRouterFactory.deploy(factory.address, weth.address);
    await swapRouter.deployed();
    console.log("SwapRouter deployed at:", swapRouter.address);

    console.log("Deploying NFTDescriptor...");
    const NFTDescriptorFactory = new ContractFactory(
        artifacts.NFTDescriptor.abi,
        artifacts.NFTDescriptor.bytecode,
        owner
    );
    const nftDescriptor = await NFTDescriptorFactory.deploy();
    await nftDescriptor.deployed();
    console.log("NFTDescriptor deployed at:", nftDescriptor.address);

    console.log("Linking libraries for NonfungiblePositionDescriptor...");
    const linkedBytecode = linkLibraries(
        {
            bytecode: artifacts.NonfungiblePositionDescriptor.bytecode,
            linkReferences: {
                "NFTDescriptor.sol": {
                        NFTDescriptor: [
                            {
                                length: 20,
                                start: 1681
                            }
                        ]
                }
            },
        },
        {
            NFTDescriptor: nftDescriptor.address
        }
    );

    console.log("Deploying NonfungiblePositionDescriptor...");
    const NonfungiblePositionDescriptorFactory = new ContractFactory(
        artifacts.NonfungiblePositionDescriptor.abi,
        linkedBytecode,
        owner
    );
    const nonfungiblePositionDescriptor = await NonfungiblePositionDescriptorFactory.deploy(weth.address);
    await nonfungiblePositionDescriptor.deployed();
    console.log("NonfungiblePositionDescriptor deployed at:", nonfungiblePositionDescriptor.address);

    console.log("Deploying NonfungiblePositionManager...");
    const NonfungiblePositionManagerFactory = new ContractFactory(
        artifacts.NonfungiblePositionManager.abi,
        artifacts.NonfungiblePositionManager.bytecode,
        owner
    );
    const nonfungiblePositionManager = await NonfungiblePositionManagerFactory.deploy(
        factory.address,
        weth.address,
        nonfungiblePositionDescriptor.address
    );
    await nonfungiblePositionManager.deployed();
    console.log("NonfungiblePositionManager deployed at:", nonfungiblePositionManager.address);

    // Log addresses
    console.log("wethAddress=", `'${weth.address}'`);
    console.log("factoryAddress=", `'${factory.address}'`);
    console.log("swapRouterAddress=", `'${swapRouter.address}'`);
    console.log("nftDescriptorAddress=", `'${nftDescriptor.address}'`);
    console.log("nonfungiblePositionManagerAddress=", `'${nonfungiblePositionManager.address}'`);
    console.log("nonfungiblePositionDescriptorAddress=", `'${nonfungiblePositionDescriptor.address}'`);
}

/*
    npx hardhat run --network localhost scripts/uniswapContract.js
*/

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

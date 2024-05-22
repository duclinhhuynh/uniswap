const { ethers} = require("ethers");
const {
    abi: IUniswapV3PoolABI,
} = require("@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json");
const {
    abi: QuoterABI,
} = require("@uniswap/v3-periphery/artifacts/contracts/lens/Quoter.sol/Quoter.json");

const { getAbi, getPoolImmutables} = require("./priceHelpers");

const MAINET_URL = "https://eth-mainnet.g.alchemy.com/v2/8f4wH1YOAWdIav37DTEjj7qXcpGlvj7D";

const provider = new ethers.providers.JsonRpcProvider(MAINET_URL);

const qutorAddress = "0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6"; 

export const getPrice = async(inputAmount, poolAddress) => {
    const poolContract = new ethers.Contract(
        poolAddress,
        IUniswapV3PoolABI,
        provider,
    );
    // console.log(poolContract);
    const tokenAddss0 = await poolContract.token0();
    const tokenAddss1 = await poolContract.token1();
    console.log(tokenAddss0, tokenAddss1);
    
    const tokenAbi0 = await getAbi(tokenAddss0);
    const tokenAbi1 = await getAbi(tokenAddss1);

    const tokenContract0 = new ethers.Contract(tokenAddss0, tokenAbi0, provider);
    const tokenContract1 = new ethers.Contract(tokenAddss1, tokenAbi1, provider);

    const tokenSymbol0 = await tokenContract0.symbol();
    const tokenSymbol1 = await tokenContract1.symbol();
    const tokenDecimals0 = await tokenContract0.decimals();
    const tokenDecimals1 = await tokenContract1.decimals();

    const quoterContract = new ethers.Contract(qutorAddress, QuoterABI, provider);
    const immutables = await getPoolImmutables(poolContract);

    const amountIn = ethers.utils.parseUnits(
        inputAmount.toString(),
        tokenDecimals0
    )

    const quotedAmountOut = await quoterContract.callStatic.quoteExactInputSingle(
        // immutables.token0,
        immutables.token1, 
        immutables.fee,
        amountIn,
        0
    );
    const amountOut = ethers.utils.formatUnits(quotedAmountOut, tokenDecimals1);
    return [amountOut, tokenSymbol0, tokenSymbol1]
}

import booToken from './BooToken.json'
import lifeToken from './LifeToken.json'
import signleswap from './UniswapV3SingleHopSwap.json'
import MutilHopSwap from './UniswapV3MultiHopSwap.json'
import IWETH from "./IWETH.json"
// import ERC20 from "./ERC20.json"

export const BooTokenAddress = "0xF67e26649037695DdFAB19f4E22d5c9Fd1564592";
export const BooTokenABI = booToken.abi;
export const LifeTokenAddress = "0xeA8AE08513f8230cAA8d031D28cB4Ac8CE720c68";
export const LifeTokenABI = lifeToken.abi;
export const SingleSwapTokenAddress = "0x6431AF84d34F0522cAA58b221d94A150B5AdAC69";
export const SingleTokenABI = signleswap.abi;
export const MutilHopSwapTokenAddress = "0x18b7CBdfFA52d1e7BB992fd50f394c5b59E20B72";
export const MutilHopTokenABI = MutilHopSwap.abi;

// IWETH 
export const IWETHAddress = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
export const IWETHABI = IWETH.abi;

// export const ERC20 = ERC20.abi
// BooToken deployed to: 0xfb6dAB6200b8958C2655C3747708F82243d3F32E
// Greeter LifeToken to: 0x798f111c92E38F102931F34D1e0ea7e671BDBE31
// Single deployed to: 0xabebE9a2D62Af9a89E86EB208b51321e748640C3
// Muitilple deployed to: 0xf42Ec71A4440F5e9871C643696DD6Dc9a38911F8
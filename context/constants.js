
import booToken from './BooToken.json'
import lifeToken from './LifeToken.json'
import signleswap from './UniswapV3SingleHopSwap.json'
import MutilHopSwap from './UniswapV3MultiHopSwap.json'
import IWETH from "./IWETH.json"
// import ERC20 from "./ERC20.json"

export const BooTokenAddress = "0x3Af511B1bdD6A0377e23796aD6B7391d8De68636";
export const BooTokenABI = booToken.abi;
export const LifeTokenAddress = "0x10537D7bD661C9c34F547b38EC662D6FD482Ae95";
export const LifeTokenABI = lifeToken.abi;
export const SingleSwapTokenAddress = "0xBD2fe040D03EB1d1E5A151fbcc19A03333223019";
export const SingleTokenABI = signleswap.abi;
export const MutilHopSwapTokenAddress = "0xfb6dAB6200b8958C2655C3747708F82243d3F32E";
export const MutilHopTokenABI = MutilHopSwap.abi;

// IWETH 
export const IWETHAddress = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
export const IWETHABI = IWETH.abi;

// export const ERC20 = ERC20.abi
// BooToken deployed to: 0x3Af511B1bdD6A0377e23796aD6B7391d8De68636
// Greeter LifeToken to: 0x10537D7bD661C9c34F547b38EC662D6FD482Ae95
// Single deployed to: 0xBD2fe040D03EB1d1E5A151fbcc19A03333223019
// Muitilple deployed to: 0xfb6dAB6200b8958C2655C3747708F82243d3F32E
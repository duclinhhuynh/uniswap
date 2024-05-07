
import booToken from './Booken.json'
import lifeToken from './LifeToken.json'
import signleswap from './UniswapV3MultiHopSwap'
import MutilHopSwap from './UniswapV3MultiHopSwap'
import IWETH from "./IWETH.json"

export const BooTokenAddress = "0x93B800CD7ACdcA13754624D4B1A2760A86bE0D1f";
export const BooTokenABI = booToken.abi;
export const LifeTokenAddress = "0x8Aed6FE10dF3d6d981B101496C9c7245AE65cAEc";
export const LifeTokenABI = lifeToken.abi;
export const SingleSwapTokenAddress = "0x3Af511B1bdD6A0377e23796aD6B7391d8De68636";
export const SingleTokenABI = signleswap.abi;
export const MutilHopSwapTokenAddress = "0x10537D7bD661C9c34F547b38EC662D6FD482Ae95";
export const MutilHopTokenABI = MutilHopSwap.abi;

// IWETH 
export const IWETHAddress = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
export const IWETHABI = IWETH.abi;
// BooToken deployed to: 0x93B800CD7ACdcA13754624D4B1A2760A86bE0D1f
// Greeter LifeToken to: 0x8Aed6FE10dF3d6d981B101496C9c7245AE65cAEc
// Single deployed to: 0x3Af511B1bdD6A0377e23796aD6B7391d8De68636
// MutilHop deployed to: 0x10537D7bD661C9c34F547b38EC662D6FD482Ae95


import booToken from './BooToken.json'
import lifeToken from './LifeToken.json'
import huynhToken from './HuynhToken.json'
import doanToken from './DoanToken.json'
import ducToken from './DucToken.json'
import linhToken from './LinhToken.json'
import signleswap from './UniswapV3SingleHopSwap.json'
import MutilHopSwap from './UniswapV3MultiHopSwap.json'
import IWETH from "./IWETH.json"
// import ERC20 from "./ERC20.json"

export const HuynhTokenAddress = "0x82A9286dB983093Ff234cefCea1d8fA66382876B";
export const HuynhTokenAddressABI = huynhToken.abi;

export const DoanTokenAddress = "0x41219a0a9C0b86ED81933c788a6B63Dfef8f17eE";
export const DoanTokenAddressABI = doanToken.abi;

export const DucTokenAddress = "0x1d460d731Bd5a0fF2cA07309dAEB8641a7b175A1";
export const DucTokenAddressABI = ducToken.abi;

export const LinhTokenAddress = "0xF67e26649037695DdFAB19f4E22d5c9Fd1564592";
export const LinhTokenAddressABI = linhToken.abi;

// export const BooTokenAddress = "0xeA8AE08513f8230cAA8d031D28cB4Ac8CE720c68";
// export const BooTokenABI = booToken.abi;
// export const LifeTokenAddress = "0x6431AF84d34F0522cAA58b221d94A150B5AdAC69";
// export const LifeTokenABI = lifeToken.abi;
export const SingleSwapTokenAddress = "0x18b7CBdfFA52d1e7BB992fd50f394c5b59E20B72";
export const SingleTokenABI = signleswap.abi;
export const MutilHopSwapTokenAddress = "0x18b7CBdfFA52d1e7BB992fd50f394c5b59E20B72";
export const MutilHopTokenABI = MutilHopSwap.abi;

// IWETH 
export const IWETHAddress = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
export const IWETHABI = IWETH.abi;

// export const ERC20 = ERC20.abi
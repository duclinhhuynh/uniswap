
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

export const HuynhTokenAddress = "0x776D6996c8180838dC0587aE0DE5D614b1350f37";
export const HuynhTokenAddressABI = huynhToken.abi;

export const DoanTokenAddress = "0x3A906C603F080D96dc08f81CF2889dAB6FF299dE";
export const DoanTokenAddressABI = doanToken.abi;

export const DucTokenAddress = "0x820638ecd57B55e51CE6EaD7D137962E7A201dD9";
export const DucTokenAddressABI = ducToken.abi;

export const LinhTokenAddress = "0x725314746e727f586E9FCA65AeD5dBe45aA71B99";
export const LinhTokenAddressABI = linhToken.abi;

export const BooTokenAddress = "0x987Aa6E80e995d6A76C4d061eE324fc760Ea9F61";
export const BooTokenABI = booToken.abi;
export const LifeTokenAddress = "0x6B9C4119796C80Ced5a3884027985Fd31830555b";
export const LifeTokenABI = lifeToken.abi;
export const SingleSwapTokenAddress = "0x82A9286dB983093Ff234cefCea1d8fA66382876B";
export const SingleTokenABI = signleswap.abi;
export const MutilHopSwapTokenAddress = "0x18b7CBdfFA52d1e7BB992fd50f394c5b59E20B72";
export const MutilHopTokenABI = MutilHopSwap.abi;

// IWETH 
export const IWETHAddress = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
export const IWETHABI = IWETH.abi;

// export const ERC20 = ERC20.abi
// SPDX-License-Identifier: MIT
pragma solidity >=0.7.6 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract HuynhToken is ERC20{
    constructor()ERC20("HNH", "HUYNH"){
    _mint(msg.sender, 30000 * (10 ** 18));
    }  
}
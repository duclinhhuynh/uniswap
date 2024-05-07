// SPDX-License-Identifier: MIT
pragma solidity >=0.7.6 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract BooToken is ERC20{
    constructor()ERC20("LF", "LIFE"){
    _mint(msg.sender, 100000 * 10 * decimals());
    }  
}
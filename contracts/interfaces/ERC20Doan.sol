// SPDX-License-Identifier: MIT
pragma solidity >=0.7.6 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract DoanToken is ERC20{
    constructor()ERC20("DAN", "DOAN"){
    _mint(msg.sender, 80000 * (10 ** 18));
    }  
}
// SPDX-License-Identifier: MIT
pragma solidity >=0.7.6 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract DucToken is ERC20{
    constructor()ERC20("DUC", "DUC"){
    _mint(msg.sender, 50000 * (10 ** 18));
    }  
}
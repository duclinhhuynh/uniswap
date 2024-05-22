// SPDX-License-Identifier: MIT
pragma solidity >=0.7.6 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract LinhToken is ERC20{
    constructor()ERC20("LH", "LINH"){
    _mint(msg.sender, 20000 * (10 ** 18));
    }  
}
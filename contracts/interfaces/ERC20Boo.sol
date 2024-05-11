// SPDX-License-Identifier: MIT
pragma solidity >=0.7.6 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract BooToken is ERC20{
  constructor() ERC20("Bo", "BOO") {
    _mint(msg.sender, 100000 * (10 ** 18)); // 100,000 tokens with 18 decimal places
}
}
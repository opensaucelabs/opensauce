// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IOpenSauceToken {

    function distribute(
        string[] memory usernames,
        uint256[] memory amounts
    ) external ;

}

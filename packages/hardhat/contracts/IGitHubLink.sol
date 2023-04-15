// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IGitHubLink {

    // /**
    //  * @dev Emitted when the allowance of a `spender` for an `owner` is set by
    //  * a call to {approve}. `value` is the new allowance.
    //  */
    // event Approval(address indexed owner, address indexed spender, uint256 value);

    function linkedAccount(string memory _githubUsername) external view returns (address);

}

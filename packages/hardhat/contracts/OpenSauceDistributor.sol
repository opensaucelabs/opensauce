//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";

// A contract to propose the distribution of OpenSauceTokens.
// Todo: Integrate with token contract.
contract OpenSauceDistributor is Ownable {

    mapping(uint => mapping(string => uint256)) _claimableProposals;
    uint public _proposals;

    function proposeDistribution(
        string[] memory usernames,
        uint256[] memory amounts
    ) public onlyOwner {
        uint256 arrLength = usernames.length;
        require(arrLength == amounts.length, "invalid parameters");
        _proposals += 1;
        for (uint i = 0; i < arrLength; i++) {
            uint256 claimable = amounts[i];
            string memory username = usernames[i];
            _claimableProposals[_proposals][username] = claimable;
        }
    }

}

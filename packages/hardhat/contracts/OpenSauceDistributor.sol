//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "./IOpenSauceToken.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

// A contract to propose the distribution of OpenSauceTokens.
// Todo: Integrate with token contract.
contract OpenSauceDistributor is Ownable {

    mapping(uint => string[]) _proposedUsers;
    mapping(uint => uint256[]) _proposedAmounts;
    uint public _proposals;

    IOpenSauceToken _token;

    constructor(address token) {
        _token = IOpenSauceToken(token);
    }

    function proposeDistribution(
        string[] memory usernames,
        uint256[] memory amounts
    ) public onlyOwner {
        uint256 arrLength = usernames.length;
        require(arrLength == amounts.length, "invalid parameters");
        _proposedUsers[_proposals] = usernames;
        _proposedAmounts[_proposals] = amounts;
        _proposals += 1;
    }

    function getProposalUsers(uint id) public view returns (string[] memory) {
        return _proposedUsers[id];
    }

    function getProposalAmounts(uint id) public view returns (uint256[] memory) {
        return _proposedAmounts[id];
    }

    function distribute(uint id) public onlyOwner {
        _token.distribute(_proposedUsers[id], _proposedAmounts[id]);
        delete _proposedUsers[id];
        delete _proposedAmounts[id];
    }

}


//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import './OpenSauceToken.sol';
import "@openzeppelin/contracts/access/Ownable.sol";
import './IGitHubLink.sol';

// Factory contract for creating OpenSauce token contracts.
contract OpenSauce is Ownable {

    struct Repo { 
        string gitHubUrl;
        address creator;
        uint creatorGitHubId;
    }

    mapping (address => Repo) _repos;

    OpenSauceToken[] _spawnedContracts;

    IGitHubLink _gitHubLinkContract;

    function spawnContract(string memory gitHubUrl, uint creatorGitHubId, string memory name, string memory symbol, uint8 decimals_) public {
       OpenSauceToken spawn = new OpenSauceToken(name, symbol, decimals_, address(this)); 
       _spawnedContracts.push(spawn);
       _repos[address(spawn)] = Repo(gitHubUrl, msg.sender, creatorGitHubId);
    }

    function getSpawnedContracts() public view returns (OpenSauceToken[] memory){
        return _spawnedContracts;
    }

    function getRepoInfo(address repoContractAddress) public view returns (Repo memory) {
        return _repos[repoContractAddress];
    }

    function setGitHubLinkContract(address gitHubLinkContract) public {
        _gitHubLinkContract = IGitHubLink(gitHubLinkContract);
    }

    function linkedAccount(string memory username) public view returns (address) {
        return _gitHubLinkContract.linkedAccount(username);
    }

}

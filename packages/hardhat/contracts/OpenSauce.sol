
//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import './OpenSauceToken.sol';
import "@openzeppelin/contracts/access/Ownable.sol";

// Factory contract for creating OpenSauce token contracts.
contract OpenSauce is Ownable {

    struct Repo { 
        string gitHubUrl;
        address creator;
        uint creatorGitHubId;
    }

    mapping (address => Repo) repos;

    OpenSauceToken[] spawnedContracts;

    function spawnContract(address owner_, string memory gitHubUrl, uint creatorGitHubId, string memory name_, string memory symbol_, uint8 decimals_) public {
       OpenSauceToken spawn = new OpenSauceToken(owner_, name_, symbol_, decimals_); 
       spawnedContracts.push(spawn);
       repos[address(spawn)] = Repo(gitHubUrl, msg.sender, creatorGitHubId);
    }

    function getSpawnedContracts() public view returns (OpenSauceToken[] memory){
        return spawnedContracts;
    }

    function getRepoInfo(address repoContractAddress) public view returns (Repo memory) {
        return repos[repoContractAddress];
    }

}
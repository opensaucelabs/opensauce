//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "./OpenSauceToken.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./IGitHubLink.sol";

// Factory contract for creating OpenSauce token contracts.
contract OpenSauce is Ownable, IGitHubLink {

  struct Repo {
    string gitHubUrl;
    address creator;
    string creatorUserName;
  }

  mapping(address => Repo) _repos;

  OpenSauceToken[] _spawnedContracts;

  IGitHubLink _gitHubLinkContract;

  mapping(string => address[]) tokensForOwner;

  function spawnContract(
    string memory gitHubUrl,
    string memory username,
    string memory name,
    string memory symbol,
    uint8 decimals_
  ) public {
    OpenSauceToken spawn = new OpenSauceToken(name, symbol, decimals_, address(this));
    _spawnedContracts.push(spawn);
    _repos[address(spawn)] = Repo(gitHubUrl, msg.sender, username);
    tokensForOwner[username].push(address(spawn));
  }

  function getSpawnedContracts() public view returns (OpenSauceToken[] memory) {
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

  function getTokenForOwner(string memory username) public view returns (address[] memory) {
    return tokensForOwner[username];
  }

}
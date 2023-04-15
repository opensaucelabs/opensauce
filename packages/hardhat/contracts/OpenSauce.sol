//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "./OpenSauceToken.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./IGitHubLink.sol";

// Factory contract for creating OpenSauce token contracts.
contract OpenSauce is Ownable, IGitHubLink {

  OpenSauceToken[] _spawnedContracts;

  IGitHubLink _gitHubLinkContract;

  mapping(string => address[]) tokensForOwner;
  mapping(string => address) repoToken;

  function spawnContract(
    string memory gitHubUrl,
    string memory username,
    string memory tokenName,
    string memory tokenSymbol,
    uint8 tokenDecimals
  ) public onlyOneTokenPerRepo(gitHubUrl) {
    // todo: require(msg.sender == linkedAccount(username));
    OpenSauceToken spawn = new OpenSauceToken(tokenName, tokenSymbol, tokenDecimals, gitHubUrl, address(this));
    _spawnedContracts.push(spawn);
    tokensForOwner[username].push(address(spawn));
  }

  function setGitHubLinkContract(address gitHubLinkContract) public {
    _gitHubLinkContract = IGitHubLink(gitHubLinkContract);
  }

  function getSpawnedContracts() public view returns (OpenSauceToken[] memory) {
    return _spawnedContracts;
  }

  function linkedAccount(string memory username) public view returns (address) {
    return _gitHubLinkContract.linkedAccount(username);
  }

  function getTokenForOwner(string memory username) public view returns (address[] memory) {
    return tokensForOwner[username];
  }

  modifier onlyOneTokenPerRepo(string memory gitHubUrl) {
    require(repoToken[gitHubUrl] == address(0), "Token already exists for provided repo.");
    _;
  }

}

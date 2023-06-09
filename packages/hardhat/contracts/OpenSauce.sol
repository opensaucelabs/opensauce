//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "./OpenSauceToken.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./IGitHubLink.sol";

// Factory contract for creating OpenSauce token contracts.
contract OpenSauce is Ownable, IGitHubLink {

  OpenSauceToken[] _spawnedContracts;

  IGitHubLink _githubLinkContract;

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
    OpenSauceToken spawn = new OpenSauceToken(msg.sender, tokenName, tokenSymbol, tokenDecimals, gitHubUrl, address(this));
    _spawnedContracts.push(spawn);
    tokensForOwner[username].push(address(spawn));
  }

  function setGithubLinkContract(address githubLinkContract) public onlyOwner {
    _githubLinkContract = IGitHubLink(githubLinkContract);
  }

  function getSpawnedContracts() public view returns (OpenSauceToken[] memory) {
    return _spawnedContracts;
  }

  function linkedAccount(string memory username) public view returns (address) {
    return _githubLinkContract.linkedAccount(username);
  }

  function getTokensForOwner(string memory username) public view returns (address[] memory) {
    return tokensForOwner[username];
  }

  modifier onlyOneTokenPerRepo(string memory githubUrl) {
    require(repoToken[githubUrl] == address(0), "Token already exists for provided repo.");
    _;
  }

}

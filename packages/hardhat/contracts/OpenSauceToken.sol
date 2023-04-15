//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "./IGitHubLink.sol";

// An OpenSauce token contract.
contract OpenSauceToken is Ownable, ERC20 {
    
    uint public lastDistribution;
    string[] public contributorNames;
    mapping(string => bool) _isContributor;

    uint8 _decimals;
    string _githubUrl;
    address _creator;
    uint _creatorGitHubId;

    mapping(string => uint256) _claimable;
    mapping(string => uint256) _totalRewarded;

    IGitHubLink _githubLinkContract;

    constructor(
        address owner,
        string memory name,
        string memory symbol,
        uint8 decimals_,
        string memory githubUrl_,
        address githubLinkContractAddress
    )
        ERC20(name, symbol)
    {
        _transferOwnership(owner);
        _decimals = decimals_;
        _githubUrl = githubUrl_;
        _setGithubLinkContract(githubLinkContractAddress);
    }

    // public methods

    function setGithubLinkContract(address _address) public onlyOwner {
        _setGithubLinkContract(_address);
    }

    function distribute(
        string[] memory usernames,
        uint256[] memory amounts
    ) public onlyOwner {
        uint256 arrLength = usernames.length;
        require(arrLength == amounts.length, "invalid parameters");
        for (uint i = 0; i < arrLength; i++) {
            uint256 claimable_ = amounts[i];
            string memory username = usernames[i];
            _claimable[username] += claimable_;
            _totalRewarded[username] += claimable_;
            if (!_isContributor[username]) {
                contributorNames.push(username);
                _isContributor[username] = true;
            }
        }
        lastDistribution = block.number;
    }

    function claim(string memory username) public {
        address linkedAccount = _linkedAccount(username);
        require(linkedAccount == msg.sender, "no authorization");
        uint256 amount = _claimable[username];
        delete _claimable[username];
        _mint(linkedAccount, amount);
    }

    function claimable(string memory username) public view returns (uint256) {
        return _claimable[username];
    }

    function totalRewarded(string memory username) public view returns (uint256) {
        return _totalRewarded[username];
    }

    function allContributorNames() public view returns (string[] memory) {
        return contributorNames;
    }

    function nrContributers() public view returns (uint) {
        return contributorNames.length;
    }

    function githubUrl() public view returns (string memory) {
        return _githubUrl;
    }

    function decimals()
        public
        view
        virtual
        override
        returns (uint8)
    {
        return _decimals;
    }

    // private methods

    function _setGithubLinkContract(address _address) private {
        _githubLinkContract = IGitHubLink(_address);
    }

    function _linkedAccount(string memory githubUsername) private view returns (address) {
        return _githubLinkContract.linkedAccount(githubUsername);
    }

}

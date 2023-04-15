//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "./IGitHubLink.sol";

// An OpenSauce token contract.
contract OpenSauceToken is Ownable, ERC20 {
    
    uint public lastDistribution;
    string[] public contributorNames;

    uint8 _decimals;
    string _gitHubUrl;
    address _creator;
    uint _creatorGitHubId;

    mapping(string => uint256) _claimable;
    mapping(string => uint256) _totalRewarded;

    IGitHubLink _gitHubLinkContract;

    constructor(
        string memory name,
        string memory symbol,
        uint8 decimals_,
        string memory gitHubUrl_,
        address gitHubLinkContractAddress
    )
        ERC20(name, symbol)
    {
        _decimals = decimals_;
        _gitHubUrl = gitHubUrl_;
        _setGitHubLinkContract(gitHubLinkContractAddress);
    }

    // public methods

    function setGitHubLinkContract(address _address) public onlyOwner {
        _setGitHubLinkContract(_address);
    }

    function distribute(
        string[] memory usernames,
        uint256[] memory amounts
    ) public onlyOwner {
        uint256 arrLength = usernames.length;
        require(arrLength == amounts.length, "invalid parameters");
        for (uint i = 0; i < arrLength; i++) {
            uint256 claimable_ = amounts[i];
            _claimable[usernames[i]] += claimable_;
            _totalRewarded[usernames[i]] += claimable_;
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

    function gitHubUrl() public view returns (string memory) {
        return _gitHubUrl;
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

    function _setGitHubLinkContract(address _address) private {
        _gitHubLinkContract = IGitHubLink(_address);
    }

    function _linkedAccount(string memory gitHubUsername) private view returns (address) {
        return _gitHubLinkContract.linkedAccount(gitHubUsername);
    }


}

//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

// import "hardhat/console.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

// An OpenSauce token contract.
contract OpenSauceToken is Ownable, ERC20 {

    uint8 _decimals;
    string _gitHubUrl;
    address _creator;
    uint _creatorGitHubId;

    constructor(address owner_, string memory name_, string memory symbol_, uint8 decimals_) ERC20(name_, symbol_) {
        transferOwnership(owner_);
        _decimals = decimals_;
    }

    function decimals() public view virtual override returns (uint8) {
        return _decimals;
    }

}
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Address.sol";


contract GitHubLink is ChainlinkClient, Ownable {
    using Chainlink for Chainlink.Request;

    mapping(string => address) private linkedAccounts;
    mapping(bytes32 => string) private requests;

    address public oracle;
    bytes32 public jobId;
    uint256 public fee;

    string private _domain;
    string private _filePath;

    constructor(address _chainlinkToken) {
        setChainlinkToken(_chainlinkToken);
        // Sepolia: 0x779877A7B0D9E8603169DdbD7836e478b4624789
        oracle = 0x6090149792dAAeE9D1D568c9f9a6F6B46AA29eFD; // Oracle address on sepolia testnet
        jobId = "7d80a6386ef543a3abb52817f6707e3b";
        fee = 0.1 * 10 ** 18;
        _domain = "https://raw.githubusercontent.com/";
        _filePath = "/main/.opensauce.json";
    }

    /**
     * Create a Chainlink request to retrieve API response, find the target
     * data.
     */
    function linkGitHub(string memory _githubUsername)
        public
        returns (bytes32 requestId)
    {
        Chainlink.Request memory request = buildChainlinkRequest(jobId, address(this), this.finalizeGitHubLinking.selector);
        // Set the URL to perform the GET request on
        string memory url = buildUrl(_githubUsername);
        request.add("get", url);

        // Get the string value at the key value "eth"
        request.add("path", "eth");
        // Send the request
        bytes32 rId = sendChainlinkRequestTo(oracle, request, fee);
        requests[rId] = _githubUsername;
        return rId;
    }

    /**
     * Callback Function
     */
    function finalizeGitHubLinking(bytes32 _requestId, string memory _address)
        public
        recordChainlinkFulfillment(_requestId)
    {
        string memory gitHubUsername = requests[_requestId];
        linkedAccounts[gitHubUsername] = _stringToAddress(_address);
    }

    function setOracle(address oracle_) public onlyOwner {
        oracle = oracle_;
    }

    function setJobId(bytes32 _jobId) public onlyOwner {
        jobId = _jobId;
    }

    function setFee(uint256 fee_) public onlyOwner {
        fee = fee_;
    }

    function setGitHubUrlDomain(string memory domain) public onlyOwner {
        _domain = domain;
    }

    function setFilePath(string memory filePath) public onlyOwner {
        _filePath = filePath;
    }

    function linkedAccount(string memory _githubUsername) public view returns (address) {
        return linkedAccounts[_githubUsername];
    }
    
    function chainlinkAddress() public view returns (address) {
        return chainlinkTokenAddress();
    }

    function buildUrl(string memory _githubUsername) public view returns (string memory) {
        return string(abi.encodePacked(_domain, _githubUsername, "/", _githubUsername, _filePath));
    }

    function _stringToAddress(string memory _address) private pure returns (address) {
        require(bytes(_address).length == 42, "Invalid address length");
        bytes memory addrBytes = bytes(_address);
        uint160 addr = 0;
        for (uint256 i = 2; i < 42; i++) {
            uint8 b = uint8(addrBytes[i]);
            uint8 hexValue;
            if (b >= 48 && b <= 57) {
                hexValue = b - 48; // 0-9
            } else if (b >= 97 && b <= 102) {
                hexValue = b - 87; // a-f
            } else if (b >= 65 && b <= 70) {
                hexValue = b - 55; // A-F
            } else {
                revert("Invalid address characters");
            }
            addr = addr * 16 + uint160(hexValue);
        }
        return address(addr);
    }

}

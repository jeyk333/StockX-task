// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/AccessControl.sol";

/**
 * @title PriceOracle
 * @dev Oracle for fetching stock prices (simplified - in production would use Chainlink)
 */
contract PriceOracle is AccessControl {
    bytes32 public constant ORACLE_ROLE = keccak256("ORACLE_ROLE");

    mapping(string => uint256) public prices;
    mapping(string => uint256) public priceTimestamps;

    event PriceUpdated(string indexed symbol, uint256 price, uint256 timestamp);

    constructor() {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(ORACLE_ROLE, msg.sender);
    }

    function updatePrice(string memory symbol, uint256 price) external onlyRole(ORACLE_ROLE) {
        prices[symbol] = price;
        priceTimestamps[symbol] = block.timestamp;
        emit PriceUpdated(symbol, price, block.timestamp);
    }

    function getPrice(string memory symbol) external view returns (uint256) {
        require(prices[symbol] > 0, "PriceOracle: Price not set");
        require(block.timestamp - priceTimestamps[symbol] < 3600, "PriceOracle: Price too old");
        return prices[symbol];
    }

    function isValidPrice(string memory symbol, uint256 price, uint256 maxDeviation) external view returns (bool) {
        uint256 currentPrice = prices[symbol];
        if (currentPrice == 0) return false;

        uint256 deviation = price > currentPrice 
            ? ((price - currentPrice) * 100) / currentPrice
            : ((currentPrice - price) * 100) / currentPrice;

        return deviation <= maxDeviation;
    }
}

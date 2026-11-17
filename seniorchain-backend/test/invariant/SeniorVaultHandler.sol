// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import {Test} from "forge-std/Test.sol";
import {ERC20Mock} from "@openzeppelin/contracts/mocks/ERC20Mock.sol";
import {SeniorVault} from "../../src/SeniorVault.sol";

contract SeniorVaultHandler is Test {
    SeniorVault public immutable vault;
    ERC20Mock public immutable token;

    address public immutable senior;
    address public immutable recipient;

    address internal constant ETH_ADDRESS =
        0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE;

    constructor(
        SeniorVault _vault,
        ERC20Mock _token,
        address _senior,
        address _recipient
    ) {
        vault = _vault;
        token = _token;
        senior = _senior;
        recipient = _recipient;

        vm.prank(senior);
        token.approve(address(vault), type(uint256).max);
    }

    function depositEth(uint96 rawAmount) external {
        uint256 amount = bound(uint256(rawAmount), 1, 1 ether);

        vm.deal(senior, amount);
        vm.prank(senior);
        vault.deposit{value: amount}();
    }

    function depositToken(uint96 rawAmount) external {
        uint256 amount = bound(uint256(rawAmount), 1, 1_000_000e18);

        token.mint(senior, amount);
        vm.prank(senior);
        vault.depositERC20(address(token), amount);
    }

    function withdrawEth(uint96 rawAmount) external {
        uint256 available = vault.getUserTokenBalance(ETH_ADDRESS);
        if (available == 0) return;

        uint256 amount = bound(uint256(rawAmount), 1, available);
        vm.prank(senior);
        vault.withdrawETH(recipient, amount);
    }

    function withdrawToken(uint96 rawAmount) external {
        uint256 available = vault.getUserTokenBalance(address(token));
        if (available == 0) return;

        uint256 amount = bound(uint256(rawAmount), 1, available);
        vm.prank(senior);
        vault.withdrawERC20(recipient, amount, address(token));
    }
}


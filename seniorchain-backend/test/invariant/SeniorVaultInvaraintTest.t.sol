// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import {Test} from "forge-std/Test.sol";
import {StdInvariant} from "forge-std/StdInvariant.sol";
import {ERC20Mock} from "@openzeppelin/contracts/mocks/ERC20Mock.sol";
import {SeniorVault} from "../../src/SeniorVault.sol";
import {SeniorVaultHandler} from "./SeniorVaultHandler.sol";

contract SeniorVaultInvariantTest is StdInvariant, Test {
    SeniorVault internal vault;
    ERC20Mock internal token;
    SeniorVaultHandler internal handler;

    address internal senior;
    address internal guardian;
    address internal recipient;

    address internal constant ETH_ADDRESS =
        0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE;

    function setUp() public {
        senior = makeAddr("invariant-senior");
        guardian = makeAddr("invariant-guardian");
        recipient = makeAddr("invariant-recipient");

        vault = new SeniorVault(senior);
        token = new ERC20Mock();

        vm.prank(senior);
        vault.proposeGuardian(guardian);
        vm.prank(guardian);
        vault.acceptGuardian();

        vm.prank(senior);
        vault.proposesSafeAddresses(recipient);
        vm.prank(guardian);
        vault.approveSafeAddress(recipient);

        vm.prank(senior);
        vault.proposeToken(address(token));
        vm.prank(guardian);
        vault.approveToken(address(token));

        vm.prank(guardian);
        vault.setWithdrawalLimits(
            ETH_ADDRESS,
            type(uint256).max,
            type(uint256).max,
            30 days
        );

        vm.prank(guardian);
        vault.setWithdrawalLimits(
            address(token),
            type(uint256).max,
            type(uint256).max,
            30 days
        );

        handler = new SeniorVaultHandler(vault, token, senior, recipient);

        targetContract(address(handler));
    }

    /**
     * ETH held by the vault must never be lower than the senior's internal
     * ETH ledger balance.
     */
    function invariant_EthAssetsCoverLedgerBalance() public view {
        assertGe(
            address(vault).balance,
            vault.getUserTokenBalance(ETH_ADDRESS),
            "ETH assets below internal ledger"
        );
    }

    /**
     * ERC20 held by the vault must never be lower than the senior's internal
     * token ledger balance.
     */
    function invariant_TokenAssetsCoverLedgerBalance() public view {
        assertGe(
            token.balanceOf(address(vault)),
            vault.getUserTokenBalance(address(token)),
            "ERC20 assets below internal ledger"
        );
    }

    function invariant_HandlerIsTheOnlyTarget() public view {
        assertEq(address(handler.vault()), address(vault));
        assertTrue(vault.isAddressWhiteListed(recipient));
        assertTrue(vault.isTokenWhiteListed(address(token)));
    }
}

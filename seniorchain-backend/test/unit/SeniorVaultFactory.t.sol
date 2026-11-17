// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import {Test} from "forge-std/Test.sol";
import {SeniorVaultFactory} from "../../src/SeniorVaultFactory.sol";
import {SeniorVault} from "../../src/SeniorVault.sol";

contract SeniorVaultFactoryTest is Test {
    SeniorVaultFactory public factory;

    address public owner;
    address public senior1;
    address public senior2;
    address public guardian;
    address public newSenior;
    address public stranger;

    event VaultCreated(address indexed user, address indexed vault);

    function setUp() public {
        owner = makeAddr("owner");
        senior1 = makeAddr("senior1");
        senior2 = makeAddr("senior2");
        guardian = makeAddr("guardian");
        newSenior = makeAddr("newSenior");
        stranger = makeAddr("stranger");

        vm.prank(owner);
        factory = new SeniorVaultFactory();
    }

    function _createVaultWithGuardian(address senior) internal returns (SeniorVault v) {
        vm.prank(senior);
        v = SeniorVault(factory.createVault());

        vm.prank(senior);
        v.proposeGuardian(guardian);

        vm.prank(guardian);
        v.acceptGuardian();
    }

    /*//////////////////////////////////////////////////////////////
                         CREATE VAULT - HAPPY PATH
    //////////////////////////////////////////////////////////////*/

    function testCreateVaultSuccess() public {
        vm.prank(senior1);
        address vaultAddr = factory.createVault();

        assertTrue(vaultAddr != address(0), "Vault address should not be zero");
        assertEq(factory.seniorToVault(senior1), vaultAddr, "Mapping should point to created vault");
    }

    function testCreateVaultEmitsEvent() public {
        uint64 nonce = vm.getNonce(address(factory));
        address predictedVault = vm.computeCreateAddress(address(factory), nonce);

        vm.expectEmit(true, true, false, false);
        emit VaultCreated(senior1, predictedVault);

        vm.prank(senior1);
        factory.createVault();
    }

    function testCreateVaultStoresCorrectMapping() public {
        vm.prank(senior1);
        address vault1 = factory.createVault();

        vm.prank(senior2);
        address vault2 = factory.createVault();

        assertEq(factory.seniorToVault(senior1), vault1);
        assertEq(factory.seniorToVault(senior2), vault2);
        assertTrue(vault1 != vault2, "Each senior should get a unique vault");
    }

    function testCreateVaultDeploysActualSeniorVaultContract() public {
        vm.prank(senior1);
        address vaultAddr = factory.createVault();

        uint256 codeSize;
        assembly {
            codeSize := extcodesize(vaultAddr)
        }
        assertGt(codeSize, 0, "Deployed vault should have code");
    }

    /*//////////////////////////////////////////////////////////////
                       CREATE VAULT - REVERT CONDITIONS
    //////////////////////////////////////////////////////////////*/

    function testRevertWhenCreateVaultCalledTwiceBySameSenior() public {
        vm.startPrank(senior1);
        factory.createVault();

        vm.expectRevert(SeniorVaultFactory.VaultAlredyExist.selector);
        factory.createVault();
        vm.stopPrank();
    }

    function testRevertWhenCreateVaultCalledWhilePaused() public {
        vm.prank(owner);
        factory.pause();

        vm.prank(senior1);
        vm.expectRevert();
        factory.createVault();
    }

    /*//////////////////////////////////////////////////////////////
                       PAUSE / UNPAUSE - ACCESS CONTROL
    //////////////////////////////////////////////////////////////*/

    function testPauseOnlyOwnerCanPause() public {
        vm.prank(owner);
        factory.pause();

        assertTrue(factory.paused());
    }

    function testRevertWhenNonOwnerCallsPause() public {
        vm.prank(senior1);
        vm.expectRevert();
        factory.pause();
    }

    function testUnpauseOnlyOwnerCanUnpause() public {
        vm.startPrank(owner);
        factory.pause();
        factory.unpause();
        vm.stopPrank();

        assertFalse(factory.paused());
    }

    function testRevertWhenNonOwnerCallsUnpause() public {
        vm.prank(owner);
        factory.pause();

        vm.prank(senior1);
        vm.expectRevert();
        factory.unpause();
    }

    function testCreateVaultWorksAfterUnpause() public {
        vm.startPrank(owner);
        factory.pause();
        factory.unpause();
        vm.stopPrank();

        vm.prank(senior1);
        address vaultAddr = factory.createVault();

        assertTrue(vaultAddr != address(0));
    }

    /*//////////////////////////////////////////////////////////////
                              FUZZ TESTS
    //////////////////////////////////////////////////////////////*/

    function testFuzzCreateVaultDifferentSeniorsGetUniqueVaults(address senior) public {
        vm.assume(senior != address(0));
        vm.assume(senior.code.length == 0);

        vm.prank(senior);
        address vaultAddr = factory.createVault();

        assertEq(factory.seniorToVault(senior), vaultAddr);
    }

    /*//////////////////////////////////////////////////////////////
                         SENIOR RECOVERY / MAPPING
    //////////////////////////////////////////////////////////////*/

    function testUpdateSeniorAddressRevertsIfCallerIsNotVault() public {
        _createVaultWithGuardian(senior1);

        vm.prank(stranger);
        vm.expectRevert(bytes4(keccak256("NotVault()")));
        factory.updateSeniorAddress(senior1, newSenior);
    }

    function testRecoveryUpdatesFactoryMapping() public {
        SeniorVault v = _createVaultWithGuardian(senior1);
        assertEq(factory.seniorToVault(senior1), address(v));

        vm.prank(guardian);
        v.proposeNewSenior(newSenior);

        vm.warp(v.recoveryUnlockTime());
        vm.prank(newSenior);
        v.executeRecovery();

        assertEq(v.senior(), newSenior);
        assertEq(factory.seniorToVault(senior1), address(0));
        assertEq(factory.seniorToVault(newSenior), address(v));
    }
}

// SPDX-License-Identifier: MIT
pragma solidity 0.8.31;

import {Test, console} from "forge-std/Test.sol";
import {SeniorVaultFactory} from "../src/SeniorVaultFactory.sol";
import {SeniorVault} from "../src/SeniorVault.sol";

contract SeniorVaultFactoryTest is Test {
    SeniorVaultFactory public factory;

    address public owner = makeAddr("owner");
    address public senior1 = makeAddr("senior1");
    address public senior2 = makeAddr("senior2");

    event VaultCreated(address indexed user, address indexed vault);

    function setUp() public {
        vm.prank(owner);
        factory = new SeniorVaultFactory();
    }

    /*//////////////////////////////////////////////////////////
                        CREATE VAULT - HAPPY PATH
    //////////////////////////////////////////////////////////*/

    function testCreateVaultSuccess() public {
        vm.prank(senior1);
        address vaultAddr = factory.createVault();

        assertTrue(vaultAddr != address(0), "Vault address should not be zero");
        assertEq(factory.seniorToVault(senior1), vaultAddr, "Mapping should point to created vault");
    }

    function testCreateVaultEmitsEvent() public {
        // Obliczamy adres vaulta przed deploymentem, żeby zweryfikować event
        // (CREATE opcode -> adres deterministyczny na podstawie noncè fabryki)
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

    /*//////////////////////////////////////////////////////////
                    CREATE VAULT - REVERT CONDITIONS
    //////////////////////////////////////////////////////////*/

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
        vm.expectRevert(); // Pausable: EnforcedPause
        factory.createVault();
    }

    /*//////////////////////////////////////////////////////////
                        PAUSE / UNPAUSE - ACCESS CONTROL
    //////////////////////////////////////////////////////////*/

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

    /*//////////////////////////////////////////////////////////
                            FUZZ TESTS
    //////////////////////////////////////////////////////////*/

    function testFuzzCreateVaultDifferentSeniorsGetUniqueVaults(address senior) public {
        vm.assume(senior != address(0));
        vm.assume(senior.code.length == 0);

        vm.prank(senior);
        address vaultAddr = factory.createVault();

        assertEq(factory.seniorToVault(senior), vaultAddr);
    }
}
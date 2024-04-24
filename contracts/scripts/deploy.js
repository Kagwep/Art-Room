const hre = require("hardhat");

async function main() {
  // Get the contract factory for the MSIA contract
  const MSIA = await hre.ethers.getContractFactory("MSIA");

  // Get the list of accounts from the Hardhat environment
  const [deployer] = await hre.ethers.getSigners();

  // Deploy the contract with the deployer's address as the initial owner
  const msia = await MSIA.deploy(deployer.address);

  // Wait for the contract deployment to finish
  await msia.deployTransaction.wait();

  console.log(`Contract deployed to ${msia.address}`);
  console.log(`Deployed by ${deployer.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

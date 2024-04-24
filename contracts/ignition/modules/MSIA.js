const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");
const ethers = require('ethers')


module.exports = buildModule("MSIA", (m) => {

  const deployer = "0x692f81A58d9351829B2c96a4E23d8cC0e4B3919c";

  const msia = m.contract("MSIA", [deployer]);

  return { msia };
});

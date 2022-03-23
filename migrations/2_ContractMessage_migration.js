const ContractMessage = artifacts.require("ContractMessage");

module.exports = function (deployer) {
  deployer.deploy(ContractMessage);
};

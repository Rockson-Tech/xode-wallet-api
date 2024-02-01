export default class ChainRepository {
  contractAddress = process.env.CONTRACT_ADDRESS as string;
  abi = require("./../astrochibbismartcontract.json");

  static async getSmartContractRepo() {
    console.log('getSmartContractRepo function was called');
    try {
      const smartcontract: string = process.env.CONTRACT_ADDRESS as string;
      return { smartcontract };
    } catch (error) {
      throw String(error || 'getSmartContractRepo error occurred.');
    }
  }

  static async getABIRepo() {
    console.log('getSmartContractRepo function was called');
    try {
      const instance = new ChainRepository();
      const abi: JSON = instance.abi;
      return { abi };
    } catch (error) {
      throw String(error || 'getSmartContractRepo error occurred.');
    }
  }
}
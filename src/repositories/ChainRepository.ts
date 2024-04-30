import { formatBalance } from '@polkadot/util';
import InitializeAPI from '../modules/InitializeAPI';

export default class ChainRepository {
  abi = require("./../smartcontracts/astro_nft.json");

  static async getSmartContractRepo() {
    console.log('getSmartContractRepo function was called');
    try {
      const smartcontract: string = process.env.ASTROCHIBBI_ADDRESS as string;
      return { smartcontract };
    } catch (error: any) {
      return Error(error || 'getSmartContractRepo error occurred.');
    }
  }

  static async getABIRepo() {
    console.log('getSmartContractRepo function was called');
    try {
      const instance = new ChainRepository();
      const abi: JSON = instance.abi;
      return { abi };
    } catch (error: any) {
      return Error(error || 'getSmartContractRepo error occurred.');
    }
  }

  static async getTokensRepo(wallet_address: string) {
    console.log('getSmartContractRepo function was called');
    var api: any;
    try {
      api = await InitializeAPI.apiInitialization();
      if (api instanceof Error) {
        return api;
      }
      const balance = await api.derive.balances.all(wallet_address);
      const available = balance.availableBalance;
      const chainDecimals = api.registry.chainDecimals[0];
      const tokens = api.registry.chainTokens;
      formatBalance.setDefaults({ decimals: chainDecimals, unit: tokens[0] });
      formatBalance.getDefaults();
      const free = formatBalance(available, { forceUnit: tokens[0], withUnit: false });
      const balances = free.split(',').join('');
      const parsedBalance = parseFloat(balances);
      return {
        balance: parsedBalance,
        price: '0',
        symbol: tokens[0]
      }
    } catch (error: any) {
      return Error(error || 'getSmartContractRepo error occurred.');
    } finally {
      if (!(api instanceof Error)) {
        await api.disconnect();
      }
    }
  }
}
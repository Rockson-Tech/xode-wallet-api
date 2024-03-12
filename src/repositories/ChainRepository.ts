import { ApiPromise } from '@polkadot/api';
import { WsProvider } from '@polkadot/rpc-provider';
import { formatBalance } from '@polkadot/util';

export default class ChainRepository {
  wsProvider = new WsProvider(process.env.WS_PROVIDER_ENDPOINT as string);
  api = ApiPromise.create({ 
      types: { 
      AccountInfo: 'AccountInfoWithDualRefCount'
      }, 
      provider: this.wsProvider 
  });
  keypair = process.env.KEYPAIR;
  economyAddress = process.env.ECONOMY_ADDRESS as string;
  contractOwner = process.env.CONTRACT_OWNER as string;
  ownerSeed = process.env.OWNER_SEED as string;
  assetId = process.env.ASSET_ID as string;
  astroPrice = '1';
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

  static async getTokensRepo(wallet_address: string) {
    console.log('getSmartContractRepo function was called');
    try {
      const instance = new ChainRepository();
      const api = await instance.api;
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
    } catch (error) {
      throw String(error || 'getSmartContractRepo error occurred.');
    }
  }
}
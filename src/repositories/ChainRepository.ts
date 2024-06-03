import TXRepository from '../modules/TXRepository';
import InitializeAPI from '../modules/InitializeAPI';
import { formatBalance } from '@polkadot/util';
import { cryptoWaitReady } from '@polkadot/util-crypto';
import { Keyring } from '@polkadot/api';
import { 
  ITransferTokenRequestBody,
  ISubmitExtrinsicRequestBody 
} from '../schemas/ChainSchemas';

export default class ChainRepository {
  ownerSeed = process.env.ASTROCHIBBI_SEED as string;
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
      await cryptoWaitReady();
      api = await InitializeAPI.apiInitialization();
      if (api instanceof Error) {
        return api;
      }
      const balance = await api.derive.balances.all(wallet_address);
      const available = balance.availableBalance;
      const chainDecimals = api.registry.chainDecimals[0];
      const tokens = api.registry.chainTokens;
      const token_name = 'Xode';
      formatBalance.setDefaults({ decimals: chainDecimals, unit: tokens[0] });
      formatBalance.getDefaults();
      const free = formatBalance(available, { forceUnit: tokens[0], withUnit: false });
      const balances = free.split(',').join('');
      const parsedBalance = parseFloat(balances).toFixed(4);
      return {
        balance: parsedBalance,
        // price: '0',
        symbol: tokens[0],
        name: token_name
      }
    } catch (error: any) {
      return Error(error || 'getSmartContractRepo error occurred.');
    } finally {
      if (!(api instanceof Error)) {
        await api.disconnect();
      }
    }
  }

  static async getTokenMetadataRepo() {
    console.log('getTokenMetadataRepo function was called');
    var api: any;
    try {
      await cryptoWaitReady();
      api = await InitializeAPI.apiInitialization();
      if (api instanceof Error) {
        return api;
      }
      const properties = await api.rpc.system.properties();
      return {
        name: 'Xode Native Token',
        symbol: properties.toHuman().tokenSymbol[0],
        decimals: properties.toHuman().tokenDecimals[0],
        image: 'https://bafkreia4iwmdregtzmk4b2t2cwjudnxbqjd5rixduhcworzmy5qivp7boa.ipfs.cf-ipfs.com/'
      }
    } catch (error: any) {
      return Error(error || 'getTokenMetadataRepo error occurred.');
    } finally {
      if (!(api instanceof Error)) {
        await api.disconnect();
      }
    }
  }

  static async tokenTransferRepo(data: ITransferTokenRequestBody) {
    console.log('tokenTransferRepo function was called');
    var api: any;
    try {
      await cryptoWaitReady();
      api = await InitializeAPI.apiInitialization();
      if (api instanceof Error) {
        return api;
      }
      const result = await TXRepository.constructChainExtrinsicTransaction(
        api,
        'balances',
        'transfer',
        [
          data.to, 
          data.value
        ]
      );
      return { hash: result.toHex() };
    } catch (error: any) {
      console.log('tokenTransferRepo: ' + error);
      return Error(error);
    } finally {
      if (!(api instanceof Error)) {
        await api.disconnect();
      }
    }
  }

  static submitExtrinsicRepo = async (data: ISubmitExtrinsicRequestBody) => {
    console.log('submitExtrinsicRepo function was called');
    var api: any;
    try {
      api = await InitializeAPI.apiInitialization();
      const executeExtrinsic = api.tx(data.extrinsic);
      const result = await TXRepository.executeExtrinsic(
        api,
        executeExtrinsic,
        data.extrinsic
      );
      return result;
    } catch (error: any) {
      console.log('submitExtrinsicRepo: ', error);
      return Error(error);
    } finally {
      if (!(api instanceof Error)) {
        await api.disconnect();
      }
    }
  };

  static async airdropXONRepo(data: any) {
    console.log('airdropXONRepo function was called');
    const instance = new ChainRepository();
    var api: any;
    try {
      await cryptoWaitReady();
      api = await InitializeAPI.apiInitialization();
      if (api instanceof Error) {
        return api;
      }
      const chainDecimals = api.registry.chainDecimals[0];
      const keyring = new Keyring({ type: 'sr25519', ss58Format: 0 });
      const owner = keyring.addFromUri(instance.ownerSeed);
      const value = 1 * 10 ** chainDecimals;
      let nonce = await api.rpc.system.accountNextIndex(owner.address);
      let index = 0;
      while (index < data.length) {
        const batch = data.slice(index, index + 1);
        for (const address of batch) {
          console.log(`Index: ${index} - `, address);
          const tx = api.tx.balances.transferKeepAlive(address, value); 
          await tx.signAndSend(owner, { nonce });
        }
        index += 1;
        const newNonce = await api.rpc.system.accountNextIndex(owner.address);
        if (newNonce.gt(nonce)) {
          nonce = newNonce;
        }
      }
      return;
    } catch (error: any) {
      return Error(error || 'airdropXONRepo error occurred.');
    } finally {
      if (!(api instanceof Error)) {
        await api.disconnect();
      }
    }
  }

  static async getTotalSupplyRepo() {
    console.log('getTotalSupplyRepo function was called');
    var api: any;
    try {
      await cryptoWaitReady();
      api = await InitializeAPI.apiInitialization();
      if (api instanceof Error) {
        return api;
      }
      const [balance, chainDecimals, token] = await Promise.all([
        api.query.balances.totalIssuance(),
        api.registry.chainDecimals[0],
        api.registry.chainTokens,
      ]);
      formatBalance.setDefaults({ decimals: chainDecimals, unit: token[0] });
      formatBalance.getDefaults();
      const free = formatBalance(balance, { forceUnit: token[0], withUnit: false });
      const balances = free.split(',').join('');
      const parsedBalance = parseFloat(balances).toFixed(4);
      return { totalSupply: parsedBalance }
    } catch (error: any) {
      return Error(error || 'getTotalSupplyRepo error occurred.');
    } finally {
      if (!(api instanceof Error)) {
        await api.disconnect();
      }
    }
  }
}
import TXRepository from '../modules/TXRepository';
import { ApiPromise, Keyring } from '@polkadot/api';
import { WsProvider } from '@polkadot/rpc-provider';
import { 
  IMintRequestBody,
  ITransferRequestBody,
  IBurnRequestBody,
} from '../schemas/EconomySchemas';
// import { formatBalance } from '@polkadot/util';
import abi from './../astroeconomy.json';

export default class EconomyRepository {
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
  // These are required and changeable
  REFTIME: number = 300000000000;
  PROOFSIZE: number = 500000;

  static async mintRepo(data: IMintRequestBody) {
    console.log('mintRepo function was called');
    // const instance = new EconomyRepository();
    // const api = await instance.api;
    // try {
    //   const keyring = new Keyring({ type: 'sr25519', ss58Format: 0 });
    //   const owner = keyring.addFromUri(instance.ownerSeed);
    //   const metadata: any = await api.query.assets.metadata(
    //     instance.assetId,
    //   );
    //   if (metadata.toHuman() == null) {
    //     throw String('No corresponding asset found.');
    //   }
    //   const { decimals } = metadata.toJSON();
    //   const value = data.value * 10 ** decimals;
    //   const result = await TXRepository.sendApiTransaction(
    //     api,
    //     'assets',
    //     'mint',
    //     owner,
    //     [
    //       instance.assetId,
    //       data.to, 
    //       value
    //     ]
    //   );
    //   return result;
    // } catch (error) {
    //   throw String(error || 'mintRepo error occurred.');
    // } finally {
    //   await api.disconnect();
    // }
    try {
      const instance = new EconomyRepository();
      const api = await instance.api;
      const contractAddress = instance.economyAddress;
      const contract = await TXRepository.getContract(api, abi, contractAddress);
      const keyring = new Keyring({ type: 'sr25519', ss58Format: 0 });
      const owner = keyring.addFromUri(instance.ownerSeed);
      const storageDepositLimit = null;
      if (contract !== undefined) {
        const result = await TXRepository.sendContractTransaction(
          api,
          contract,
          'mint',
          owner,
          [
            owner.address,
            data.to,
            data.value
          ],
          instance,
          storageDepositLimit
        );
        await api.disconnect();
        return result;
      }
      return;
    } catch (error) {
      throw String(error || 'mintRepo error occurred.');
    }
  }

  static async transferRepo(data: ITransferRequestBody) {
    console.log('transferRepo function was called');
    const instance = new EconomyRepository();
    const api = await instance.api;
    try {
      
      const keyring = new Keyring({ type: 'sr25519', ss58Format: 0 });
      const owner = keyring.addFromUri(instance.ownerSeed);
      const metadata: any = await api.query.assets.metadata(
        instance.assetId,
      );
      if (metadata.toHuman() == null) {
        throw String('No corresponding asset found.');
      }
      const { decimals } = metadata.toJSON();
      const value = data.value * 10 ** decimals;
      const result = await TXRepository.sendApiTransaction(
        api,
        'assets',
        'forceTransfer',
        owner,
        [
          instance.assetId,
          data.from, 
          data.to, 
          value
        ]
      );
      return result;
    } catch (error) {
      throw String(error || 'transferRepo error occurred.');
    } finally {
      await api.disconnect();
    }
    // try {
    //   const instance = new EconomyRepository();
    //   const api = await instance.api;
    //   const contractAddress = instance.economyAddress;
    //   const contract = await TXRepository.getContract(api, abi, contractAddress);
    //   const keyring = new Keyring({ type: 'sr25519', ss58Format: 0 });
    //   const owner = keyring.addFromUri(instance.ownerSeed);
    //   const storageDepositLimit = null;
    //   if (contract !== undefined) {
    //     const result = await TXRepository.sendContractTransaction(
    //       api,
    //       contract,
    //       'transfer',
    //       owner,
    //       [ 
    //         data.to,
    //         data.value
    //       ],
    //       instance,
    //       storageDepositLimit
    //     );
    //     await api.disconnect();
    //     return result;
    //   }
    //   return;
    // } catch (error) {
    //   throw String(error || 'transferRepo error occurred.');
    // }
  }

  static async burnRepo(data: IBurnRequestBody) {
    console.log('burnRepo function was called');
    const instance = new EconomyRepository();
    const api = await instance.api;
    try {
      const instance = new EconomyRepository();
      const api = await instance.api;
      const keyring = new Keyring({ type: 'sr25519', ss58Format: 0 });
      const owner = keyring.addFromUri(instance.ownerSeed);
      const metadata: any = await api.query.assets.metadata(
        instance.assetId,
      );
      if (metadata.toHuman() == null) {
        throw String('No corresponding asset found.');
      }
      const { decimals } = metadata.toJSON();
      const value = data.value * 10 ** decimals;
      const result = await TXRepository.sendApiTransaction(
        api,
        'assets',
        'burn',
        owner,
        [
          instance.assetId,
          data.from, 
          value
        ]
      );
      return result;
    } catch (error) {
      throw String(error || 'burnRepo error occurred.');
    } finally {
      await api.disconnect();
    }
    // try {
    //   const instance = new EconomyRepository();
    //   const api = await instance.api;
    //   const contractAddress = instance.economyAddress;
    //   const contract = await TXRepository.getContract(api, abi, contractAddress);
    //   const keyring = new Keyring({ type: 'sr25519', ss58Format: 0 });
    //   const owner = keyring.addFromUri(instance.ownerSeed);
    //   const storageDepositLimit = null;
    //   if (contract !== undefined) {
    //     const result = await TXRepository.sendContractTransaction(
    //       api,
    //       contract,
    //       'burn',
    //       owner,
    //       [ 
    //         data.from,
    //         data.value
    //       ],
    //       instance,
    //       storageDepositLimit
    //     );
    //     await api.disconnect();
    //     return result;
    //   }
    //   return;
    // } catch (error) {
    //   throw String(error || 'burnRepo error occurred.');
    // }
  }

  static async balanceOfRepo(account: string) {
    console.log('balanceOfRepo function was called');
    // const instance = new EconomyRepository();
    // const api = await instance.api;
    // try {
    //   const price = instance.astroPrice;
    //   const accountInfo: any = await api.query.assets.account(
    //     instance.assetId,
    //     account
    //   );
    //   const metadata: any = await api.query.assets.metadata(
    //     instance.assetId,
    //   );
    //   if (accountInfo.toHuman() != null) {
    //     const { balance } = accountInfo.toJSON();
    //     const { decimals, symbol } = metadata.toHuman();
    //     formatBalance.setDefaults({ decimals: parseInt(decimals), unit: symbol });
    //     formatBalance.getDefaults();
    //     const bal = formatBalance(
    //       balance, 
    //       { 
    //         forceUnit: symbol, 
    //         withUnit: false 
    //       }
    //     );
    //     const balances = parseFloat(bal).toFixed(4);
    //     return {
    //       balance: balances,
    //       price: price,
    //       symbol: symbol
    //     };
    //   } else {
    //     return {
    //       balance: '0.0000',
    //       price: price,
    //       symbol: 'ASTRO'
    //     };
    //   };
    // } catch (error) {
    //   throw String(error || 'balanceOfRepo error occurred.');
    // } finally {
    //   await api.disconnect();
    // }
    try {
      const instance = new EconomyRepository();
      const api = await instance.api;
      const contractAddress = instance.economyAddress;
      const contract = await TXRepository.getContract(api, abi, contractAddress);
      if (!contract) {
        throw new Error('Contract not initialized.');
      }
      if (!contract.query || !contract.query.balanceOf) {
        throw new Error('balanceOf function not found in the contract ABI.');
      }
      const energy = await TXRepository.sendContractQuery(
        api,
        contract,
        'balanceOf',
        [ account ],
        instance
      );
      return { 
        balance: energy.ok
      };
    } catch (error) {
      throw String(error || 'balanceOfRepo error occurred.');
    }
  }
  
  static async totalSupplyRepo() {
    console.log('totalSupplyRepo function was called');
    // const instance = new EconomyRepository();
    // const api = await instance.api;
    // try {
    //   const assetInfo: any = await api.query.assets.asset(
    //     instance.assetId
    //   );
    //   if (assetInfo.toHuman() == null) {
    //     throw String('No corresponding asset found.');
    //   }
    //   const { supply } = assetInfo.toJSON();
    //   return {
    //     total_supply: supply
    //   };
    // } catch (error) {
    //   throw String(error || 'totalSupplyRepo error occurred.');
    // } finally {
    //   await api.disconnect();
    // }
    try {
      const instance = new EconomyRepository();
      const api = await instance.api;
      const contractAddress = instance.economyAddress;
      const contract = await TXRepository.getContract(api, abi, contractAddress);
      if (!contract) {
        throw new Error('Contract not initialized.');
      }
      if (!contract.query || !contract.query.totalSupply) {
        throw new Error('totalSupply function not found in the contract ABI.');
      }
      const energy = await TXRepository.sendContractQuery(
        api,
        contract,
        'totalSupply',
        [],
        instance
      );
      return { 
        total_supply: energy.ok,
      };
    } catch (error) {
      throw String(error || 'totalSupplyRepo error occurred.');
    }
  }
}
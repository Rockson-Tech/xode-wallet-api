import TXRepository from '../modules/TXRepository';
import InitializeAPI from '../modules/InitializeAPI';
import { Keyring } from '@polkadot/api';
import { cryptoWaitReady } from '@polkadot/util-crypto';
import { 
  IMintRequestBody,
  ITransferRequestBody,
  IBurnRequestBody,
} from '../schemas/AstroSchemas';
import { formatBalance } from '@polkadot/util';
import abi from '../smartcontracts/astrochibbi/astro_economy.json';

export default class AstroRepository {
  economyAddress = process.env.ASTRO_ECONOMY_ADDRESS as string;
  ownerSeed = process.env.ASTROCHIBBI_SEED as string;
  astroPrice = '0';
  // These are required and changeable
  REFTIME: number = 300000000000;
  PROOFSIZE: number = 500000;

  static async mintRepo(data: IMintRequestBody) {
    console.log('mintRepo function was called');
    const instance = new AstroRepository();
    var api: any;
    try {
      await cryptoWaitReady();
      api = await InitializeAPI.apiInitialization();
      if (api instanceof Error) {
        return api;
      }
      const contractAddress = instance.economyAddress;
      const contract = await TXRepository.getContract(api, abi, contractAddress);
      const keyring = new Keyring({ type: 'sr25519', ss58Format: 0 });
      const owner = keyring.addFromUri(instance.ownerSeed);
      const storageDepositLimit = null;
      if (contract === undefined) {
        return Error('mintRepo contract undefined.');
      }
      const result = await TXRepository.sendContractTransaction(
        api,
        contract,
        'mint',
        owner,
        [
          data.to,
          data.value
        ],
        instance,
        storageDepositLimit
      );
      return result;
    } catch (error: any) {
      return Error(error || 'mintRepo error occurred.');
    } finally {
      if (!(api instanceof Error)) {
        await api.disconnect();
      }
    }
  }

  static async transferRepo(data: ITransferRequestBody) {
    console.log('transferRepo function was called');
    const instance = new AstroRepository();
    var api: any;
    try {
      await cryptoWaitReady();
      api = await InitializeAPI.apiInitialization();
      if (api instanceof Error) {
        return api;
      }
      const contractAddress = instance.economyAddress;
      const contract = await TXRepository.getContract(api, abi, contractAddress);
      const keyring = new Keyring({ type: 'sr25519', ss58Format: 0 });
      const owner = keyring.addFromUri(instance.ownerSeed);
      const storageDepositLimit = null;
      if (contract === undefined) {
        throw Error('transferRepo contract undefined.');
      }
      const dryrunResult = await TXRepository.dryRunContract(
        api,
        contract,
        'transfer',
        owner,
        [ 
          data.to,
          data.value
        ],
        instance,
        storageDepositLimit
      );
      if (dryrunResult instanceof Error) {
        return dryrunResult;
      }
      const result = await TXRepository.constructContractExtrinsicTransaction(
        api,
        contract,
        'transfer',
        [ 
          data.to,
          data.value
        ],
        dryrunResult,
      )
      return { hash: result.toHex() };
    } catch (error: any) {
      return Error(error || 'transferRepo error occurred.');
    } finally {
      if (!(api instanceof Error)) {
        await api.disconnect();
      }
    }
  }

  static async burnRepo(data: IBurnRequestBody) {
    console.log('burnRepo function was called');
    const instance = new AstroRepository();
    var api: any;
    try {
      await cryptoWaitReady();
      api = await InitializeAPI.apiInitialization();
      if (api instanceof Error) {
        return api;
      }
      const contractAddress = instance.economyAddress;
      const contract = await TXRepository.getContract(api, abi, contractAddress);
      const keyring = new Keyring({ type: 'sr25519', ss58Format: 0 });
      const owner = keyring.addFromUri(instance.ownerSeed);
      const storageDepositLimit = null;
      if (contract === undefined) {
        return Error('burnRepo contract undefined.');
      }
      const result = await TXRepository.sendContractTransaction(
        api,
        contract,
        'burn',
        owner,
        [ 
          data.from,
          data.value
        ],
        instance,
        storageDepositLimit
      );
      return result;
    } catch (error: any) {
      return Error(error || 'burnRepo error occurred.');
    } finally {
      if (!(api instanceof Error)) {
        await api.disconnect();
      }
    }
  }

  static async balanceOfRepo(account: string) {
    console.log('balanceOfRepo function was called');
    const instance = new AstroRepository();
    var api: any;
    try {
      await cryptoWaitReady();
      api = await InitializeAPI.apiInitialization();
      if (api instanceof Error) {
        return api;
      }
      // const price = instance.astroPrice;
      const contractAddress = instance.economyAddress;
      const contract = await TXRepository.getContract(api, abi, contractAddress);
      if (!contract) {
        return Error('Contract not initialized.');
      }
      if (!contract.query || !contract.query.balanceOf) {
        return Error('balanceOf function not found in the contract ABI.');
      }
      const [metadata, balanceOf] = await Promise.all([
        TXRepository.sendContractQuery(api, contract, 'metadata', [], instance),
        TXRepository.sendContractQuery(api, contract, 'balanceOf', [ account ], instance),
      ])
      const mtdt = metadata.ok;
      const balOf = balanceOf.ok;
      const bigintbalance = BigInt(balOf);
      formatBalance.setDefaults({ decimals: parseInt(mtdt.decimals), unit: mtdt.tokenSymbol });
      formatBalance.getDefaults();
      const bal = formatBalance(
        bigintbalance, 
        { 
          forceUnit: mtdt.tokenSymbol, 
          withUnit: false 
        }
      );
      const balances = parseFloat(bal.replace(/,/g, '')).toFixed(4);
      return { 
        balance: balances,
        symbol: mtdt.tokenSymbol,
        name: mtdt.tokenName
      };
    } catch (error: any) {
      return Error(error || 'balanceOfRepo error occurred.');
    } finally {
      if (!(api instanceof Error)) {
        await api.disconnect();
      }
    }
  }
  
  static async totalSupplyRepo() {
    console.log('totalSupplyRepo function was called');
    const instance = new AstroRepository();
    var api: any;
    try {
      await cryptoWaitReady();
      api = await InitializeAPI.apiInitialization();
      if (api instanceof Error) {
        return api;
      }
      const contractAddress = instance.economyAddress;
      const contract = await TXRepository.getContract(api, abi, contractAddress);
      if (!contract) {
        return Error('Contract not initialized.');
      }
      if (!contract.query || !contract.query.totalSupply) {
        return Error('totalSupply function not found in the contract ABI.');
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
    } catch (error: any) {
      return Error(error || 'totalSupplyRepo error occurred.');
    } finally {
      if (!(api instanceof Error)) {
        await api.disconnect();
      }
    }
  }

  static async getContractMetadataRepo() {
    console.log('getTokenMetadataRepo function was called');
    const instance = new AstroRepository();
    var api: any;
    try {
      api = await InitializeAPI.apiInitialization();
      if (api instanceof Error) {
        return api;
      }
      const contractAddress = instance.economyAddress;
      const contract = await TXRepository.getContract(api, abi, contractAddress);
      if (!contract) {
        return Error('Contract not initialized.');
      }
      if (!contract.query || !contract.query.metadata) {
        return Error('`metadata` function not found in the contract ABI.');
      }
      const metadata = await TXRepository.sendContractQuery(
        api,
        contract,
        'metadata',
        [],
        instance
      );
      return {
        name: metadata.ok.tokenName,
        symbol: metadata.ok.tokenSymbol,
        decimals: metadata.ok.decimals.toString(),
        image: ''
      }
    } catch (error: any) {
      return Error(error || 'getTokenMetadataRepo error occurred.');
    } finally {
      if (!(api instanceof Error)) {
        await api.disconnect();
      }
    }
  }
}
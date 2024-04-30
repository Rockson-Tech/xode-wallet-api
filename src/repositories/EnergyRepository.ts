import TXRepository from '../modules/TXRepository';
import InitializeAPI from '../modules/InitializeAPI';
import { Keyring } from '@polkadot/api';
import { cryptoWaitReady } from '@polkadot/util-crypto';
import abi from '../smartcontracts/energy.json';
import date from 'date-and-time';
import { IDecreaseEnergyRequestBody } from '../schemas/EnergySchemas';

export default class EnergyRepository {
  energyAddress = process.env.ASTRO_ENERGY_ADDRESS as string;
  ownerSeed = process.env.OWNER_SEED as string;
  // These are required and changeable
  REFTIME: number = 300000000000;
  PROOFSIZE: number = 500000;

  static async decreaseEnergyRepo(data: IDecreaseEnergyRequestBody) {
    console.log('decreaseEnergyRepo function was called');
    const instance = new EnergyRepository();
    var api: any;
    try {
      await cryptoWaitReady();
      api = await InitializeAPI.apiInitialization();
      if (api instanceof Error) {
        return api;
      }
      const contractAddress = instance.energyAddress;
      const contract = await TXRepository.getContract(api, abi, contractAddress);
      const keyring = new Keyring({ type: 'sr25519', ss58Format: 0 });
      const owner = keyring.addFromUri(instance.ownerSeed);
      const storageDepositLimit = null;
      const now = new Date();
      const time = date.format(now, 'YYYY/MM/DD');
      if (contract === undefined) {
        return Error('decreaseEnergyRepo contract undefined.');
      }
      const result = await TXRepository.sendContractTransaction(
        api,
        contract,
        'decreaseEnergy',
        owner,
        [
          data.decrease,
          data.owner,
          time
        ],
        instance,
        storageDepositLimit
      );
      return result;
    } catch (error: any) {
      return Error(error || 'decreaseEnergyRepo error occurred.');
    } finally {
      if (!(api instanceof Error)) {
        await api.disconnect();
      }
    }
  }

  static async resetEnergyRepo(ownerAddress: string) {
    console.log('resetEnergyRepo function was called');
    const instance = new EnergyRepository();
    var api: any;
    try {
      await cryptoWaitReady();
      api = await InitializeAPI.apiInitialization();
      if (api instanceof Error) {
        return api;
      }
      const contractAddress = instance.energyAddress;
      const contract = await TXRepository.getContract(api, abi, contractAddress);
      const keyring = new Keyring({ type: 'sr25519', ss58Format: 0 });
      const owner = keyring.addFromUri(instance.ownerSeed);
      const storageDepositLimit = null;
      const now = new Date();
      const time = date.format(now, 'YYYY/MM/DD');
      if (contract === undefined) {
        return Error('resetEnergyRepo contract undefined.');
      }
      const result = await TXRepository.sendContractTransaction(
        api,
        contract,
        'resetEnergy',
        owner,
        [ 
          ownerAddress,
          time
        ],
        instance,
        storageDepositLimit
      );
      return result;
    } catch (error: any) {
      return Error(error || 'resetEnergyRepo error occurred.');
    } finally {
      if (!(api instanceof Error)) {
        await api.disconnect();
      }
    }
  }

  static async setEnergyRepo(data: any) {
    console.log('setEnergyRepo function was called');
    const instance = new EnergyRepository();
    var api: any;
    try {
      await cryptoWaitReady();
      api = await InitializeAPI.apiInitialization();
      if (api instanceof Error) {
        return api;
      }
      const contractAddress = instance.energyAddress;
      const contract = await TXRepository.getContract(api, abi, contractAddress);
      const keyring = new Keyring({ type: 'sr25519', ss58Format: 0 });
      const owner = keyring.addFromUri(instance.ownerSeed);
      const storageDepositLimit = null;
      const now = new Date();
      const time = date.format(now, 'YYYY/MM/DD');
      if (contract === undefined) {
        return Error('setEnergyRepo contract undefined.');
      }
      const result = await TXRepository.sendContractTransaction(
        api,
        contract,
        'setEnergy',
        owner,
        [ 
          data.energy,
          data.owner,
          time
        ],
        instance,
        storageDepositLimit
      );
      return result;
    } catch (error: any) {
      return Error(error || 'setEnergyRepo error occurred.');
    } finally {
      if (!(api instanceof Error)) {
        await api.disconnect();
      }
    }
  }

  static async setEnergyImageRepo(image_url: string) {
    console.log('setEnergyImageRepo function was called');
    const instance = new EnergyRepository();
    var api: any;
    try {
      await cryptoWaitReady();
      api = await InitializeAPI.apiInitialization();
      if (api instanceof Error) {
        return api;
      }
      const contractAddress = instance.energyAddress;
      const contract = await TXRepository.getContract(api, abi, contractAddress);
      const keyring = new Keyring({ type: 'sr25519', ss58Format: 0 });
      const owner = keyring.addFromUri(instance.ownerSeed);
      const storageDepositLimit = null;
      if (contract === undefined) {
        return Error('setEnergyImageRepo contract undefined.');
      }
      const result = await TXRepository.sendContractTransaction(
        api,
        contract,
        'setEnergyImage',
        owner,
        [ image_url ],
        instance,
        storageDepositLimit
      );
      return result;
    } catch (error: any) {
      return Error(error || 'setEnergyImageRepo error occurred.');
    } finally {
      if (!(api instanceof Error)) {
        await api.disconnect();
      }
    }
  }
  
  static async getEnergyRepo(ownerAddress: String) {
    console.log('getEnergyRepo function was called');
    const instance = new EnergyRepository();
    var api: any;
    try {
      await cryptoWaitReady();
      api = await InitializeAPI.apiInitialization();
      if (api instanceof Error) {
        return api;
      }
      const contract = await TXRepository.getContract(api, abi, instance.energyAddress);
      if (!contract) {
        return Error('Contract not initialized.');
      }
      if (!contract.query || !contract.query.getEnergy) {
        return Error('getEnergyRepo function not found in the contract ABI.');
      }
      const now = new Date();
      const time = date.format(now, 'YYYY/MM/DD');
      const energy = await TXRepository.sendContractQuery(
        api,
        contract,
        'getEnergy',
        [ 
          ownerAddress, 
          time 
        ],
        instance
      );
      const result = energy.ok;
      if (result != null) {
        return { 
          currentEnergy: result.energy,
          resetable: result.resetable,
          imagePath: result.imagePath,
          maxEnergy: 20,
        };
      } else {
        return result;
      }
    } catch (error: any) {
      return Error(error || 'getEnergyRepo error occurred.');
    } finally {
      if (!(api instanceof Error)) {
        await api.disconnect();
      }
    }
  }

  static async getEnergyImageRepo() {
    console.log('getEnergyRepo function was called');
    const instance = new EnergyRepository();
    var api: any;
    try {
      await cryptoWaitReady();
      api = await InitializeAPI.apiInitialization();
      if (api instanceof Error) {
        return api;
      }
      const contract = await TXRepository.getContract(api, abi, instance.energyAddress);
      if (!contract) {
        return Error('Contract not initialized.');
      }
      if (!contract.query || !contract.query.getEnergyImage) {
        return Error('getEnergyImage function not found in the contract ABI.');
      }
      const energy = await TXRepository.sendContractQuery(
        api,
        contract,
        'getEnergyImage',
        [],
        instance
      );
      return { image_path: energy.ok };
    } catch (error: any) {
      return Error(error || 'getEnergyImageRepo error occurred.');
    } finally {
      if (!(api instanceof Error)) {
        await api.disconnect();
      }
    }
  }

  static async checkTimeRepo(owner: String) {
    console.log('checkTimeRepo function was called');
    const instance = new EnergyRepository();
    var api: any;
    try {
      await cryptoWaitReady();
      api = await InitializeAPI.apiInitialization();
      if (api instanceof Error) {
        return api;
      }
      const contract = await TXRepository.getContract(api, abi, instance.energyAddress);
      const now = new Date();
      const time = date.format(now, 'YYYY/MM/DD');
      if (!contract) {
        return Error('Contract not initialized.');
      }
      if (!contract.query || !contract.query.getEnergyImage) {
        return Error('getEnergyImage function not found in the contract ABI.');
      }
      const energy = await TXRepository.sendContractQuery(
        api,
        contract,
        'checkTime',
        [ 
          owner,
          time 
        ],
        instance
      );
      return { reset_energy: energy.ok };
    } catch (error: any) {
      return Error(error || 'checkTimeRepo error occurred.');
    } finally {
      if (!(api instanceof Error)) {
        await api.disconnect();
      }
    }
  }
}
import TXRepository from '../modules/TXRepository';
import { ApiPromise, Keyring } from '@polkadot/api';
import { WsProvider } from '@polkadot/rpc-provider';
import abi from '../energy.json';
import date from 'date-and-time';
import { IDecreaseEnergyRequestBody } from '../schemas/EnergySchemas';

export default class EnergyRepository {
  wsProvider = new WsProvider(process.env.WS_PROVIDER_ENDPOINT as string);
  api = ApiPromise.create({ 
      types: { 
      AccountInfo: 'AccountInfoWithDualRefCount'
      }, 
      provider: this.wsProvider 
  });
  keypair = process.env.KEYPAIR;
  energyAddress = process.env.ENERGY_ADDRESS as string;
  contractOwner = process.env.CONTRACT_OWNER as string;
  ownerSeed = process.env.OWNER_SEED as string;
  // These are required and changeable
  REFTIME: number = 300000000000;
  PROOFSIZE: number = 500000;

  static async decreaseEnergyRepo(data: IDecreaseEnergyRequestBody) {
    console.log('decreaseEnergyRepo function was called');
    const instance = new EnergyRepository();
    const api = await instance.api;
    try {
      const contractAddress = instance.energyAddress;
      const contract = await TXRepository.getContract(api, abi, contractAddress);
      const keyring = new Keyring({ type: 'sr25519', ss58Format: 0 });
      const owner = keyring.addFromUri(instance.ownerSeed);
      const storageDepositLimit = null;
      const now = new Date();
      const time = date.format(now, 'YYYY/MM/DD');
      if (contract === undefined) {
        throw String('decreaseEnergyRepo contract undefined.');
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
    } catch (error) {
      throw String(error || 'decreaseEnergyRepo error occurred.');
    } finally {
      await api.disconnect();
    }
  }

  static async resetEnergyRepo(ownerAddress: string) {
    console.log('resetEnergyRepo function was called');
    const instance = new EnergyRepository();
    const api = await instance.api;
    try {
      const contractAddress = instance.energyAddress;
      const contract = await TXRepository.getContract(api, abi, contractAddress);
      const keyring = new Keyring({ type: 'sr25519', ss58Format: 0 });
      const owner = keyring.addFromUri(instance.ownerSeed);
      const storageDepositLimit = null;
      const now = new Date();
      const time = date.format(now, 'YYYY/MM/DD');
      if (contract === undefined) {
        throw String('resetEnergyRepo contract undefined.');
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
    } catch (error) {
      throw String(error || 'resetEnergyRepo error occurred.');
    } finally {
      await api.disconnect();
    }
  }

  static async setEnergyRepo(data: any) {
    console.log('setEnergyRepo function was called');
    const instance = new EnergyRepository();
    const api = await instance.api;
    try {
      const contractAddress = instance.energyAddress;
      const contract = await TXRepository.getContract(api, abi, contractAddress);
      const keyring = new Keyring({ type: 'sr25519', ss58Format: 0 });
      const owner = keyring.addFromUri(instance.ownerSeed);
      const storageDepositLimit = null;
      const now = new Date();
      const time = date.format(now, 'YYYY/MM/DD');
      if (contract === undefined) {
        throw String('setEnergyRepo contract undefined.');
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
    } catch (error) {
      throw String(error || 'setEnergyRepo error occurred.');
    } finally {
      await api.disconnect();
    }
  }

  static async setEnergyImageRepo(image_url: string) {
    console.log('setEnergyImageRepo function was called');
    const instance = new EnergyRepository();
    const api = await instance.api;
    try {
      const contractAddress = instance.energyAddress;
      const contract = await TXRepository.getContract(api, abi, contractAddress);
      const keyring = new Keyring({ type: 'sr25519', ss58Format: 0 });
      const owner = keyring.addFromUri(instance.ownerSeed);
      const storageDepositLimit = null;
      if (contract === undefined) {
        throw String('setEnergyImageRepo contract undefined.');
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
    } catch (error) {
      throw String(error || 'setEnergyImageRepo error occurred.');
    } finally {
      await api.disconnect();
    }
  }
  
  static async getEnergyRepo(ownerAddress: String) {
    console.log('getEnergyRepo function was called');
    const instance = new EnergyRepository();
    const api = await instance.api;
    try {
      const contract = await TXRepository.getContract(api, abi, instance.energyAddress);
      if (!contract) {
        throw new Error('Contract not initialized.');
      }
      if (!contract.query || !contract.query.getEnergy) {
        throw new Error('getEnergyRepo function not found in the contract ABI.');
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
    } catch (error) {
      throw String(error || 'getEnergyRepo error occurred.');
    } finally {
      await api.disconnect();
    }
  }

  static async getEnergyImageRepo() {
    console.log('getEnergyRepo function was called');
    const instance = new EnergyRepository();
    const api = await instance.api;
    try {
      const contract = await TXRepository.getContract(api, abi, instance.energyAddress);
      if (!contract) {
        throw new Error('Contract not initialized.');
      }
      if (!contract.query || !contract.query.getEnergyImage) {
        throw new Error('getEnergyImage function not found in the contract ABI.');
      }
      const energy = await TXRepository.sendContractQuery(
        api,
        contract,
        'getEnergyImage',
        [],
        instance
      );
      return { image_path: energy.ok };
    } catch (error) {
      throw String(error || 'getEnergyImageRepo error occurred.');
    } finally {
      await api.disconnect();
    }
  }

  static async checkTimeRepo(owner: String) {
    console.log('checkTimeRepo function was called');
    const instance = new EnergyRepository();
    const api = await instance.api;
    try {
      const contract = await TXRepository.getContract(api, abi, instance.energyAddress);
      const now = new Date();
      const time = date.format(now, 'YYYY/MM/DD');
      if (!contract) {
        throw new Error('Contract not initialized.');
      }
      if (!contract.query || !contract.query.getEnergyImage) {
        throw new Error('getEnergyImage function not found in the contract ABI.');
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
    } catch (error) {
      throw String(error || 'checkTimeRepo error occurred.');
    } finally {
      await api.disconnect();
    }
  }
}
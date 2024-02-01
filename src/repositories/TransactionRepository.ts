import {
    ITransferNFTFromWOARequestBody,
    IUpdateNFTRequestBody,
} from '../schemas/NFTSchemas';
import TXRepository from '../modules/TXRepository';
import { ApiPromise, Keyring } from '@polkadot/api';
import { WsProvider } from '@polkadot/rpc-provider';
import abi from '../astrochibbismartcontract.json';

export default class TransactionRepository {
    wsProvider = new WsProvider(process.env.WS_PROVIDER_ENDPOINT as string);
    api = ApiPromise.create({ 
        types: { 
        AccountInfo: 'AccountInfoWithDualRefCount'
        }, 
        provider: this.wsProvider 
    });
    keypair = process.env.KEYPAIR;
    contractAddress = process.env.CONTRACT_ADDRESS as string;
    contractOwner = process.env.CONTRACT_OWNER as string;
    ownerSeed = process.env.OWNER_SEED as string;
    nftStorageToken = process.env.NFT_STORAGE_TOKEN as string;
    // These are required and changeable
    REFTIME: number = 300000000000;
    PROOFSIZE: number = 500000;

    static getNFTAtributes = async (data: string) => {
      const rarity: number = parseInt(data);
      const attackRange: Record<number, [number, number]> = {
        0: [1, 7],
        1: [8, 15],
        2: [16, 24],
        3: [25, 30],
      };
      const attack = 10 + this.getRandomRange(attackRange, rarity);
      const defenseRange: Record<number, [number, number]> = {
        0: [1, 7],
        1: [8, 15],
        2: [16, 24],
        3: [25, 30],
      };
      const defense = 10 + this.getRandomRange(defenseRange, rarity);
      const hitpointsRange: Record<number, [number, number]> = {
        0: [1, 12],
        1: [13, 25],
        2: [26, 38],
        3: [39, 50],
      };
      const hitpoints = 100 + this.getRandomRange(hitpointsRange, rarity);
      const passiveType = Math.floor(Math.random() * (2 - 0 + 1)) + 0;
      const passivePercent = this.getPassivePercentage(rarity);

      const attributes = {
        rarity: rarity,
        attack: attack.toFixed(0),
        defense: defense.toFixed(0),
        hitpoints: hitpoints.toFixed(0),
        passive1: {
          type: passiveType,
          percentage: passivePercent.toFixed(2)
        }
      };
      return attributes;
    }

    static getRandomRange = (
      ranges: any,
      rarity: number
    ) => {
      const range = ranges[rarity];
      const [min, max] = range;
      return Math.random() * (max - min) + min;
    }

    static getPassivePercentage = (
      rarity: number
    ): number => {
      const ranges: Record<number, [number, number]> = {
        0: [0.01, 0.99],
        1: [1.00, 1.49],
        2: [1.50, 1.99],
        3: [2.00, 3.00],
      };
      return this.getRandomRange(ranges, rarity);
    }
    
    static async updateNFTRepo(nftData: IUpdateNFTRequestBody, id: number) {
        console.log('updateNFTRepo function was called');
        const instance = new TransactionRepository();
        const api = await instance.api;
        try {
          const contractAddress = instance.contractAddress;
          const contract = await TXRepository.getContract(api, abi, contractAddress);
          const keyring = new Keyring({ type: 'sr25519', ss58Format: 0 });
          const owner = keyring.addFromUri(instance.ownerSeed);
          const storageDepositLimit = null;
          if (contract !== undefined) { 
            const result = await TXRepository.sendContractTransaction(
              api,
              contract,
              'updateToken',
              owner,
              [
                id,
                nftData.image_path,
                nftData.name,
                nftData.description,
                nftData.price,
                nftData.is_for_sale,
                nftData.category,
                nftData.collection,
                nftData.astro_type,
                nftData.specs,
                nftData.blockchain_id,
              ],
              instance,
              storageDepositLimit
            );
            return result;
          }
          return;
        } catch (error) {
          throw String(error || 'updateNFTRepo error occurred.');
        } finally {
          await api.disconnect();
        }
    }

    static transferFromWithoutApprovalRepo = async (
        data: ITransferNFTFromWOARequestBody
      ) => {
        console.log('transferNFTFromWithoutApprovalRepo function was called');
        const instance = new TransactionRepository();
        const api = await instance.api;
        try {
          const contractAddress = instance.contractAddress;
          const contract = await TXRepository.getContract(api, abi, contractAddress);
          const keyring = new Keyring({ type: 'sr25519', ss58Format: 0 });
          const owner = keyring.addFromUri(instance.ownerSeed);
          const storageDepositLimit = null;
          if (contract !== undefined) {
            const result = await TXRepository.sendContractTransaction(
              api,
              contract,
              'transferFromWithoutApproval',
              owner,
              [data.from, data.to, data.id],
              instance,
              storageDepositLimit
            );
            return result;
          }
          return;
        } catch (error) {
          throw String(error || 'transferNFTFromWithoutApprovalRepo error occurred.');
        } finally {
          await api.disconnect();
        }
    }
    
    static instantiateContractRepo = async () => {
        console.log('instantiateContractRepo function was called');
        const instance = new TransactionRepository();
        const api = await instance.api;
        try {
          const contractAddress = instance.contractAddress;
          const contract = await TXRepository.getContract(api, abi, contractAddress);
          const keyring = new Keyring({ type: 'sr25519', ss58Format: 0 });
          const owner = keyring.addFromUri(instance.ownerSeed);
          const storageDepositLimit = null;
          const recipient = 'AliceAccountId';
          const close_duration = 3600;
          const signature = 'InitialSignature';
          const initValue = [recipient, close_duration, owner, signature];
          if (contract !== undefined) {
            const result = await TXRepository.sendContractTransaction(
              api,
              contract,
              'new',
              owner,
              initValue,
              instance,
              storageDepositLimit
            );
            return result;
          }
          return;
        } catch (error) {
          throw String(error || 'burnRepo error occurred.');
        } finally {
          await api.disconnect();
        }
    }
}
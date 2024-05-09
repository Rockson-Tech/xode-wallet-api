import {
    ITransferNFTFromWOARequestBody,
    IUpdateNFTRequestBody,
} from '../schemas/NFTSchemas';
import TXRepository from '../modules/TXRepository';
import InitializeAPI from '../modules/InitializeAPI';
import { Keyring } from '@polkadot/api';
import { cryptoWaitReady } from '@polkadot/util-crypto';
import abi from '../smartcontracts/astrochibbi/astro_nft.json';

export default class AstroChibbiRepository {
    contractAddress = process.env.ASTROCHIBBI_ADDRESS as string;
    ownerSeed = process.env.ASTROCHIBBI_SEED as string;
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
        const instance = new AstroChibbiRepository();
        var api: any;
        try {
          await cryptoWaitReady();
          api = await InitializeAPI.apiInitialization();
          if (api instanceof Error) {
            return api;
          }
          const contractAddress = instance.contractAddress;
          const contract = await TXRepository.getContract(api, abi, contractAddress);
          const keyring = new Keyring({ type: 'sr25519', ss58Format: 0 });
          const owner = keyring.addFromUri(instance.ownerSeed);
          const storageDepositLimit = null;
          if (contract === undefined) { 
            return Error('Contract undefined');
          }
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
        } catch (error: any) {
          return Error(error || 'updateNFTRepo error occurred.');
        } finally {
          if (api) {
            await api.disconnect();
          }
        }
    }

    static transferFromWithoutApprovalRepo = async (
        data: ITransferNFTFromWOARequestBody
      ) => {
        console.log('transferNFTFromWithoutApprovalRepo function was called');
        const instance = new AstroChibbiRepository();
        var api: any;
        try {
          await cryptoWaitReady();
          api = await InitializeAPI.apiInitialization();
          if (api instanceof Error) {
            return api;
          }
          const contractAddress = instance.contractAddress;
          const contract = await TXRepository.getContract(api, abi, contractAddress);
          const keyring = new Keyring({ type: 'sr25519', ss58Format: 0 });
          const owner = keyring.addFromUri(instance.ownerSeed);
          const storageDepositLimit = null;
          if (contract === undefined) {
            return Error('Contract undefined');
          }
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
        } catch (error: any) {
          return Error(error || 'transferNFTFromWithoutApprovalRepo error occurred.');
        } finally {
          if (api) {
            await api.disconnect();
          }
        }
    }
}
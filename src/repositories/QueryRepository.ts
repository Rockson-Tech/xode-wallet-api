import TXRepository from '../modules/TXRepository';
import abi from '../astrochibbismartcontract.json';
import { ApiPromise } from '@polkadot/api';
import { WsProvider } from '@polkadot/rpc-provider';
import NFT from '../models/nft';

export default class QueryRepository {
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
    walletAddress: any;
    injector: any;
    filePath = '../';
    // These are required and changeable
    REFTIME: number = 300000000000;
    PROOFSIZE: number = 500000;
    
    static async getMarketplaceNftsByCollectionIdRepo(data: any) {
        console.log('getMarketplaceNftsByCollectionIdRepo function was called');
        const instance = new QueryRepository();
        const api = await instance.api;
        try {
          const contract = await TXRepository.getContract(api, abi, instance.contractAddress);
          if (contract !== undefined) {
            const nft = await TXRepository.sendContractQuery(
              api,
              contract,
              'getMarketplaceNftsByCollection',
              [data.collection_id],
              instance
            );
            return nft.ok;
          }
        } catch (error) {
          throw String(error || 'getMarketplaceNftsByCollectionIdRepo error occurred.');
        } finally {
          await api.disconnect();
        }
    }
    
    static async getUserNFTRepo(wallet_address: string) {
        console.log('getUserNFTRepo function was called');
        const instance = new QueryRepository();
        const api = await instance.api;
        try {
          const contract = await TXRepository.getContract(api, abi, instance.contractAddress);
          const player_wallet_address = wallet_address;
      
          if (!contract) {
            throw new Error('Contract not initialized.');
          }
      
          if (!contract.query || !contract.query.getUserNft) {
            throw new Error('getUserNft function not found in the contract ABI.');
          }
      
          const result = await TXRepository.sendContractQuery(
            api,
            contract,
            'getUserNft',
            [player_wallet_address],
            instance
          );
          const rarityMapping: Record<string, string> = {
            "0": "Normal",
            "1": "Rare",
            "2": "Epic",
            "3": "Legend"
          };
          if (result !== undefined) {
            const response: NFT[] = result.ok;
            const data = response.map((item) => {
              console.log(item.stats);
              return {
                ...item,
                rarity: rarityMapping[item.stats.rarity]
              };
            });
            return data;
          } else {
            return [{
              nftTokenId: undefined,
              imagePath: "",
              name: "",
              description: "",
              price: undefined,
              isForSale: undefined,
              isEquipped: undefined,
              category: "",
              collection: "",
              astroType: "",
              rarity: "",
              network: "",
              blockchainId: "",
              collectionId: "",
              tokenOwner: ""
            }]
          }
        } catch (error) {
          throw String(error || 'getUserNFTRepo error occurred.');
        } finally {
          await api.disconnect();
        }
    }
    
    static async getNFTByIdRepo(token_id: string) {
        console.log('getNFTByIdRepo function was called');
        const instance = new QueryRepository();
        const api = await instance.api;
        try {
          
          const contract = await TXRepository.getContract(api, abi, instance.contractAddress);
          const tokenId = token_id;
      
          if (!contract) {
            throw new Error('Contract not initialized.');
          }
      
          if (!contract.query || !contract.query.getNftById) {
            throw new Error('getNFTById function not found in the contract ABI.');
          }
      
          const result = await TXRepository.sendContractQuery(
            api,
            contract,
            'getNftById',
            [tokenId],
            instance
          );
          const response = result.ok;
          const rarityMapping: Record<string, string> = {
            "0": "Normal",
            "1": "Rare",
            "2": "Epic",
            "3": "Legend"
          };
          const data = {
            ...response,
            rarity: rarityMapping[response.stats.rarity],
            stats: undefined
          }
          if (result.ok != null) {
            return data;
          } else {
            throw new Error('Token Not Found');
          }
        } catch (error) {
          throw String(error || 'getNFTByIdRepo error occurred.');
        } finally {
          await api.disconnect();
        }
    }
}
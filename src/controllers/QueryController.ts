import { FastifyReply, FastifyRequest } from 'fastify';
import {
    IGetMarketplaceNFTRequestBody,
    IGetUserNFTRequestParams,
    IGetNFTByIdRequestParams,
} from '../schemas/NFTSchemas';
import QueryRepository from '../repositories/QueryRepository';
import EnergyRepository from '../repositories/EnergyRepository';

export const getMarketplaceNftsHandler = async (
    request: FastifyRequest,
    reply: FastifyReply
) => {

    const requestBody = request.body as IGetMarketplaceNFTRequestBody;
    if (!requestBody || !requestBody.collection_id) {
        return reply.badRequest("Invalid request body. Required fields: 'collection_id'.");
    }

    try {
        const nfts = await QueryRepository.getMarketplaceNftsByCollectionIdRepo(requestBody);
        return reply.send(nfts);
    } catch (error) {
        console.error(`getMarketplaceNftsHandler: error trying to get NFT: ${error}`);
        reply.internalServerError(String(error || 'Unknown error occurred.'));
    }
};

export const getUserNftsHandler = async (
    request: FastifyRequest,
    reply: FastifyReply
) => {

    const requestParams = request.params as IGetUserNFTRequestParams;
    if (!requestParams || !requestParams.wallet_address) {
        return reply.badRequest("Invalid request parameters. Required parameter: wallet address");
    }

    try {
        const nfts: any = await QueryRepository.getUserNFTRepo(requestParams.wallet_address);
        return reply.send(nfts);
    } catch (error) {
        console.error(`getUserNftsHandler: error trying to get NFT: ${error}`);
        reply.internalServerError(String(error || 'Unknown error occurred.'));
    }
};

export const getNftByIdHandler = async (
    request: FastifyRequest,
    reply: FastifyReply
) => {

    const requestParams = request.params as IGetNFTByIdRequestParams;
    if (!requestParams || !requestParams.token_id) {
        return reply.badRequest("Invalid request parameters. Required parameter: token ID");
    }

    try {
        const nfts = await QueryRepository.getNFTByIdRepo(requestParams.token_id);
        if (nfts == null) {
            return reply.send([]);
        } else {
            return reply.send(nfts);
        }
    } catch (error) {
        console.error(`getNftByIdHandler: error trying to get NFT: ${error}`);
        reply.internalServerError(String(error || 'Unknown error occurred.'));
    }
};

export const dashboardNftHandler = async (
    request: FastifyRequest,
    reply: FastifyReply
) => {

    const requestParams = request.params as IGetUserNFTRequestParams;
    if (!requestParams || !requestParams.wallet_address) {
        return reply.badRequest("Invalid request parameters. Required parameter: wallet address");
    }

    try {
        const [nfts, energy] = await Promise.all([
            QueryRepository.getUserNFTRepo(requestParams.wallet_address),
            EnergyRepository.getEnergyRepo(requestParams.wallet_address),
        ]);
        let result: any;
        if (energy == null) {
            const data = {
                owner: requestParams.wallet_address,
                energy: 20,
            };
            await EnergyRepository.setEnergyRepo(data);
            result = await EnergyRepository.getEnergyRepo(requestParams.wallet_address);
        } else {
            result = energy;
            if (result.resetable) {
                await EnergyRepository.resetEnergyRepo(requestParams.wallet_address);
                result = await EnergyRepository.getEnergyRepo(requestParams.wallet_address);
            }
        }
        if (result != null) {
            const nftEntry: any = {
                nftTokenId: 0,
                imagePath: result.imagePath || '',
                name: 'Energy Capsule',
                description: 'An energy capsule that can be used to use characters.',
                price: result.currentEnergy,
                isForSale: false,
                isEquipped: true,
                category: 'Capsule',
                collection: 'AstroChibbi Conquest: Galactic Delight',
                astroType: 'None',
                rarity: 'None',
                network: 'None',
                blockchainId: 'None',
                collectionId: '5FJ9VWpubQXeiLKGcVmo3zD627UAJCiW6bupSUATeyNXTH1m',
                tokenOwner: requestParams.wallet_address,
            };
            nfts.push(nftEntry);
        }
        return reply.send(nfts);
    } catch (error) {
        console.error(`dashboardNftHandler: error trying to get NFT: ${error}`);
        reply.internalServerError(String(error || 'Unknown error occurred.'));
    } 
};

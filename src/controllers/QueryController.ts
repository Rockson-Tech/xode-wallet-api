import { FastifyReply, FastifyRequest } from 'fastify';
import {
    IGetMarketplaceNFTRequestBody,
    IGetUserNFTRequestParams,
    IGetNFTByIdRequestParams,
} from '../schemas/NFTSchemas';
import QueryRepository from '../repositories/QueryRepository';

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
        const [nfts] = await Promise.all([
            QueryRepository.getUserNFTRepo(requestParams.wallet_address),
        ]);
        return reply.send(nfts);
    } catch (error) {
        console.error(`dashboardNftHandler: error trying to get NFT: ${error}`);
        reply.internalServerError(String(error || 'Unknown error occurred.'));
    }    
};

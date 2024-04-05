import { FastifyReply, FastifyRequest } from 'fastify';
import {
    IUpdateOneNFTRequestParams,
    IUpdateNFTRequestBody,
    ITransferNFTFromWOARequestBody,
} from '../schemas/NFTSchemas';
import TransactionRepository from '../repositories/TransactionRepository';

export const updateNFTHandler = async (
    request: FastifyRequest,
    reply: FastifyReply
) => {
    try {
        const requestParams = request.params as IUpdateOneNFTRequestParams;
        if (!requestParams || !requestParams.id) {
            return reply.badRequest("Missing 'id' parameter in URI 'nfts/:id'");
        }

        const requestBody = request.body as IUpdateNFTRequestBody;
        if (!requestBody) {
            return reply.badRequest('Missing or invalid request body.');
        }
        if (
            !requestBody.name &&
            !requestBody.description &&
            !requestBody.category &&
            !requestBody.collection &&
            !requestBody.image_path &&
            !requestBody.price &&
            requestBody.is_for_sale === undefined &&
            !requestBody.astro_type &&
            !requestBody.specs &&
            !requestBody.blockchain_id
        ) {
            return reply.badRequest("Invalid request body.");
        }
        
        const targetNFT = await TransactionRepository.updateNFTRepo(
        requestBody,
        requestParams.id,
        );

        return reply.send(targetNFT);
    } catch (error) {
        reply.status(500).send('Internal Server Error: ' + error);
    }
};

export const transferFromWOANFTHandler = async (
    request: FastifyRequest,
    reply: FastifyReply
) => {
    try {
        const requestBody = request.body as ITransferNFTFromWOARequestBody;
        if (
            !requestBody || 
            !requestBody.from ||
            !requestBody.to ||
            !requestBody.id
            ) {
            return reply.badRequest("Missing or invalid request body.");
        }
        const result = await TransactionRepository.transferFromWithoutApprovalRepo(requestBody);
        return reply.send(result);
    } catch (error) {
        reply.status(500).send('Internal Server Error: ' + error);
    }
};
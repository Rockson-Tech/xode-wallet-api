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

    try {
        const targetNFT = await TransactionRepository.updateNFTRepo(
        requestBody,
        requestParams.id,
        );

        return reply.send(targetNFT);
    } catch (error) {
        console.error(`updateNFTHandler: error trying to update nft: ${error}`);
        reply.internalServerError(String(error || 'Unknown error occurred.'));
    }
};

export const transferFromWOANFTHandler = async (
    request: FastifyRequest,
    reply: FastifyReply
) => {
    const requestBody = request.body as ITransferNFTFromWOARequestBody;
    if (
        !requestBody || 
        !requestBody.from ||
        !requestBody.to ||
        !requestBody.id
        ) {
        return reply.badRequest("Missing or invalid request body.");
    }

    try {
        const result = await TransactionRepository.transferFromWithoutApprovalRepo(requestBody);
        return reply.send(result);
    } catch (error) {
        console.error(`transferFromWOANFTHandler: error trying to transfer-from-woa nft: ${error}`);
        reply.internalServerError(String(error || 'Unknown error occurred.'));
    }
};
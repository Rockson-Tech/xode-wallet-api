import { FastifyReply, FastifyRequest } from 'fastify';
import ChainRepository from '../repositories/ChainRepository';

// Get smart contract
export const getSmartContractController = async (
    request: FastifyRequest,
    reply: FastifyReply
) => {
    try {
        const result = await ChainRepository.getSmartContractRepo();
        return await reply.send(result);
    } catch (error) {
        console.error(`getSmartContractController: error trying to get NFT: ${error}`);
        reply.internalServerError(String(error || 'Unknown error occurred.'));
    }
};

export const getABIController = async (
    request: FastifyRequest,
    reply: FastifyReply
) => {
    try {
        const result = await ChainRepository.getABIRepo();
        return await reply.send(result);
    } catch (error) {
        console.error(`getSmartContractController: error trying to get NFT: ${error}`);
        reply.internalServerError(String(error || 'Unknown error occurred.'));
    }
};

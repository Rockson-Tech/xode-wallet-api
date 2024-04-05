import { FastifyReply, FastifyRequest } from 'fastify';
import ChainRepository from '../repositories/ChainRepository';
import EconomyRepository from '../repositories/EconomyRepository';
import { ITokensRequestParams } from '../schemas/ChainSchemas';

// Get smart contract
export const getSmartContractController = async (
    request: FastifyRequest,
    reply: FastifyReply
) => {
    try {
        const result = await ChainRepository.getSmartContractRepo();
        return await reply.send(result);
    } catch (error) {
        reply.status(500).send('Internal Server Error: ' + error);
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
        reply.status(500).send('Internal Server Error: ' + error);
    }
};

export const getTokensController = async (
    request: FastifyRequest,
    reply: FastifyReply
) => {
    try {
        const requestParams = request.params as ITokensRequestParams;
        if (!requestParams || !requestParams.wallet_address) {
            return reply.badRequest("Invalid request parameter. Required fields: 'wallet_address'");
        }
        
        let tokens = [];
        const native = await ChainRepository.getTokensRepo(requestParams.wallet_address);
        const astro = await EconomyRepository.balanceOfRepo(requestParams.wallet_address);
        tokens.push(native);
        tokens.push(astro);
        return await reply.send(tokens);
    } catch (error) {
        reply.status(500).send('Internal Server Error: ' + error);
    }
};

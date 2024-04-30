import { FastifyReply, FastifyRequest } from 'fastify';
import ChainRepository from '../repositories/ChainRepository';
import AstroRepository from '../repositories/AstroRepository';
import { ITokensRequestParams } from '../schemas/ChainSchemas';
import WebsocketHeader from '../modules/WebsocketHeader';

// Get smart contract
export const getSmartContractController = async (
    request: FastifyRequest,
    reply: FastifyReply
) => {
    try {
        WebsocketHeader.handleWebsocket(request);
        const result = await ChainRepository.getSmartContractRepo();
        if (result instanceof Error) {
            throw result;
        }
        return await reply.send(result);
    } catch (error: any) {
        reply.status(500).send('Internal Server Error: ' + error);
    }
};

export const getABIController = async (
    request: FastifyRequest,
    reply: FastifyReply
) => {
    try {
        const result = await ChainRepository.getABIRepo();
        if (result instanceof Error) {
            throw result;
        }
        return await reply.send(result);
    } catch (error: any) {
        reply.status(500).send('Internal Server Error: ' + error);
    }
};

export const getTokensController = async (
    request: FastifyRequest,
    reply: FastifyReply
) => {
    try {
        WebsocketHeader.handleWebsocket(request);
        const requestParams = request.params as ITokensRequestParams;
        if (!requestParams || !requestParams.wallet_address) {
            return reply.badRequest("Invalid request parameter. Required fields: 'wallet_address'");
        }
        
        let tokens = [];
        const native = await ChainRepository.getTokensRepo(requestParams.wallet_address);
        const astro = await AstroRepository.balanceOfRepo(requestParams.wallet_address);
        if (native instanceof Error || astro instanceof Error) {
            throw native || astro;
        }
        tokens.push(native);
        tokens.push(astro);
        return await reply.send(tokens);
    } catch (error: any) {
        reply.status(500).send('Internal Server Error: ' + error);
    }
};

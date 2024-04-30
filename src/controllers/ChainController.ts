import { FastifyReply, FastifyRequest } from 'fastify';
import ChainRepository from '../repositories/ChainRepository';
import AstroRepository from '../repositories/AstroRepository';
import { ITokensRequestParams } from '../schemas/ChainSchemas';
import WebsocketHeader from '../modules/WebsocketHeader';
import AzkalRepository from '../repositories/AzkalRepository';
import XGameRepository from '../repositories/XGameRepository';
import XaverRepository from '../repositories/XaverRepository';

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
        
        // let tokens = [];
        // const native = await ChainRepository.getTokensRepo(requestParams.wallet_address);
        // const astro = await AstroRepository.balanceOfRepo(requestParams.wallet_address);
        // if (native instanceof Error || astro instanceof Error) {
        //     throw native || astro;
        // }
        const native = await Promise.all([
            ChainRepository.getTokensRepo(requestParams.wallet_address),
            AstroRepository.balanceOfRepo(requestParams.wallet_address),
            AzkalRepository.balanceOfRepo(requestParams.wallet_address),
            XGameRepository.balanceOfRepo(requestParams.wallet_address),
            XaverRepository.balanceOfRepo(requestParams.wallet_address)
        ])
        if (native instanceof Error) {
            throw native;
        }
        // return await reply.send(tokens);
        return await reply.send(native);
    } catch (error: any) {
        reply.status(500).send('Internal Server Error: ' + error);
    }
};

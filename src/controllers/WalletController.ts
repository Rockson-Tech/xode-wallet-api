import { FastifyReply, FastifyRequest } from 'fastify';
import WalletRepository from '../repositories/WalletRepository';
import { 
    ISaveWalletRequestBody,
    IReadOneWalletRequestParams,
    IUpdateWalletRequestParams,
    IUpdateWalletRequestBody,
    IDeleteWalletRequestParams,
} from '../schemas/WalletSchemas';

export const storeWalletController = async (
    request: FastifyRequest,
    reply: FastifyReply
) => {
    const requestBody = request.body as ISaveWalletRequestBody;
    if (
        !requestBody ||
        !requestBody.wallet_address
    ) {
        return reply.badRequest(
            "Invalid request body. Required fields: 'wallet_address'"
        );
    }

    try {
        const result = await WalletRepository.storeWallet(requestBody);
        if (result instanceof Error) {
            throw result;
        }
        return reply.send({ data: result });
    } catch (error: any) {
        reply.status(500).send('Internal Server Error: ' + error);
    }
};

export const readAllWalletController = async (
    request: FastifyRequest,
    reply: FastifyReply
) => {
    try {
        const result = await WalletRepository.getWallets();
        if (result instanceof Error) {
            throw result;
        }
        return reply.send({ data: result });
    } catch (error: any) {
        reply.status(500).send('Internal Server Error: ' + error);
    }
};

export const readOneWalletController = async (
    request: FastifyRequest,
    reply: FastifyReply
) => {
    try {
        const requestParams = request.params as IReadOneWalletRequestParams;
        if (!requestParams || !requestParams.id) {
            return reply.badRequest("Missing 'id' parameter in URI '/:id'");
        }

        let id: number = Number(requestParams.id)
        const result = await WalletRepository.getWalletById(
            id
        );
        if (result instanceof Error) {
            throw result;
        }
        return reply.send({ data: result });
    } catch (error: any) {
        reply.status(500).send('Internal Server Error: ' + error);
    }
};

export const updateWalletController = async (
    request: FastifyRequest,
    reply: FastifyReply
) => {
    const requestParams = request.params as IUpdateWalletRequestParams;
    if (!requestParams || !requestParams.id) {
        return reply.badRequest("Missing 'id' parameter in URI '/:id'");
    }
    const requestBody = request.body as IUpdateWalletRequestBody;
    if (!requestBody || !requestBody.wallet_address) {
        return reply.badRequest(
            "Invalid request body. Required fields: 'wallet_address'"
        );
    }
    try {
        const result = await WalletRepository.updateWallet(
            requestParams.id,
            requestBody
        );
        if (result instanceof Error) {
            throw result;
        }
        return reply.send({ data: result });
    } catch (error: any) {
        reply.status(500).send('Internal Server Error: ' + error);
    }
};

export const deleteWalletController = async (
    request: FastifyRequest,
    reply: FastifyReply
) => {
    const requestParams = request.params as IDeleteWalletRequestParams;
    requestParams.id = Number(requestParams.id);
    if (!requestParams || !requestParams.id) {
        return reply.badRequest("Missing 'id' parameter in URI '/:id'");
    }

    try {
        const result = await WalletRepository.deleteWallet(Number(requestParams.id));
        if (result instanceof Error) {
            throw result;
        }
        return reply.send(result);
    } catch (error: any) {
        reply.status(500).send('Internal Server Error: ' + error);
    }
};
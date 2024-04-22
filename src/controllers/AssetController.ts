import { FastifyReply, FastifyRequest } from 'fastify';
import {
  IMintRequestBody,
  ITransferRequestBody,
  IBurnRequestBody,
  IBalanceOfRequestParams
} from '../schemas/AssetSchemas';
import AzkalRepository from '../repositories/AzkalRepository';

export const mintController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const requestBody = request.body as IMintRequestBody;
    if (
      !requestBody || 
      !requestBody.to ||
      !requestBody.value
    ) {
      return reply.badRequest("Invalid request body. Required fields: 'to', 'value'");
    }

    const result = await AzkalRepository.mintRepo(requestBody);
    return await reply.send(result);
  } catch (error) {
    reply.status(500).send('Internal Server Error: ' + error);
  }
};

export const transferController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const requestBody = request.body as ITransferRequestBody;
    if (
      !requestBody || 
      !requestBody.to ||
      !requestBody.from ||
      !requestBody.value ||
      !requestBody.token
    ) {
      return reply.badRequest("Invalid request body.");
    }
    
    const result = await AzkalRepository.transferRepo(requestBody);
    return await reply.send(result);
  } catch (error) {
    reply.status(500).send('Internal Server Error: ' + error);
  }
};

export const burnController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const requestBody = request.body as IBurnRequestBody;
    if (
      !requestBody || 
      !requestBody.from ||
      !requestBody.value
    ) {
      return reply.badRequest("Invalid request body. Required fields: 'to', 'value'");
    }
    
    const result = await AzkalRepository.burnRepo(requestBody);
    return await reply.send(result);
  } catch (error) {
    reply.status(500).send('Internal Server Error: ' + error);
  }
};

export const totalSupplyController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const result = await AzkalRepository.totalSupplyRepo();
    return await reply.send(result);
  } catch (error) {
    console.error(`totalSupplyController: error trying to transfer balance: ${error}`);
    reply.status(500).send('Internal Server Error');
  }
};


export const balanceOfController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const requestParams = request.params as IBalanceOfRequestParams;
    if (!requestParams || !requestParams.account) {
      return reply.badRequest("Invalid request parameter. Required fields: 'account'");
    }
    
    const result = await AzkalRepository.balanceOfRepo(requestParams.account);
    return await reply.send(result);
  } catch (error) {
    reply.status(500).send('Internal Server Error: ' + error);
  }
};
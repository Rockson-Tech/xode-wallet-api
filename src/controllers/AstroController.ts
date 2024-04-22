import { FastifyReply, FastifyRequest } from 'fastify';
import {
  IMintRequestBody,
  ITransferRequestBody,
  IBurnRequestBody,
  IBalanceOfRequestParams
} from '../schemas/AstroSchemas';
import AstroRepository from '../repositories/AstroRepository';

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

    const result = await AstroRepository.mintRepo(requestBody);
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
    
    const result = await AstroRepository.transferRepo(requestBody);
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
    
    const result = await AstroRepository.burnRepo(requestBody);
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
    const result = await AstroRepository.totalSupplyRepo();
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
    
    const result = await AstroRepository.balanceOfRepo(requestParams.account);
    return await reply.send(result);
  } catch (error) {
    reply.status(500).send('Internal Server Error: ' + error);
  }
};
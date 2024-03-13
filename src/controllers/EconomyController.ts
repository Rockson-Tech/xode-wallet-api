import { FastifyReply, FastifyRequest } from 'fastify';
import {
  IMintRequestBody,
  ITransferRequestBody,
  IBurnRequestBody,
  IBalanceOfRequestParams
} from '../schemas/EconomySchemas';
import EconomyRepository from '../repositories/EconomyRepository';

export const mintController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const requestBody = request.body as IMintRequestBody;
  if (
    !requestBody || 
    !requestBody.to ||
    !requestBody.value
  ) {
    return reply.badRequest("Invalid request body. Required fields: 'to', 'value'");
  }

  try {
    const result = await EconomyRepository.mintRepo(requestBody);
    return await reply.send(result);
  } catch (error) {
    console.error(`decreaseEnergyController: error trying to decrease energy: ${error}`);
    reply.status(500).send('Internal Server Error');
  }
};

export const transferController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
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

  try {
    const result = await EconomyRepository.transferRepo(requestBody);
    return await reply.send(result);
  } catch (error) {
    console.error(`transferController: error trying to transfer balance: ${error}`);
    reply.status(500).send('Internal Server Error');
  }
};

export const burnController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const requestBody = request.body as IBurnRequestBody;
  if (
    !requestBody || 
    !requestBody.from ||
    !requestBody.value
  ) {
    return reply.badRequest("Invalid request body. Required fields: 'to', 'value'");
  }

  try {
    const result = await EconomyRepository.burnRepo(requestBody);
    return await reply.send(result);
  } catch (error) {
    console.error(`burnController: error trying to decrease energy: ${error}`);
    reply.status(500).send('Internal Server Error');
  }
};

export const totalSupplyController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const result = await EconomyRepository.totalSupplyRepo();
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
  const requestParams = request.params as IBalanceOfRequestParams;
  if (!requestParams || !requestParams.account) {
    return reply.badRequest("Invalid request parameter. Required fields: 'account'");
  }

  try {
    const result = await EconomyRepository.balanceOfRepo(requestParams.account);
    return await reply.send(result);
  } catch (error) {
    console.error(`balanceOfController: error trying to transfer balance: ${error}`);
    reply.status(500).send('Internal Server Error');
  }
};
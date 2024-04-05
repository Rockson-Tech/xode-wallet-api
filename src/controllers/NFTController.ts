import { FastifyReply, FastifyRequest } from 'fastify';
import {
  ISignedTransactionRequestBody,
  IBalanceTransferRequestBody,
} from '../schemas/NFTSchemas';
import NFTRepository from '../repositories/NFTRepository';

export const balanceTransferHandler = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const requestBody = request.body as IBalanceTransferRequestBody;
    if (!requestBody || 
      !requestBody.from ||
      !requestBody.amount
    ) {
      return reply.badRequest("Missing or invalid request body.");
    }
    const result = await NFTRepository.balanceTransferRepo(requestBody);
    return reply.send(result);
  } catch (error) {
    reply.status(500).send('Internal Server Error: ' + error);
  }
};

export const signedTransactionController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const requestBody = request.body as ISignedTransactionRequestBody;
    await NFTRepository.signedTransactionRepo(requestBody);
  } catch (error) {
    reply.status(500).send('Internal Server Error: ' + error);
  }
};

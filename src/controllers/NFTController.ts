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
  const requestBody = request.body as IBalanceTransferRequestBody;
  if (!requestBody || 
    !requestBody.from ||
    !requestBody.amount
  ) {
    return reply.badRequest("Missing or invalid request body.");
  }

  try {
    const result = await NFTRepository.balanceTransferRepo(requestBody);
    return reply.send(result);
  } catch (error) {
    console.error(`balanceTransferHandler: error trying to transfer balance: ${error}`);
    reply.status(500).send('Internal Server Error');
  }
};

export const signedTransactionController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const requestBody = request.body as ISignedTransactionRequestBody;
  try {
    await NFTRepository.signedTransactionRepo(requestBody);
  } catch (error) {
    console.error(`signedTransactionController: error trying to mint NFT: ${error}`);
    reply.status(500).send('Internal Server Error');
  }
};

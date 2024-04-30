import { FastifyReply, FastifyRequest } from 'fastify';
import {
  IBalanceTransferRequestBody,
  ISubmitExtrinsicRequestBody,
} from '../schemas/NFTSchemas';
import NFTRepository from '../repositories/NFTRepository';
import WebsocketHeader from '../modules/WebsocketHeader';

export const balanceTransferHandler = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    WebsocketHeader.handleWebsocket(request);
    const requestBody = request.body as IBalanceTransferRequestBody;
    if (!requestBody || 
      !requestBody.from ||
      !requestBody.amount
    ) {
      return reply.badRequest("Missing or invalid request body.");
    }
    const result = await NFTRepository.balanceTransferRepo(requestBody);
    if (result instanceof Error) {
      throw result;
    }
    return reply.send(result);
  } catch (error: any) {
    reply.status(500).send('Internal Server Error: ' + error);
  }
};

export const submitExtrinsicController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const requestBody = request.body as ISubmitExtrinsicRequestBody;
  try {
    WebsocketHeader.handleWebsocket(request);
    const result = await NFTRepository.submitExtrinsicRepo(requestBody);
    if (result instanceof Error) {
      throw result;
    }
    return reply.send(result);
  } catch (error) {
    reply.status(500).send('Internal Server Error: ' + error);
  }
};

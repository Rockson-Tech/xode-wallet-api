import { FastifyReply, FastifyRequest } from 'fastify';
import {
  IMintRequestBody,
  ITransferRequestBody,
  IBurnRequestBody,
  IBalanceOfRequestParams,
  IAirdropXGMRequestBody,
} from '../schemas/AssetSchemas';
import AzkalRepository from '../repositories/AzkalRepository';
import XaverRepository from '../repositories/XaverRepository';
import XGameRepository from '../repositories/XGameRepository';
import WebsocketHeader from '../modules/WebsocketHeader';

export const mintController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    WebsocketHeader.handleWebsocket(request);
    const requestBody = request.body as IMintRequestBody;
    if (
      !requestBody || 
      !requestBody.to ||
      !requestBody.value
    ) {
      return reply.badRequest("Invalid request body. Required fields: 'to', 'value'");
    }
    let result;
    if (request.url.includes("azk")) {
      result = await AzkalRepository.mintRepo(requestBody);
    } else if (request.url.includes("xav")) {
      result = await XaverRepository.mintRepo(requestBody);
    } else if (request.url.includes("xgm")) {
      result = await XGameRepository.mintRepo(requestBody);
    }
    if (result instanceof Error) {
      throw result;
    }
    return await reply.send(result);
  } catch (error: any) {
    reply.status(500).send('Internal Server Error: ' + error);
  }
};

export const transferController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    WebsocketHeader.handleWebsocket(request);
    const requestBody = request.body as ITransferRequestBody;
    if (
      !requestBody || 
      !requestBody.target ||
      !requestBody.value
    ) {
      return reply.badRequest("Invalid request body.");
    }
    let result;
    if (request.url.includes("azk")) {
      result = await AzkalRepository.transferRepo(requestBody);
    } else if (request.url.includes("xav")) {
      result = await XaverRepository.transferRepo(requestBody);
    } else if (request.url.includes("xgm")) {
      result = await XGameRepository.transferRepo(requestBody);
    }
    if (result instanceof Error) {
      throw result;
    }
    return await reply.send(result);
  } catch (error: any) {
    reply.status(500).send('Internal Server Error: ' + error);
  }
};

export const burnController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    WebsocketHeader.handleWebsocket(request);
    const requestBody = request.body as IBurnRequestBody;
    if (
      !requestBody || 
      !requestBody.from ||
      !requestBody.value
    ) {
      return reply.badRequest("Invalid request body. Required fields: 'to', 'value'");
    }
    let result;
    if (request.url.includes("azk")) {
      result = await AzkalRepository.burnRepo(requestBody);
    } else if (request.url.includes("xav")) {
      result = await XaverRepository.burnRepo(requestBody);
    } else if (request.url.includes("xgm")) {
      result = await XGameRepository.burnRepo(requestBody);
    }
    if (result instanceof Error) {
      throw result;
    }
    return await reply.send(result);
  } catch (error: any) {
    reply.status(500).send('Internal Server Error: ' + error);
  }
};

export const totalSupplyController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    WebsocketHeader.handleWebsocket(request);
    const result = await AzkalRepository.totalSupplyRepo();
    if (result instanceof Error) {
      throw result;
    }
    return await reply.send(result);
  } catch (error: any) {
    console.error(`totalSupplyController: error trying to transfer balance: ${error}`);
    reply.status(500).send('Internal Server Error');
  }
};


export const balanceOfController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    WebsocketHeader.handleWebsocket(request);
    const requestParams = request.params as IBalanceOfRequestParams;
    if (!requestParams || !requestParams.account) {
      return reply.badRequest("Invalid request parameter. Required fields: 'account'");
    }
    
    const result = await AzkalRepository.balanceOfRepo(requestParams.account);
    if (result instanceof Error) {
      throw result;
    }
    return await reply.send(result);
  } catch (error: any) {
    reply.status(500).send('Internal Server Error: ' + error);
  }
};

export const airdropXGMController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    WebsocketHeader.handleWebsocket(request);
    let { account } = request.body as IAirdropXGMRequestBody;
    account = Array.from(new Set(account));
    if (Array.isArray(account) && account.length <= 0) {
      return reply.badRequest("Invalid request body. Required field at least one 'account'");
    }
    let result;
    if (request.url.includes("azk")) {
      result = await AzkalRepository.airdropXGMRepo(account);
    } else if (request.url.includes("xgm")) {
      result = await XGameRepository.airdropXGMRepo(account);
    }
    if (result instanceof Error) {
      throw result;
    }
    return await reply.send(result);
  } catch (error: any) {
    reply.status(500).send('Internal Server Error: ' + error);
  }
};
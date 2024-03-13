import { FastifyReply, FastifyRequest } from 'fastify';
import ChainRepository from '../repositories/ChainRepository';
import EconomyRepository from '../repositories/EconomyRepository';
import { ITokensRequestParams } from '../schemas/ChainSchemas';

// Get smart contract
export const getSmartContractController = async (
    request: FastifyRequest,
    reply: FastifyReply
) => {
    try {
        const result = await ChainRepository.getSmartContractRepo();
        return await reply.send(result);
    } catch (error) {
        console.error(`getSmartContractController: error trying to get NFT: ${error}`);
        reply.status(500).send('Internal Server Error');
    }
};

export const getABIController = async (
    request: FastifyRequest,
    reply: FastifyReply
) => {
    try {
        const result = await ChainRepository.getABIRepo();
        return await reply.send(result);
    } catch (error) {
        console.error(`getSmartContractController: error trying to get NFT: ${error}`);
        reply.status(500).send('Internal Server Error');
    }
};

export const getTokensController = async (
    request: FastifyRequest,
    reply: FastifyReply
) => {
    const requestParams = request.params as ITokensRequestParams;
  if (!requestParams || !requestParams.wallet_address) {
    return reply.badRequest("Invalid request parameter. Required fields: 'wallet_address'");
  }

  try {
    let tokens = [];
    const native = await ChainRepository.getTokensRepo(requestParams.wallet_address);
    const astro = await EconomyRepository.balanceOfRepo(requestParams.wallet_address);
    tokens.push(native);
    tokens.push(astro);
    return await reply.send(tokens);
  } catch (error) {
    console.error(`balanceOfController: error trying to transfer balance: ${error}`);
    reply.status(500).send('Internal Server Error');
  }
};

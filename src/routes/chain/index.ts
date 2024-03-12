import { FastifyPluginAsync } from 'fastify';
import {
  getSmartContractController,
  getTokensController,
} from '../../controllers/ChainController';
import {
  IGetSmartContractRequestBody,
  IGetSmartContractResponseSuccessful,
  IGetSmartContractResponseError,
  ITokensRequestParams,
  ITokensResponseError,
  ITokensResponseSuccessful,
} from '../../schemas/ChainSchemas';

const chain: FastifyPluginAsync = async (fastify, opts) => {
  fastify.get<{
    Querystring: IGetSmartContractRequestBody;
    Reply: IGetSmartContractResponseSuccessful | IGetSmartContractResponseError;
  }>(
    '/smartcontract',
    getSmartContractController
  );

  fastify.get<{
    Querystring: ITokensRequestParams;
    Reply: ITokensResponseSuccessful | ITokensResponseError;
  }>(
    '/gettokens/:wallet_address',
    getTokensController
  );
};

export default chain;

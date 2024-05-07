import { FastifyPluginAsync } from 'fastify';
import {
  getSmartContractController,
  getTokensController,
  tokenListController,
} from '../../controllers/ChainController';
import {
  IGetSmartContractRequestBody,
  ITokensRequestParams,
  ITokenListRequestParams,
  IResponseSuccessful,
  IResponseError,
} from '../../schemas/ChainSchemas';
import { token_list } from '../../swaggerschema/chain/token_list';

const chain: FastifyPluginAsync = async (fastify, opts) => {
  fastify.get<{
    Querystring: IGetSmartContractRequestBody;
    Reply: IResponseSuccessful | IResponseError;
  }>(
    '/smartcontract',
    getSmartContractController
  );

  fastify.get<{
    Querystring: ITokensRequestParams;
    Reply: IResponseSuccessful | IResponseError;
  }>(
    '/gettokens/:wallet_address',
    getTokensController
  );

  fastify.get<{
    Querystring: ITokenListRequestParams;
    Reply: IResponseSuccessful | IResponseError;
  }>(
    '/tokenlist',
    { schema: token_list },
    tokenListController
  );
};

export default chain;

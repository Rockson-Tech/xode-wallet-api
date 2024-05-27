import { FastifyPluginAsync } from 'fastify';
import {
  getSmartContractController,
  getTokensController,
  tokenListController,
  submitExtrinsicController,
  tokenTransferController,
} from '../../controllers/ChainController';
import { airdropController } from '../../controllers/AssetController';
import {
  IGetSmartContractRequestBody,
  ITokensRequestParams,
  ITokenListRequestParams,
  ITransferTokenRequestBody,
  ISubmitExtrinsicRequestBody,
  IAirdropNativeRequestBody,
  IResponseSuccessful,
  IResponseError,
} from '../../schemas/ChainSchemas';
import { token_list } from '../../swaggerschema/chain/token_list';
import { user_token_balance } from '../../swaggerschema/chain/user_token_balance';
import { token_transfer } from '../../swaggerschema/chain/token_transfer';
import { submit_extrinsic } from '../../swaggerschema/chain/submit_extrinsic';

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
    { schema: user_token_balance },
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

  fastify.post<{
    Querystring: ITransferTokenRequestBody;
    Reply: IResponseSuccessful | IResponseError;
  }>(
    '/transfer',
    { schema: token_transfer },
    tokenTransferController
  );

  fastify.post<{
    Querystring: ISubmitExtrinsicRequestBody;
    Reply: IResponseSuccessful | IResponseError;
  }>(
    '/extrinsic/submit',
    { schema: submit_extrinsic },
    submitExtrinsicController
  );

  fastify.post<{
    Querystring: IAirdropNativeRequestBody;
    Reply: IResponseSuccessful | IResponseError;
  }>(
    '/airdrop',
    airdropController
  );
};

export default chain;

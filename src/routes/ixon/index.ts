import { FastifyPluginAsync } from 'fastify';
import { 
  transferController,
  balanceOfController,
} from '../../controllers/AssetController';
import { 
  IBalanceOfRequestParams, 
  ITransferRequestBody,
  IResponseSuccessful, 
  IResponseError, 
} from '../../schemas/AssetSchemas';

import { transfer } from '../../swaggerschema/azk/transfer';
import { balanceOf } from '../../swaggerschema/azk/balanceOf';

const ixon: FastifyPluginAsync = async (fastify, opts) => {

  fastify.post<{
    Querystring: ITransferRequestBody;
    Reply: IResponseSuccessful | IResponseError;
  }>(
    '/transfer',
    { schema: transfer },
    transferController
  );

  fastify.post<{
    Querystring: IBalanceOfRequestParams;
    Reply: IResponseSuccessful | IResponseError;
  }>(
    '/balanceof/:account',
    { schema: balanceOf },
    balanceOfController
  );

};

export default ixon;

import { FastifyPluginAsync } from 'fastify';
import { 
  mintController,
  transferController,
  burnController,
  totalSupplyController,
  balanceOfController
} from '../../controllers/AssetController';
import { 
  IBalanceOfRequestParams, 
  IBalanceOfResponseError, 
  IBalanceOfResponseSuccessful, 
  IBurnRequestBody, 
  IBurnResponseError, 
  IBurnResponseSuccessful, 
  IMintRequestBody, 
  IMintResponseError, 
  IMintResponseSuccessful, 
  ITotalSupplyRequestParams, 
  ITotalSupplyResponseError, 
  ITotalSupplyResponseSuccessful, 
  ITransferResponseError, 
  ITransferResponseSuccessful, 
  ITransferRequestBody 
} from '../../schemas/AssetSchemas';
import { mint } from '../../swaggerschema/xav/mint';
import { transfer } from '../../swaggerschema/xav/transfer';
import { burn } from '../../swaggerschema/xav/burn';
import { totalSupply } from '../../swaggerschema/xav/totalSupply';
import { balanceOf } from '../../swaggerschema/xav/balanceOf';

const xav: FastifyPluginAsync = async (fastify, opts) => {
  fastify.post<{
    Querystring: IMintRequestBody;
    Reply: IMintResponseSuccessful | IMintResponseError;
  }>(
    '/mint',
    { schema: mint },
    mintController
  );

  fastify.post<{
    Querystring: ITransferRequestBody;
    Reply: ITransferResponseSuccessful | ITransferResponseError;
  }>(
    '/transfer',
    { schema: transfer },
    transferController
  );

  fastify.delete<{
    Querystring: IBurnRequestBody;
    Reply: IBurnResponseSuccessful | IBurnResponseError;
  }>(
    '/burn',
    { schema: burn },
    burnController
  );

  fastify.get<{
    Querystring: ITotalSupplyRequestParams;
    Reply: ITotalSupplyResponseSuccessful | ITotalSupplyResponseError;
  }>(
    '/totalsupply',
    { schema: totalSupply },
    totalSupplyController
  );

  fastify.post<{
    Querystring: IBalanceOfRequestParams;
    Reply: IBalanceOfResponseSuccessful | IBalanceOfResponseError;
  }>(
    '/balanceof/:account',
    { schema: balanceOf },
    balanceOfController
  );
};

export default xav;

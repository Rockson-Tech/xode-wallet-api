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
import { mint } from '../../swaggerschema/xgm/mint';
import { transfer } from '../../swaggerschema/xgm/transfer';
import { burn } from '../../swaggerschema/xgm/burn';
import { totalSupply } from '../../swaggerschema/xgm/totalSupply';
import { balanceOf } from '../../swaggerschema/xgm/balanceOf';

const xgm: FastifyPluginAsync = async (fastify, opts) => {
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

export default xgm;

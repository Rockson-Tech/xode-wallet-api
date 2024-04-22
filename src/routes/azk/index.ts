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
import { mint } from '../../swaggerschema/azk/mint';
import { transfer } from '../../swaggerschema/azk/transfer';
import { burn } from '../../swaggerschema/azk/burn';
import { totalSupply } from '../../swaggerschema/azk/totalSupply';
import { balanceOf } from '../../swaggerschema/azk/balanceOf';

const azk: FastifyPluginAsync = async (fastify, opts) => {
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

export default azk;

import { FastifyPluginAsync } from 'fastify';
import { 
  mintController,
  transferController,
  burnController,
  totalSupplyController,
  balanceOfController
} from '../../controllers/EconomyController';
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
} from '../../schemas/EconomySchemas';
import { mintEconomy } from '../../swaggerschema/mintEconomy';
import { transferEconomy } from '../../swaggerschema/transferEconomy';
import { burnEconomy } from '../../swaggerschema/burnEconomy';
import { totalSupplyEconomy } from '../../swaggerschema/totalSupplyEconomy';
import { balanceOfEconomy } from '../../swaggerschema/balanceOfEconomy';

const economy: FastifyPluginAsync = async (fastify, opts) => {
  fastify.post<{
    Querystring: IMintRequestBody;
    Reply: IMintResponseSuccessful | IMintResponseError;
  }>(
    '/mint',
    { schema: mintEconomy },
    mintController
  );

  fastify.post<{
    Querystring: ITransferRequestBody;
    Reply: ITransferResponseSuccessful | ITransferResponseError;
  }>(
    '/transfer',
    { schema: transferEconomy },
    transferController
  );

  fastify.delete<{
    Querystring: IBurnRequestBody;
    Reply: IBurnResponseSuccessful | IBurnResponseError;
  }>(
    '/burn',
    { schema: burnEconomy },
    burnController
  );

  fastify.get<{
    Querystring: ITotalSupplyRequestParams;
    Reply: ITotalSupplyResponseSuccessful | ITotalSupplyResponseError;
  }>(
    '/totalsupply',
    { schema: totalSupplyEconomy },
    totalSupplyController
  );

  fastify.post<{
    Querystring: IBalanceOfRequestParams;
    Reply: IBalanceOfResponseSuccessful | IBalanceOfResponseError;
  }>(
    '/balanceof/:account',
    { schema: balanceOfEconomy },
    balanceOfController
  );
};

export default economy;

import { FastifyPluginAsync } from 'fastify';
import {
  getSmartContractController,
} from '../../controllers/ChainController';
import {
  IGetSmartContractRequestBody,
  IGetSmartContractResponseSuccessful,
  IGetSmartContractResponseError,
} from '../../schemas/ChainSchemas';

const chain: FastifyPluginAsync = async (fastify, opts) => {
  fastify.get<{
    Querystring: IGetSmartContractRequestBody;
    Reply: IGetSmartContractResponseSuccessful | IGetSmartContractResponseError;
  }>(
    '/smartcontract',
    getSmartContractController
  );
};

export default chain;

import { FastifyPluginAsync } from 'fastify';
import {
  storeWalletController,
  readAllWalletController,
  readOneWalletController,
  updateWalletController,
  deleteWalletController,
} from '../../controllers/WalletController';
import {
  ISaveWalletRequestBody,
  IReadOneWalletRequestParams,
  IUpdateWalletRequestBody,
  IDeleteWalletRequestParams,
  IResponseSuccessful,
  IResponseError,
} from '../../schemas/WalletSchemas';

const wallet: FastifyPluginAsync = async (fastify, opts) => {
  fastify.post<{
    Querystring: ISaveWalletRequestBody;
    Reply: IResponseSuccessful | IResponseError;
  }>(
    '/',
    storeWalletController
  );

  fastify.get<{
    Querystring: IReadOneWalletRequestParams;
    Reply: IResponseSuccessful | IResponseError;
  }>(
    '/',
    readAllWalletController
  );

  fastify.get<{
    Querystring: IReadOneWalletRequestParams;
    Reply: IResponseSuccessful | IResponseError;
  }>(
    '/:id',
    readOneWalletController
  );

  fastify.put<{
    Querystring: IUpdateWalletRequestBody;
    Reply: IResponseSuccessful | IResponseError;
  }>(
    '/:id',
    updateWalletController
  );

  fastify.delete<{
    Querystring: IDeleteWalletRequestParams;
    Reply: IResponseSuccessful | IResponseError;
  }>(
    '/:id',
    deleteWalletController
  );
};

export default wallet;

import { FastifyPluginAsync } from 'fastify';
import {
  getMarketplaceNftsHandler,
  getUserNftsHandler,
  getNftByIdHandler,
  dashboardNftHandler,
} from '../../controllers/QueryController';
import {
  updateNFTHandler,
} from '../../controllers/TransactionController';
import {
  signedTransactionController,
  balanceTransferHandler,
} from '../../controllers/NFTController';
import {
  IUpdateNFTRequestBody,
  IUpdateNFTResponseSuccessful,
  IUpdateNFTResponseError,
  IGetMarketplaceNFTRequestBody,
  IGetMarketplaceNFTResponseSuccessful,
  IGetMarketplaceNFTResponseError,
  IGetUserNFTRequestParams,
  IGetUserNFTResponseSuccessful,
  IGetUserNFTResponseError,
  IGetNFTByIdRequestParams,
  IGetNFTByIdResponseSuccessful,
  IGetNFTByIdResponseError,
  IBalanceTransferRequestBody,
  IBalanceTransferResponseError,
  IBalanceTransferResponseSuccessful,
  IGetNFTDashboardRequestParams,
  IGetNFTDashboardResponseError,
  IGetNFTDashboardResponseSuccessful,
  ISignedTransactionRequestBody,
  ISignedTransactionResponseError,
  ISignedTransactionResponseSuccessful,
} from '../../schemas/NFTSchemas';
import { 
  schemaBalanceTransfer,
} from '../../swaggerschema';
import { schemaGetNftById } from '../../swaggerschema/byIdNft';
import { schemaPutUpdate } from '../../swaggerschema/update';
import { schemaGetUserNft } from '../../swaggerschema/userNft';
import { dashboardNft } from '../../swaggerschema/dashboardNft';
import { schemaPostMarketplace } from '../../swaggerschema/marketplaceNft';

const nfts: FastifyPluginAsync = async (fastify, opts) => {
  fastify.put<{
    Querystring: IUpdateNFTRequestBody;
    Reply: IUpdateNFTResponseSuccessful | IUpdateNFTResponseError;
  }>(
    '/:id',
    { schema: schemaPutUpdate },
    updateNFTHandler
  );

  fastify.post<{
    Querystring: IGetMarketplaceNFTRequestBody;
    Reply: IGetMarketplaceNFTResponseSuccessful | IGetMarketplaceNFTResponseError;
  }>(
    '/marketplace',
    { schema: schemaPostMarketplace },
    getMarketplaceNftsHandler
  );  

  fastify.get<{
    Querystring: IGetUserNFTRequestParams;
    Reply: IGetUserNFTResponseSuccessful | IGetUserNFTResponseError;
  }>(
    '/:wallet_address',
    { schema: schemaGetUserNft },
    getUserNftsHandler
  );

  fastify.get<{
    Querystring: IGetNFTByIdRequestParams;
    Reply: IGetNFTByIdResponseSuccessful | IGetNFTByIdResponseError;
  }>(
    '/id/:token_id',
    { schema: schemaGetNftById },
    getNftByIdHandler
  );

  fastify.post<{
    Querystring: IBalanceTransferRequestBody;
    Reply: IBalanceTransferResponseSuccessful | IBalanceTransferResponseError;
  }>(
    '/balancetransfer',
    { schema: schemaBalanceTransfer },
    balanceTransferHandler
  );

  fastify.get<{
    Querystring: IGetNFTDashboardRequestParams;
    Reply: IGetNFTDashboardResponseSuccessful | IGetNFTDashboardResponseError;
  }>(
    '/nftdashboard/:wallet_address',
    { schema: dashboardNft },
    dashboardNftHandler
  );

  fastify.post<{
    Querystring: ISignedTransactionRequestBody;
    Reply: ISignedTransactionResponseSuccessful | ISignedTransactionResponseError;
  }>('/signed', signedTransactionController);
};

export default nfts;

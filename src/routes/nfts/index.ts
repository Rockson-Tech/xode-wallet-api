import { FastifyPluginAsync } from 'fastify';
import {
  updateNFTHandler,
  getMarketplaceNftsHandler,
  getUserNftsHandler,
  getNftByIdHandler,
  dashboardNftHandler,
  balanceTransferHandler
} from '../../controllers/AstroChibbiController';
import {
  IUpdateNFTRequestBody,
  IGetMarketplaceNFTRequestBody,
  IGetUserNFTRequestParams,
  IGetNFTByIdRequestParams,
  IBalanceTransferRequestBody,
  IGetNFTDashboardRequestParams,
  IResponseSuccessful,
  IResponseError,
} from '../../schemas/NFTSchemas';
import { 
  schemaBalanceTransfer,
} from '../../swaggerschema/astro_nft/balance_transfer';
import { schemaGetNftById } from '../../swaggerschema/astro_nft/byIdNft';
import { schemaPutUpdate } from '../../swaggerschema/astro_nft/update';
import { schemaGetUserNft } from '../../swaggerschema/astro_nft/userNft';
import { dashboardNft } from '../../swaggerschema/astro_nft/dashboardNft';
import { schemaPostMarketplace } from '../../swaggerschema/astro_nft/marketplaceNft';

const nfts: FastifyPluginAsync = async (fastify, opts) => {
  fastify.put<{
    Querystring: IUpdateNFTRequestBody;
    Reply: IResponseSuccessful | IResponseError;
  }>(
    '/:id',
    { schema: schemaPutUpdate },
    updateNFTHandler
  );

  fastify.post<{
    Querystring: IGetMarketplaceNFTRequestBody;
    Reply: IResponseSuccessful | IResponseError;
  }>(
    '/marketplace',
    { schema: schemaPostMarketplace },
    getMarketplaceNftsHandler
  );  

  fastify.get<{
    Querystring: IGetUserNFTRequestParams;
    Reply: IResponseSuccessful | IResponseError;
  }>(
    '/:wallet_address',
    { schema: schemaGetUserNft },
    getUserNftsHandler
  );

  fastify.get<{
    Querystring: IGetNFTByIdRequestParams;
    Reply: IResponseSuccessful | IResponseError;
  }>(
    '/id/:token_id',
    { schema: schemaGetNftById },
    getNftByIdHandler
  );

  fastify.post<{
    Querystring: IBalanceTransferRequestBody;
    Reply: IResponseSuccessful | IResponseError;
  }>(
    '/balancetransfer',
    { schema: schemaBalanceTransfer },
    balanceTransferHandler
  );

  fastify.get<{
    Querystring: IGetNFTDashboardRequestParams;
    Reply: IResponseSuccessful | IResponseError;
  }>(
    '/nftdashboard/:wallet_address',
    { schema: dashboardNft },
    dashboardNftHandler
  );
};

export default nfts;

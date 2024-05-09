import { FastifyPluginAsync } from 'fastify';
import {
  getMarketplaceNftsHandler,
  getUserNftsHandler,
  getNftByIdHandler,
  dashboardNftHandler,
} from '../../controllers/QueryController';
import {
  updateNFTHandler,
} from '../../controllers/AstroChibbiController';
import {
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
};

export default nfts;

// ----- GET USER NFT -----
export interface IGetUserNFTRequestParams {
  wallet_address: string;
}

// ----- GET NFT BY ID -----
export interface IGetNFTByIdRequestParams {
  token_id: string;
}

// ----- GET MARKETPLACE NFTs BY ID -----
export interface IGetMarketplaceNFTRequestBody {
  collection_id: string;
}

// ----- READ ONE NFT -----
export interface IReadOneNFTRequestParams {
  id: number;
}

// ----- UPDATE ONE NFT -----
export interface IUpdateOneNFTRequestParams {
  id: number;
}
export interface IUpdateNFTRequestBody {
  name?: string;
  category?: string;
  collection?: string;
  description?: string;
  image_path?: string;
  price?: number;
  is_for_sale?: boolean;
  is_equipped?: boolean;
  astro_type: string;
  specs: string;
  blockchain_id: string;
}

// ----- MINT -----
export interface IMintRequestBody {
  image_path: string;
  name: string;
  description: string;
  price: number;
  is_for_sale: boolean;
  is_equipped: boolean;
  is_drop: boolean;
  category: string;
  blockchain_id: string;
}

// ----- BALANCE TRANFER -----
export interface IBalanceTransferRequestBody {
  from: string;
  amount: number;
}
// ----- GET USER NFT DASHBOARD-----
export interface IGetNFTDashboardRequestParams {
  wallet_address: string;
}

// ----- SUCCESS & ERROR -----
export interface IResponseSuccessful {
  status: number;
  message: string;
}
export interface IResponseError {
  status: number;
  message: string;
}
// Create
// ----- SIGNED MINT -----
export interface ISignedTransactionRequestBody {
  sign: string;
}

export interface ISignedTransactionResponseSuccessful {
  status: number;
  message: string;
}
export interface ISignedTransactionResponseError {
  status: number;
  message: string;
}

// ----- GET USER NFT -----
export interface IGetUserNFTRequestParams {
  wallet_address: string;
}
export interface IGetUserNFTResponseSuccessful {
  status: number;
  message: string;
}
export interface IGetUserNFTResponseError {
  status: number;
  message: string;
}

// ----- GET NFT BY ID -----
export interface IGetNFTByIdRequestParams {
  token_id: string;
}
export interface IGetNFTByIdResponseSuccessful {
  status: number;
  message: string;
}
export interface IGetNFTByIdResponseError {
  status: number;
  message: string;
}

// ----- GET MARKETPLACE NFTs BY ID -----
export interface IGetMarketplaceNFTRequestBody {
  collection_id: string;
}
export interface IGetMarketplaceNFTResponseSuccessful {
  status: number;
  message: string;
}
export interface IGetMarketplaceNFTResponseError {
  status: number;
  message: string;
}

// ----- READ ONE NFT -----
export interface IReadOneNFTRequestParams {
  id: number;
}
export interface IReadOneNFTResponseSuccessful {
  status: number;
  message: string;
}
export interface IReadOneNFTResponseError {
  status: number;
  message: string;
}

// Update
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
export interface IUpdateNFTResponseSuccessful {
  status: number;
  message: string;
}
export interface IUpdateNFTResponseError {
  status: number;
  message: string;
}

// ----- TRANSFER FROM WITHOUT APPROVAL -----
export interface ITransferNFTFromWOARequestBody {
  from: string;
  to: string;
  id: number;
}
export interface ITransferNFTFromWOAResponseSuccessful {
  status: number;
  message: string;
}
export interface ITransferNFTFromWOAResponseError {
  status: number;
  message: string;
}

// ----- BALANCE TRANFER -----
export interface IBalanceTransferRequestBody {
  from: string;
  amount: number;
}
export interface IBalanceTransferResponseSuccessful {
  status: number;
  message: string;
}
export interface IBalanceTransferResponseError {
  status: number;
  message: string;
}

// ----- GET USER NFT DASHBOARD-----
export interface IGetNFTDashboardRequestParams {
  wallet_address: string;
}
export interface IGetNFTDashboardResponseSuccessful {
  status: number;
  message: string;
}
export interface IGetNFTDashboardResponseError {
  status: number;
  message: string;
}
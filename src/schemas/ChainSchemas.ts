// Read
// ----- GET NFT -----
export interface IGetSmartContractRequestBody {
  // wallet_address: string;
}
export interface IGetSmartContractResponseSuccessful {
  status: number;
  message: string;
}
export interface IGetSmartContractResponseError {
  status: number;
  message: string;
}

export interface ITokensRequestParams {
  wallet_address: string;
}
export interface ITokensResponseSuccessful {
  status: number;
  message: string;
}
export interface ITokensResponseError {
  status: number;
  message: string;
}

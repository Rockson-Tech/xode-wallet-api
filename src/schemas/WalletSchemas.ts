// Read
// ----- STORE WALLET -----
export interface ISaveWalletRequestBody {
  wallet_address: string;
}

// ----- GET WALLET -----
export interface IReadOneWalletRequestParams {
  id: number;
}

// ----- UPDATE WALLET -----
export interface IUpdateWalletRequestParams {
  id: number;
}
export interface IUpdateWalletRequestBody {
  wallet_address: string;
}

// ----- DELETE WALLET -----
export interface IDeleteWalletRequestParams {
  id: number;
}

// ----- SUCCESS & ERROR RESPONSE -----
export interface IResponseSuccessful {
  status: number;
  message: string;
}
export interface IResponseError {
  status: number;
  message: string;
}

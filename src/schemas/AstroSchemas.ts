// GET
// ----- BALANCE OF -----
export interface IBalanceOfRequestParams {
  account: string;
}
// ----- TOTAL SUPPLY -----
export interface ITotalSupplyRequestParams {
  // 
}

// POST
// ----- MINT -----
export interface IMintRequestBody {
  to: string;
  value: number;
}

// ----- TRANSFER -----
export interface ITransferRequestBody {
  target: string;
  from: string;
  value: number;
  token: string;
}

// DELETE
// ----- BURN -----
export interface IBurnRequestBody {
  from: string;
  value: number;
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
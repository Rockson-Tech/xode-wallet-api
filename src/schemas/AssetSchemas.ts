// GET
// ----- BALANCE OF -----
export interface IBalanceOfRequestParams {
  account: string;
}
export interface IBalanceOfResponseSuccessful {
  status: number;
  message: string;
}
export interface IBalanceOfResponseError {
  status: number;
  message: string;
}

// ----- TOTAL SUPPLY -----
export interface ITotalSupplyRequestParams {
  // 
}
export interface ITotalSupplyResponseSuccessful {
  status: number;
  message: string;
}
export interface ITotalSupplyResponseError {
  status: number;
  message: string;
}

// POST
// ----- MINT -----
export interface IMintRequestBody {
  to: string;
  value: number;
}
export interface IMintResponseSuccessful {
  status: number;
  message: string;
}
export interface IMintResponseError {
  status: number;
  message: string;
}

// ----- TRANSFER -----
export interface ITransferRequestBody {
  target: string;
  value: number;
}
export interface ITransferResponseSuccessful {
  status: number;
  message: string;
}
export interface ITransferResponseError {
  status: number;
  message: string;
}

// DELETE
// ----- BURN -----
export interface IBurnRequestBody {
  from: string;
  value: number;
}
export interface IBurnResponseSuccessful {
  status: number;
  message: string;
}
export interface IBurnResponseError {
  status: number;
  message: string;
}

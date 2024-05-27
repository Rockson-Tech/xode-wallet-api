// GET
// ----- GET ENERGY IMAGE -----
export interface IGetEnergyImageRequestBody {
  //
}

// ----- GET ENERGY -----
export interface IGetEnergyRequestBody {
  wallet_address: string;
}

// POST
// ----- RESET ENERGY -----
export interface IResetEnergyRequestBody {
  owner: string;
}

// ----- SET ENERGY -----
export interface ISetEnergyRequestBody {
  energy: number;
  owner: string;
}

// ----- SET ENERGY IMAGE -----
export interface ISetEnergyImageRequestBody {
  image_url: string;
}

// ----- DECREASE ENERGY -----
export interface IDecreaseEnergyRequestBody {
  decrease: number;
  owner: string;
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
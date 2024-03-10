// GET
// ----- GET ENERGY IMAGE -----
export interface IGetEnergyImageRequestBody {
  //
}
export interface IGetEnergyImageResponseSuccessful {
  status: number;
  message: string;
}
export interface IGetEnergyImageResponseError {
  status: number;
  message: string;
}

// ----- GET ENERGY -----
export interface IGetEnergyRequestBody {
  wallet_address: string;
}
export interface IGetEnergyResponseSuccessful {
  status: number;
  message: string;
}
export interface IGetEnergyResponseError {
  status: number;
  message: string;
}

// POST
// ----- RESET ENERGY -----
export interface IResetEnergyRequestBody {
  owner: string;
}
export interface IResetEnergyResponseSuccessful {
  status: number;
  message: string;
}
export interface IResetEnergyResponseError {
  status: number;
  message: string;
}

// ----- SET ENERGY -----
export interface ISetEnergyRequestBody {
  energy: number;
  owner: string;
}
export interface ISetEnergyResponseSuccessful {
  status: number;
  message: string;
}
export interface ISetEnergyResponseError {
  status: number;
  message: string;
}

// ----- SET ENERGY IMAGE -----
export interface ISetEnergyImageRequestBody {
  image_url: string;
}
export interface ISetEnergyImageResponseSuccessful {
  status: number;
  message: string;
}
export interface ISetEnergyImageResponseError {
  status: number;
  message: string;
}

// ----- DECREASE ENERGY -----
export interface IDecreaseEnergyRequestBody {
  decrease: number;
  owner: string;
}
export interface IDecreaseEnergyResponseSuccessful {
  status: number;
  message: string;
}
export interface IDecreaseEnergyResponseError {
  status: number;
  message: string;
}
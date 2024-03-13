import { FastifyReply, FastifyRequest } from 'fastify';
import {
  IDecreaseEnergyRequestBody,
  IGetEnergyRequestBody,
  ISetEnergyImageRequestBody
} from '../schemas/EnergySchemas';
import EnergyRepository from '../repositories/EnergyRepository';

export const decreaseEnergyController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {

  const requestBody = request.body as IDecreaseEnergyRequestBody;
  if (
    !requestBody || 
    !requestBody.owner ||
    !requestBody.decrease
  ) {
    return reply.badRequest("Invalid request body. Required fields: 'owner', 'decrease'");
  }

  try {
    const result = await new Promise(async (resolve, reject) => {
      try {
        const success = await EnergyRepository.decreaseEnergyRepo(requestBody);
        // resolve(success);
        if (success) {
          const updatedEnergy = await EnergyRepository.getEnergyRepo(requestBody.owner);
          resolve(updatedEnergy);
        } else {
          reject(new Error("Failed to decrease energy."));
        }
      } catch (error) {
        reject(error);
      }
    });
    return reply.send(result);
  } catch (error) {
    console.error(`decreaseEnergyController: error trying to decrease energy: ${error}`);
    reply.status(500).send('Internal Server Error');
  }
};

export const getEnergyController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const requestBody = request.body as IGetEnergyRequestBody;
  if (!requestBody || !requestBody.wallet_address) {
    return reply.badRequest("Missing or invalid request body.");
  }

  try {
    const energyResult = await EnergyRepository.getEnergyRepo(requestBody.wallet_address);
    if (energyResult == null) {
      const data = {
        owner: requestBody.wallet_address,
        energy: 20
      };
      const result = await new Promise(async (resolve, reject) => {
        await EnergyRepository.setEnergyRepo(data);
        resolve(await EnergyRepository.getEnergyRepo(requestBody.wallet_address));
      });
      return await reply.send(result);
    } else {
      const result = await new Promise(async (resolve, reject) => {
        if (energyResult.resetable) {
          await EnergyRepository.resetEnergyRepo(requestBody.wallet_address);
          resolve(await EnergyRepository.getEnergyRepo(requestBody.wallet_address));
        } else {
          resolve(energyResult);
        }
      });
      return await reply.send(result);
    }
  } catch (error) {
    console.error(`getEnergyController: error trying to get energy: ${error}`);
    reply.status(500).send('Internal Server Error');
  }
};

export const setEnergyImageController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const requestBody = request.body as ISetEnergyImageRequestBody;
  if (!requestBody || !requestBody.image_url) {
    return reply.badRequest("Invalid request body. Required fields: 'image_url'");
  }

  try {
    const result = await EnergyRepository.setEnergyImageRepo(requestBody.image_url);
    return await reply.send(result);
  } catch (error) {
    console.error(`setEnergyImageController: error trying to set image energy: ${error}`);
    reply.status(500).send('Internal Server Error');
  }
};

export const getEnergyImageController = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const result = await EnergyRepository.getEnergyImageRepo();
    return await reply.send(result);
  } catch (error) {
    console.error(`getEnergyImageController: error trying to get image energy: ${error}`);
    reply.status(500).send('Internal Server Error');
  }
};
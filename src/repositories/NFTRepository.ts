import {
  IBalanceTransferRequestBody,
  ISignedTransactionRequestBody,
} from '../schemas/NFTSchemas';
import TXRepository from '../modules/TXRepository';
import InitializeAPI from '../modules/InitializeAPI';
import { Keyring } from '@polkadot/api';
import { cryptoWaitReady } from '@polkadot/util-crypto';
import '@polkadot/api-augment';

export default class NFTRepository {
  keypair = process.env.KEYPAIR;
  contractAddress = process.env.CONTRACT_ADDRESS as string;
  contractOwner = process.env.CONTRACT_OWNER as string;
  ownerSeed = process.env.OWNER_SEED as string;
  walletAddress: any;
  injector: any;
  filePath = '../';
  // These are required and changeable
  REFTIME: number = 300000000000;
  PROOFSIZE: number = 500000;
  
  static readContractFee = async (
    api: any,
    contract: any,
    method: any,
    params: any,
    instance: any
  ) => {
    const gasLimit = api.registry.createType(
      'WeightV2',
      api.consts.system.blockWeights['maxBlock']
    );
  
    const { gasRequired } = await contract.query[method](
      instance.contractAddress,
      { gasLimit: gasLimit },
      ...params
    );
    if (api) {
        await api.disconnect();
      }
    return gasRequired?.toJSON();
  }

  static async balanceTransferRepo(data: IBalanceTransferRequestBody) {
    console.log('balanceTransferRepo function was called');
    const instance = new NFTRepository();
    var api: any;
    try {
      await cryptoWaitReady();
      api = await InitializeAPI.apiInitialization();
      const keyring = new Keyring({ type: 'sr25519', ss58Format: 0 });
      const chainDecimals = api.registry.chainDecimals[0];
      const value = data.amount * 10 ** chainDecimals;
      const owner = keyring.addFromUri(instance.ownerSeed);
      const result = await TXRepository.sendApiTransaction(
        api,
        'balances',
        'forceTransfer',
        owner,
        [data.from, value]
      );
      return result;
    } catch (error: any) {
      return Error(error || 'balanceTransferRepo error occurred.');
    } finally {
      if (api) {
        await api.disconnect();
      }
    }
  }

  static signedTransactionRepo = async (nftData: ISignedTransactionRequestBody) => {
    var api: any;
    try {
      api = await InitializeAPI.apiInitialization();
      await api.rpc.author.submitExtrinsic(nftData.sign);
      return;
    } catch (error: any) {
      return Error(error || 'signedTransactionRepo error occurred.');
    } finally {
      if (api) {
        await api.disconnect();
      }
    }
  };
}

import {
  IBalanceTransferRequestBody,
} from '../schemas/NFTSchemas';
import TXRepository from '../modules/TXRepository';
import InitializeAPI from '../modules/InitializeAPI';
import { Keyring } from '@polkadot/api';
import { cryptoWaitReady } from '@polkadot/util-crypto';
import '@polkadot/api-augment';

export default class NFTRepository {
  contractAddress = process.env.ASTROCHIBBI_ADDRESS as string;
  ownerSeed = process.env.OWNER_SEED as string;
  // These are required and changeable
  REFTIME: number = 300000000000;
  PROOFSIZE: number = 500000;

  static async balanceTransferRepo(data: IBalanceTransferRequestBody) {
    console.log('balanceTransferRepo function was called');
    const instance = new NFTRepository();
    var api: any;
    try {
      await cryptoWaitReady();
      api = await InitializeAPI.apiInitialization();
      if (api instanceof Error) {
        return api;
      }
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
      if (!(api instanceof Error)) {
        await api.disconnect();
      }
    }
  }
}

import TXRepository from '../modules/TXRepository';
import InitializeAPI from '../modules/InitializeAPI';
import { Keyring } from '@polkadot/api';
import { cryptoWaitReady } from '@polkadot/util-crypto';
import { 
  IMintRequestBody,
  ITransferRequestBody,
  IBurnRequestBody,
} from '../schemas/AssetSchemas';
import { formatBalance } from '@polkadot/util';

export default class XGameRepository {
  keypair = process.env.KEYPAIR;
  economyAddress = process.env.ECONOMY_ADDRESS as string;
  contractOwner = process.env.CONTRACT_OWNER as string;
  ownerSeed = process.env.OWNER_SEED as string;
  assetId = process.env.XGM_ASSET_ID as string ?? '1';
  // These are required and changeable
  REFTIME: number = 300000000000;
  PROOFSIZE: number = 500000;

  static async mintRepo(data: IMintRequestBody) {
    console.log('mintRepo function was called');
    const instance = new XGameRepository();
    var api: any;
    try {
      await cryptoWaitReady();
      api = await InitializeAPI.apiInitialization();
      const keyring = new Keyring({ type: 'sr25519', ss58Format: 0 });
      const owner = keyring.addFromUri(instance.ownerSeed);
      const metadata: any = await api.query.assets.metadata(
        instance.assetId,
      );
      if (metadata.toHuman() == null) {
        throw String('No corresponding asset found.');
      }
      const { decimals } = metadata.toJSON();
      const value = data.value * 10 ** decimals;
      const result = await TXRepository.sendApiTransaction(
        api,
        'assets',
        'mint',
        owner,
        [
          instance.assetId,
          data.to, 
          value
        ]
      );
      return result;
    } catch (error) {
      throw String(error || 'mintRepo error occurred.');
    } finally {
      if (api) {
        await api.disconnect();
      }
    }
  }

  static async transferRepo(data: ITransferRequestBody) {
    console.log('transferRepo function was called');
    const instance = new XGameRepository();
    var api: any;
    try {
      await cryptoWaitReady();
      api = await InitializeAPI.apiInitialization();
      const keyring = new Keyring({ type: 'sr25519', ss58Format: 0 });
      const owner = keyring.addFromUri(instance.ownerSeed);
      const metadata: any = await api.query.assets.metadata(
        instance.assetId,
      );
      if (metadata.toHuman() == null) {
        throw String('No corresponding asset found.');
      }
      const { decimals } = metadata.toJSON();
      const value = data.value * 10 ** decimals;
      const result = await TXRepository.sendApiTransaction(
        api,
        'assets',
        'transfer',
        owner,
        [
          instance.assetId,
          data.to, 
          value
        ]
      );
      return result;
    } catch (error) {
      throw String(error || 'transferRepo error occurred.');
    } finally {
      if (api) {
        await api.disconnect();
      }
    }
  }

  static async burnRepo(data: IBurnRequestBody) {
    console.log('burnRepo function was called');
    const instance = new XGameRepository();
    var api: any;
    try {
      await cryptoWaitReady();
      api = await InitializeAPI.apiInitialization();
      const keyring = new Keyring({ type: 'sr25519', ss58Format: 0 });
      const owner = keyring.addFromUri(instance.ownerSeed);
      const metadata: any = await api.query.assets.metadata(
        instance.assetId,
      );
      if (metadata.toHuman() == null) {
        throw String('No corresponding asset found.');
      }
      const { decimals } = metadata.toJSON();
      const value = data.value * 10 ** decimals;
      const result = await TXRepository.sendApiTransaction(
        api,
        'assets',
        'burn',
        owner,
        [
          instance.assetId,
          data.from, 
          value
        ]
      );
      return result;
    } catch (error) {
      throw String(error || 'burnRepo error occurred.');
    } finally {
      if (api) {
        await api.disconnect();
      }
    }
  }

  static async balanceOfRepo(account: string) {
    console.log('balanceOfRepo function was called');
    const instance = new XGameRepository();
    var api: any;
    try {
      await cryptoWaitReady();
      api = await InitializeAPI.apiInitialization();
      const [accountInfo, metadata] = await Promise.all([
        api.query.assets.account(instance.assetId, account),
        api.query.assets.metadata(instance.assetId)
      ]);
      if (accountInfo.toHuman() != null) {
        const { balance } = accountInfo.toHuman();
        const { decimals, symbol } = metadata.toHuman();
        const bigintbalance = BigInt(balance.replace(/,/g, ''));
        formatBalance.setDefaults({ decimals: parseInt(decimals), unit: symbol });
        formatBalance.getDefaults();
        const bal = formatBalance(
          bigintbalance, 
          { 
            forceUnit: symbol, 
            withUnit: false 
          }
        );
        const balances = parseFloat(bal.replace(/,/g, '')).toFixed(4);
        return {
          balance: balances,
          symbol: symbol
        };
      } else {
        return {
          balance: '0.0000',
          symbol: 'XGM'
        };
      };
    } catch (error) {
      throw String(error || 'balanceOfRepo error occurred.');
    } finally {
      if (api) {
        await api.disconnect();
      }
    }
  }
  
  static async totalSupplyRepo() {
    console.log('totalSupplyRepo function was called');
    const instance = new XGameRepository();
    var api: any;
    try {
      await cryptoWaitReady();
      api = await InitializeAPI.apiInitialization();
      const assetInfo: any = await api.query.assets.asset(
        instance.assetId
      );
      if (assetInfo.toHuman() == null) {
        throw String('No corresponding asset found.');
      }
      const { supply } = assetInfo.toJSON();
      return {
        total_supply: supply
      };
    } catch (error) {
      throw String(error || 'totalSupplyRepo error occurred.');
    } finally {
      if (api) {
        await api.disconnect();
      }
    }
  }
}
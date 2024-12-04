import TXRepository from '../modules/TXRepository';
import PolkadotUtility from '../modules/PolkadotUtility';
import { 
  IMintRequestBody,
  ITransferRequestBody,
  IBurnRequestBody,
} from '../schemas/AssetSchemas';
import { api } from '../modules/InitializeAPI';

export default class AzkalRepository {
  assetId = process.env.AZK_ASSET_ID as string ?? '3';
  azkPrice = '0';
  azkImage = 'https://images.ctfassets.net/ceadegliwn46/1EC9Xpp5WZXo3A1FnMODfy/44472b58948405d6c7469553a5d9839b/azk.png';
  // These are required and changeable
  REFTIME: number = 300000000000;
  PROOFSIZE: number = 500000;

  static async mintRepo(data: IMintRequestBody) {
    console.log('mintRepo function was called');
    const instance = new AzkalRepository();
    try {
      const metadata: any = await api.query.assets.metadata(
        instance.assetId,
      );
      if (metadata.toHuman() == null) {
        return Error('No corresponding asset found.');
      }
      const { decimals } = metadata.toJSON();
      const value = data.value * 10 ** decimals;
      const result = TXRepository.constructChainExtrinsicTransaction(
        'assets',
        'mint',
        [
          instance.assetId,
          data.to, 
          value
        ]
      );
      return result;
    } catch (error: any) {
      return Error(error || 'mintRepo error occurred.');
    }
  }

  static async transferRepo(data: ITransferRequestBody) {
    console.log('transferRepo function was called');
    const instance = new AzkalRepository();
    try {
      const metadata: any = await api.query.assets.metadata(
        instance.assetId,
      );
      if (metadata.toHuman() == null) {
        return Error('No corresponding asset found.');
      }
      const { decimals } = metadata.toJSON();
      const value = data.value * 10 ** decimals;
      const result = TXRepository.constructChainExtrinsicTransaction(
        'assets',
        'transfer',
        [
          instance.assetId,
          data.target, 
          value
        ]
      );
      if (result instanceof Error) return result;
      return { hash: result.toHex() };
    } catch (error: any) {
      return Error(error || 'transferRepo error occurred.');
    }
  }

  static async burnRepo(data: IBurnRequestBody) {
    console.log('burnRepo function was called');
    const instance = new AzkalRepository();
    try {
      const metadata: any = await api.query.assets.metadata(
        instance.assetId,
      );
      if (metadata.toHuman() == null) {
        return Error('No corresponding asset found.');
      }
      const { decimals } = metadata.toJSON();
      const value = data.value * 10 ** decimals;
      const result = TXRepository.constructChainExtrinsicTransaction(
        'assets',
        'burn',
        [
          instance.assetId,
          data.from, 
          value
        ]
      );
      return result;
    } catch (error: any) {
      return Error(error || 'burnRepo error occurred.');
    }
  }

  static async balanceOfRepo(account: string) {
    console.log('balanceOfRepo function was called');
    const instance = new AzkalRepository();
    try {
      const [accountInfo, metadata] = await Promise.all([
        api.query.assets.account(instance.assetId, account),
        api.query.assets.metadata(instance.assetId)
      ]);
      if (accountInfo.toHuman() != null) {
        const { balance } = accountInfo.unwrap();
        const { decimals, symbol, name } = metadata;
        const balances = PolkadotUtility.balanceFormatter(
          decimals.toNumber(),
          [symbol.toHuman()],
          balance
        );
        return {
          balance: balances,
          symbol: symbol.toHuman(),
          name: name.toHuman(),
          price: instance.azkPrice,
          image: instance.azkImage,
        };
      } else {
        return {
          balance: '0.0000',
          symbol: 'AZK',
          name: 'Azkal',
          price: instance.azkPrice,
          image: instance.azkImage,
        };
      };
    } catch (error: any) {
      return Error(error || 'balanceOfRepo error occurred.');
    } 
  }
  
  static async totalSupplyRepo() {
    console.log('totalSupplyRepo function was called');
    const instance = new AzkalRepository();
    try {
      const assetInfo: any = await api.query.assets.asset(
        instance.assetId
      );
      if (assetInfo.toHuman() == null) {
        return Error('No corresponding asset found.');
      }
      const { supply } = assetInfo.toJSON();
      return {
        total_supply: supply
      };
    } catch (error: any) {
      return Error(error || 'totalSupplyRepo error occurred.');
    }
  }

  static async getAssetMetadataRepo() {
    console.log('getAssetMetadataRepo function was called');
    const instance = new AzkalRepository();
    try {
      const metadata = await api.query.assets.metadata(instance.assetId);
      return {
        name: metadata.toHuman().name,
        symbol: metadata.toHuman().symbol,
        decimals: metadata.toHuman().decimals,
        image: instance.azkImage,
        price: instance.azkPrice,
      }
    } catch (error: any) {
      return Error(error || 'getAssetMetadataRepo error occurred.');
    }
  }
}

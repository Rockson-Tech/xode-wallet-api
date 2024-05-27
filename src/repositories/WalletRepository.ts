import prisma from '../db';
import { 
  ISaveWalletRequestBody,
  IUpdateWalletRequestBody,
} from '../schemas/WalletSchemas';

export default class WalletRepository {     
    static storeWallet = async (
      wallet: ISaveWalletRequestBody
    ) => {
      try {
        const createdWallet = await prisma.wallets.create({
          data: {
            wallet_address: wallet.wallet_address,
          },
        });
        return createdWallet;
      } catch (error) {
        throw String(error || 'Unknown error occurred.');
      }
  };
  
  static getWallets = async () => {
    const targetWallets = await prisma.wallets.findMany();
    return targetWallets;
  };
  
  static getWalletById = async (id: number) => {
      const targetWallet = await prisma.wallets.findFirst({
        where: {
          id: id,
        },
      });
  
      return targetWallet;
  };

  static updateWallet = async (
    id: number,
    data: IUpdateWalletRequestBody,
  ) => {
    try {
      const updateWallet = await prisma.wallets.update({
        where: {
          id: id,
        },
        data: {
          id: id,
          wallet_address: data.wallet_address,
          updated_at: new Date()
        },
      });
      return updateWallet;
    } catch (error) {
      throw String(error || 'Unknown error occurred.');
    }
  };

  static deleteWallet = async (id: number) => {
      try {
        console.log(id);
        const deletedCharacter = await prisma.wallets.delete({
          where: {
            id: id,
          },
        });
        return deletedCharacter;
      } catch (error) {
        throw String(error || 'Unknown error occurred.');
      }
  };
}
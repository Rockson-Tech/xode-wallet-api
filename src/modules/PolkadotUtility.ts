import { formatBalance } from '@polkadot/util';
import '@polkadot/api-augment';

export default class PolkadotUtility {
    static balanceFormatter = (
        decimals: any,
        token: any,
        balance: any
    ) => {
        try {
            formatBalance.setDefaults({ decimals: decimals, unit: token[0] });
            formatBalance.getDefaults();
            const free = formatBalance(balance, { forceUnit: token[0], withUnit: false });
            const balances = free.split(',').join('');
            const parsedBalance = parseFloat(balances).toFixed(4);
            return parsedBalance;
        } catch (error: any) {
            return Error(error);
        }
    }
}

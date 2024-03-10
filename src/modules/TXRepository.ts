import { ContractPromise } from '@polkadot/api-contract';
import '@polkadot/api-augment';

export default class TXRepository {
    static getContract = async (api: any, abi: any, contractAddress: string) => {
        try {
            const contract = new ContractPromise(api, abi, contractAddress);
            return contract;
        } catch (error) {
            console.error(error);
            return undefined;
        }
    }
    
    static isBroadcast = async (param: boolean) => {
        let result: boolean = true;
        if (param) {
            result = param;
        } else {
            result = false;
        }
        return result;
    }
    
    static sendApiTransaction = async (
        api: any,
        pallet: any,
        method: any,
        owner: any,
        params: any,
    ) => {
        return new Promise(async (resolve, reject) => {
            try {
                // const nonce = await api.rpc.system.accountNextIndex(owner.address);
                await api.tx[pallet][method](
                ...params
                ).signAndSend(owner, { nonce: -1 }, async (result: any) => {
                    console.log(result.status.toHuman());
                    const isBroadcast = await this.isBroadcast(result.status.isBroadcast);
                    if (result.dispatchError) {
                        if (result.dispatchError.isModule) {
                            const decoded = api.registry.findMetaError(result.dispatchError.asModule);
                            const { docs, name, section } = decoded;
                            console.log(`${section}.${name}: ${docs.join(' ')}`);
                            reject(`${section}.${name}: ${docs.join(' ')}`);
                        } else {
                            console.log(result.dispatchError.toString());
                            reject(result.dispatchError.toString());
                        }
                    } else if (result.status.isInBlock) {
                        if (!isBroadcast) {
                            resolve({
                                status: 200,
                                message: `${method} in block`,
                                data: {
                                    isFinalized: result.status.isFinalized,
                                    blockHash: result.status.asInBlock.toHex(),
                                },
                            });
                        }
                    } else if (result.status.isFinalized) {
                        console.log('finalized');
                        resolve({
                            status: 200,
                            message: `${method} finalized`,
                            data: {
                                isFinalized: result.status.isFinalized,
                                blockHash: result.status.asFinalized.toHex(),
                            },
                        });
                    }
                });
            } catch (error) {
                reject(error);
            }
        });
    }
    
    static sendContractTransaction = async (
        api: any,
        contract: any,
        method: any,
        owner: any,
        params: any,
        instance: any,
        storageDepositLimit = null
    ) => {
        return new Promise(async (resolve, reject) => {
            try {
                // const nonce = await api.rpc.system.accountNextIndex(owner.address);
                await contract.tx[method](
                {
                    storageDepositLimit,
                    gasLimit: api?.registry.createType('WeightV2', {
                        refTime: instance.REFTIME,
                        proofSize: instance.PROOFSIZE,
                    }),
                },
                ...params
                ).signAndSend(owner, { nonce: -1 }, async (result: any) => {
                    console.log(result.status.toHuman());
                    const isBroadcast = await this.isBroadcast(result.status.isBroadcast);
                    if (result.dispatchError) {
                        if (result.dispatchError.isModule) {
                            const decoded = api.registry.findMetaError(result.dispatchError.asModule);
                            const { docs, name, section } = decoded;
                            console.log(`${section}.${name}: ${docs.join(' ')}`);
                            reject(`${section}.${name}: ${docs.join(' ')}`);
                        } else {
                            console.log(result.dispatchError.toString());
                            reject(result.dispatchError.toString());
                        }
                    } else if (result.status.isInBlock) {
                        if (!isBroadcast) {
                            resolve({
                                status: 200,
                                message: `${method} in block`,
                                data: {
                                    isFinalized: result.status.isFinalized,
                                    blockHash: result.status.asInBlock.toHex(),
                                },
                            });
                        }
                    } else if (result.status.isFinalized) {
                        console.log('finalized');
                        resolve({
                            status: 200,
                            message: `${method} finalized`,
                            data: {
                                isFinalized: result.status.isFinalized,
                                blockHash: result.status.asFinalized.toHex(),
                            },
                        });
                    }
                });
            } catch (error) {
                reject(error);
            }
        });
    }
    
    static sendContractQuery = async (
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
      
        const { output } = await contract.query[method](
            instance.contractAddress,
            { gasLimit: gasLimit },
            ...params
        );
        return output?.toJSON();
    }
}
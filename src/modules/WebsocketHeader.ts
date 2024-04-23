// import { ContractPromise } from '@polkadot/api-contract';
import '@polkadot/api-augment';

export default class WebsocketHeader {
    static handleWebsocket = async (request: any) => {
        try {
            let websocket: string | undefined = request.headers.websocket;
            if (!websocket) {
                this.defaultWebsocket();
                return;
            }

            if (Array.isArray(websocket)) {
                websocket = websocket.join(',');
            }

            const mainnetEnv = process.env.MAINNET_WS_PROVIDER_ENDPOINT as string;
            const testnetEnv = process.env.TESTNET_WS_PROVIDER_ENDPOINT as string;
            const devnetEnv = process.env.DEVNET_WS_PROVIDER_ENDPOINT as string;
            const localEnv = process.env.LOCAL_WS_PROVIDER_ENDPOINT as string;

            if (websocket === mainnetEnv) {
                this.setEnvAddresses(
                    process.env.MAINNET_ASTROCHIBBI_ADDRESS as string,
                    process.env.MAINNET_ASTRO_ECONOMY_ADDRESS as string,
                    process.env.MAINNET_ASTRO_ENERGY_ADDRESS as string
                );
            } else if (websocket === devnetEnv) {
                this.setEnvAddresses(
                    process.env.DEVNET_ASTROCHIBBI_ADDRESS as string,
                    process.env.DEVNET_ASTRO_ECONOMY_ADDRESS as string,
                    process.env.DEVNET_ASTRO_ENERGY_ADDRESS as string
                );
            } else if (websocket === localEnv) {
                this.setEnvAddresses(
                    process.env.LOCAL_ASTROCHIBBI_ADDRESS as string,
                    process.env.LOCAL_ASTRO_ECONOMY_ADDRESS as string,
                    process.env.LOCAL_ASTRO_ENERGY_ADDRESS as string
                );
            } else if (websocket === testnetEnv) {
                this.defaultWebsocket();
            }
        } catch (error: any) {
            throw new Error(error);
        }
    }

    static defaultWebsocket = async () => {
        try {
            process.env.WS_PROVIDER_ENDPOINT = process.env.TESTNET_WS_PROVIDER_ENDPOINT;
            this.setEnvAddresses(
                process.env.TESTNET_ASTROCHIBBI_ADDRESS as string,
                process.env.TESTNET_ASTRO_ECONOMY_ADDRESS as string,
                process.env.TESTNET_ASTRO_ENERGY_ADDRESS as string
            );
        } catch (error: any) {
            throw new Error(error);
        }
    }

    static setEnvAddresses = (
        astrochibbiAddress: string,
        astroEconomyAddress: string,
        astroEnergyAddress: string
    ) => {
        process.env.ASTROCHIBBI_ADDRESS = astrochibbiAddress;
        process.env.ASTRO_ECONOMY_ADDRESS = astroEconomyAddress;
        process.env.ASTRO_ENERGY_ADDRESS = astroEnergyAddress;
    }
}

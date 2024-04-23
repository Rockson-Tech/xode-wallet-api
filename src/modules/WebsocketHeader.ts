// import { ContractPromise } from '@polkadot/api-contract';
import '@polkadot/api-augment';

export default class WebsocketHeader {
    static handleWebsocket = async (request: any) => {
        try {
            let websocket: string | undefined;
            if (request.headers.websocket) {
              if (Array.isArray(request.headers.websocket)) {
                websocket = request.headers.websocket.join(',');
              } else {
                websocket = request.headers.websocket;
              }
              process.env.WS_PROVIDER_ENDPOINT = websocket;
            } else {
              process.env.WS_PROVIDER_ENDPOINT = process.env.TESTNET_WS_PROVIDER_ENDPOINT;
            }
        } catch (error) {
            console.error(error);
            return undefined;
        }
    }
}
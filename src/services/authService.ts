import { cryptoWaitReady, signatureVerify } from '@polkadot/util-crypto';
import { Keyring } from '@polkadot/keyring';
import { FastifyRequest } from 'fastify';
import CryptoJS from 'crypto-js';

export async function marketingAuth(
	request: FastifyRequest,
): Promise<boolean | Error> {
    try {
		await cryptoWaitReady();
		const tokenHeader = request.headers.token as string;
		const token_key = process.env.TOKEN_KEY as string;
		const seed = process.env.ASTROCHIBBI_SEED as string;
		const token = JSON.parse(CryptoJS.AES.decrypt(tokenHeader, token_key).toString(CryptoJS.enc.Utf8));
		const keyring = new Keyring({ type: 'sr25519' });
		const pair = keyring.addFromMnemonic(seed);
		const address = pair.address;
		const { isValid } = signatureVerify(token.message, token.signature, address);
		return isValid;
    } catch (error) {
		console.error(error);
        return false;
    }
}
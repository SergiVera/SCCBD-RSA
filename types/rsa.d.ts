export function generateRandomKeys(bitLength?: number): Promise<{
    publicKey: PublicKey;
    privateKey: {
        d: any;
        publicKey: any;
        decrypt(c: bigint): string;
        sign(m: string | number | bigint): bigint;
    };
}>;
import * as PublicKey from "../models/publicKey";

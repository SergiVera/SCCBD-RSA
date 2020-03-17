export function generateRandomKeys(bitLength$1?: number): Promise<{
    privateKey: {
        d: any;
        publicKey: {
            e: any;
            n: any;
            /**
             * Encrypt a given message
             *
             * @param {bigint} m message to encrypt
             * @return {bigint} message encrypted
             **/
            encrypt(m: bigint): bigint;
            /**
             * Verify a given signed message
             *
             * @param {bigint} s signed message
             * @return {bigint} m bigint message
             **/
            verify(s: bigint): bigint;
        };
        /**
         * Decrypt a given encrypted message
         *
         * @param {bigint} c message encrypted
         * @return {bigint} m message decrypted
         **/
        decrypt(c: bigint): bigint;
        /**
         * Sign a given message
         *
         * @param {bigint} m message to sign
         * @return {bigint} s message signed
         **/
        sign(m: bigint): bigint;
    };
    publicKey: {
        e: any;
        n: any;
        /**
         * Encrypt a given message
         *
         * @param {bigint} m message to encrypt
         * @return {bigint} message encrypted
         **/
        encrypt(m: bigint): bigint;
        /**
         * Verify a given signed message
         *
         * @param {bigint} s signed message
         * @return {bigint} m bigint message
         **/
        verify(s: bigint): bigint;
    };
}>;
export const privateKey: Readonly<{
    __proto__: any;
}>;
export const publicKey: Readonly<{
    __proto__: any;
}>;

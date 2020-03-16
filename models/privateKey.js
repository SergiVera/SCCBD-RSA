'use strict';

import * as bcu from 'bigint-crypto-utils';


const PrivateKey = class PrivateKey {

    /**
     *
     * @constructs
     * @param {bigint | number} d private exponent
     * @param {PublicKey} publicKey
     */
    constructor (d, publicKey) {
        this.d = BigInt(d);
        this.publicKey = publicKey;
    }

    /**
     * Decrypt a given encrypted message
     *
     * @param {bigint} c message encrypted
     * @return {bigint} m message decrypted
     **/
    decrypt (c) {
        return bcu.modPow(c, this.d, this.publicKey.n);
    }

    /**
     * Sign a given message
     *
     * @param {bigint} m message to sign
     * @return {bigint} s message signed
     **/
    sign (m) {
        return bcu.modPow(m, this.d, this.publicKey.n);
    }
}

module.exports = PrivateKey;

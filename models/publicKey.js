'use strict';

import * as bcu from 'bigint-crypto-utils';


const PublicKey = class PublicKey {

    /**
     *
     * @constructs
     * @param {bigint | number} e public exponent
     * @param {bigint | number} n public modulus
     */
    constructor(e, n) {
        this.e = BigInt(e);
        this.n = BigInt(n);
    }

    /**
     * Encrypt a given message
     *
     * @param {bigint} m message to encrypt
     * @return {bigint} message encrypted
     **/
    encrypt (m) {
        return bcu.modPow(m, this.e, this.n);
    }

    /**
     * Verify a given signed message
     *
     * @param {bigint} s signed message
     * @return {bigint} m bigint message
     **/
    verify (s) {
        return bcu.modPow(s, this.e, this.n);
    }

}

module.exports = PublicKey;

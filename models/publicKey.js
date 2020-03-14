'use strict';

const bcu = require('bigint-crypto-utils');
const conversion = require('bigint-conversion');

/**
 * @param e bigint public exponent
 * @param n bigint module
 */

class PublicKey {

    constructor(e, n) {
        this.e = BigInt(e);
        this.n = BigInt(n);
    }

    /**
     * Encrypt a given message
     *
     * @param {bigint | string | number} m message to encrypt
     * @return {bigint} message encrypted
     **/
    encrypt (m) {
        return bcu.modPow(conversion.textToBigint(m), this.e, this.n);
    }

    /**
     * Verify a given signed message
     *
     * @param {bigint} s signed message
     * @return {bigint | string | number} m bigint message
     **/
    verify (s) {
        return conversion.bigintToText(bcu.modPow(s, this.e, this.n));
    }

}

module.exports = PublicKey;

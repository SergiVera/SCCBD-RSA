'use strict';

const bcu = require('bigint-crypto-utils');
const conversion = require('bigint-conversion');

/**
 * @param d bigint private exponent
 * @param publicKey publicKey
 */

const PrivateKey = class PrivateKey {

    constructor (d, publicKey) {
        this.d = BigInt(d);
        this.publicKey = publicKey;
    }

    /**
     * Decrypt a given encrypted message
     *
     * @param {bigint} c message to decrypt
     * @return {string} m message decrypted
     **/
    decrypt (c) {
        return conversion.bigintToText(bcu.modPow(c, this.d, this.publicKey.n));
    }

    /**
     * Sign a given message
     *
     * @param {bigint | string | number} m message to sign
     * @return {bigint} s message signed
     **/
    sign (m) {
        return bcu.modPow(conversion.textToBigint(m), this.d, this.publicKey.n);
    }
}

module.exports = PrivateKey;

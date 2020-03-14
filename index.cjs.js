'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var bcu$2 = require('bigint-crypto-utils');

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

var PublicKey$1 = /*#__PURE__*/Object.freeze({
    __proto__: null
});

const bcu$1 = require('bigint-crypto-utils');
const conversion$1 = require('bigint-conversion');

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
     * @param {bigint} c message encrypted
     * @return {string} m message decrypted
     **/
    decrypt (c) {
        return conversion$1.bigintToText(bcu$1.modPow(c, this.d, this.publicKey.n));
    }

    /**
     * Sign a given message
     *
     * @param {bigint | string | number} m message to sign
     * @return {bigint} s message signed
     **/
    sign (m) {
        return bcu$1.modPow(conversion$1.textToBigint(m), this.d, this.publicKey.n);
    }
};

module.exports = PrivateKey;

var PrivateKey$1 = /*#__PURE__*/Object.freeze({
    __proto__: null
});

// Since we are working with BigInt values, subtract 1 as integer number is not valid, so we create a public constant
const _ONE = BigInt(1);
// We need to generate the coprime "e" in modulus phi(n)
const _E = BigInt(65537);

/*function _two() {
    return BigInt(2);
}

export const twoModPow = function (exponent = BigInt(7), modulus = BigInt(5)) {
    return bcu.modPow(_two(), exponent, modulus)
};*/

const generateRandomKeys = async function (bitLength = 3072) {
    let p, q, n, phi;

    // First step is to generate the public modulus as n = p * q
    do {
        p = await bcu$2.prime(Math.floor(bitLength / 2) + 1);
        q = await bcu$2.prime(Math.floor(bitLength / 2));
        n = p * q;

        // Second step is to compute Euler's totient function
        phi = (p - _ONE) * (q - _ONE);


    } while (q === p || bcu$2.bitLength(n) !== bitLength || !(bcu$2.gcd(_E, phi) === _ONE));

    let d = await bcu$2.modInv(_E, phi);

    const publicKey = new PublicKey$1(_E, n);
    const privateKey = new PrivateKey$1(d, publicKey);

    return {publicKey: publicKey, privateKey: privateKey};
};

exports.generateRandomKeys = generateRandomKeys;

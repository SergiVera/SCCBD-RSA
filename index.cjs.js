'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var bcu = require('bigint-crypto-utils');

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

};

module.exports = PublicKey;

var PublicKey$1 = /*#__PURE__*/Object.freeze({
    __proto__: null
});

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
};

module.exports = PrivateKey;

var PrivateKey$1 = /*#__PURE__*/Object.freeze({
    __proto__: null
});

// Since we are working with BigInt values, subtract 1 as integer number is not valid, so we create a public constant
const _ONE = BigInt(1);
// We need to generate the coprime "e" in modulus phi(n)
const _E = BigInt(65537);

/**
 * Generate Random Keys function
 * @param {number} bitLength
 * @returns {Promise<{privateKey: PrivateKey, publicKey: PublicKey}>}
 */
const generateRandomKeys = async function (bitLength = 3072) {
    let p, q, n, phi;

    // First step is to generate the public modulus as n = p * q
    do {
        p = await bcu.prime(Math.floor(bitLength / 2) + 1);
        q = await bcu.prime(Math.floor(bitLength / 2));
        n = p * q;

        // Second step is to compute Euler's totient function
        phi = (p - _ONE) * (q - _ONE);


    } while (q === p || bcu.bitLength(n) !== bitLength || !(bcu.gcd(_E, phi) === _ONE));

    let d = await bcu.modInv(_E, phi);

    const publicKey = new PublicKey$1(_E, n);
    const privateKey = new PrivateKey$1(d, publicKey);

    return {publicKey: publicKey, privateKey: privateKey};
};

const publicKey = PublicKey$1;
const privateKey = PrivateKey$1;

exports.generateRandomKeys = generateRandomKeys;
exports.privateKey = privateKey;
exports.publicKey = publicKey;

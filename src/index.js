'use strict';

import * as PublicKey from '../models/publicKey';
import * as PrivateKey from '../models/privateKey';
import * as bcu from 'bigint-crypto-utils';
// Since we are working with BigInt values, subtract 1 as integer number is not valid, so we create a public constant
const _ONE = BigInt(1);
// We need to generate the coprime "e" in modulus phi(n)
const _E = BigInt(65537);

/**
 * Generate Random Keys function
 * @param {number} bitLength
 * @returns {Promise<{privateKey: PrivateKey, publicKey: PublicKey}>}
 */
export const generateRandomKeys = async function (bitLength = 3072) {
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

    const publicKey = new PublicKey(_E, n);
    const privateKey = new PrivateKey(d, publicKey);

    return {publicKey: publicKey, privateKey: privateKey};
};

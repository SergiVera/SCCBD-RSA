'use strict';

const PublicKey = require('../models/publicKey');
const PrivateKey = require('../models/privateKey');
const bcu = require('bigint-crypto-utils');
const conversion = require('bigint-conversion');
// Since we are working with BigInt values, subtract 1 as integer number is not valid, so we create a public constant
const _ONE = BigInt(1);
// We need to generate the coprime "e" in modulus phi(n)
const _E = BigInt(65537);

async function generateRandomKeys (bitLength = 3072) {
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

    /*do {
        // Third step is to choose a coprime of "phi" as the public exponent e;
        e = await bcu.prime(Math.floor(bitLength / 2));
        // Find the greatest common divisor between phi and n2
        number = await gcd(e, phi);
        // Fourth step is to compute the private exponent d as the inverse of coprime "e" in modulus phi(n)
    } while (number !== BigInt(1));*/

    const publicKey = new PublicKey(_E, n);
    const privateKey = new PrivateKey(d, publicKey);

    return {publicKey: publicKey, privateKey: privateKey};
}

module.exports = {
  generateRandomKeys
};

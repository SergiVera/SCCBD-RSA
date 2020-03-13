'use strict';

const PublicKey = require('../models/publicKey');
const PrivateKey = require('../models/privateKey');
const bcu = require('bigint-crypto-utils');
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
        phi = (p - _ONE) * (n - _ONE);


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

/**
 * RSA keypair test
 *
 * @param { string } m - a test message
 * @param {KeyPair} kp - keyPair of a public/private keys
 * @returns { boolean } - true if is all working, else false
 */
async function test (m, kp) {
    let encryption = kp.publicKey.encrypt(m);
    let clearText = kp.privateKey.decrypt(encryption);
    let signature = kp.privateKey.sign(m);
    let verification = kp.publicKey.verify(signature);
    console.log(
        "Message to test: "+m+'\n'+
        "Cleartext message: "+clearText+'\n'+
        "Verified message: "+verification);
    if(clearText === m && verification === m) {
        console.log("Well done!");
        return true;
    }
    else {
        console.log("Something went wrong...");
        return false;
    }
};

module.exports = {
  generateRandomKeys,
    test
};

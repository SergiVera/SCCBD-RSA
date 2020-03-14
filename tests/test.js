'use strict';

const keyGenerator = require('../src/index.js');

(async () => {
    let keyPair = await keyGenerator();
    await test('Hola',keyPair);
})();

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
}





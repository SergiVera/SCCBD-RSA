'use strict';

const keyGenerator = require('../controllers/keyGenerator');

(async () => {
    let keyPair = await keyGenerator.generateRandomKeys();
    //console.log(keyPair);
    await keyGenerator.test('Hola',keyPair);
})();





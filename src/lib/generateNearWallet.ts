// Import required dependencies
const { keyStores, KeyPair, connect } = require('near-api-js');
const { sha256 } = require('js-sha256');
const { encode } = require('bs58');

async function generateNEARWallet() {
    // Step 1: Generate a new key pair
    // NEAR uses Ed25519 for its cryptographic operations
    const keyPair = KeyPair.fromRandom('ed25519');

    // Step 2: Get the public key
    // The public key will be used as the account identifier
    const publicKey = keyPair.getPublicKey();

    // Step 3: Get the private key
    // Keep this secure! Never share your private key
    const privateKey = keyPair.toString();

    // Step 4: Create an implicit account ID
    // In NEAR, implicit accounts are derived from the public key
    const publicKeyBytes = Buffer.from(publicKey.toString().split(':')[1], 'base64');
    const accountId = encode(sha256(publicKeyBytes));

    // Step 5: Connect to NEAR network (testnet in this example)
    const config = {
        networkId: 'testnet',
        keyStore: new keyStores.InMemoryKeyStore(),
        nodeUrl: 'https://rpc.testnet.near.org'
    };

    const near = await connect(config);

    // Step 6: Create the complete wallet object
    const wallet = {
        accountId: accountId,
        publicKey: publicKey.toString(),
        privateKey: privateKey,
        network: config.networkId
    };

    return wallet;
}
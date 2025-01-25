const { keyStores, KeyPair, connect } = require('near-api-js');
const { sha256 } = require('js-sha256');
const baseEncode = require('base-encode');  // A simpler base encoding library

export async function generateNEARWallet() {
    // First, we create our keypair - this is the foundation of our wallet's security
    const keyPair = KeyPair.fromRandom('ed25519');
    
    // Extract the public key - this is what others will see and use to identify our wallet
    const publicKey = keyPair.getPublicKey();
    
    // Store the private key - this must be kept secure as it controls wallet access
    const privateKey = keyPair.toString();
    
    // Now we'll create our account ID through a series of transformations:
    // First, get the raw public key data by removing the encoding prefix
    const publicKeyBase64 = publicKey.toString().split(':')[1];
    
    // Convert our base64 key into raw bytes
    const publicKeyBytes = Buffer.from(publicKeyBase64, 'base64');
    
    // Create a cryptographic hash of these bytes
    const hashedKey = sha256(publicKeyBytes);
    
    // Convert the hash to base58 format - this creates our readable account ID
    const accountId = baseEncode(Buffer.from(hashedKey), 'base58');
    
    // Configure our connection to the NEAR testnet
    const config = {
        networkId: 'testnet',
        keyStore: new keyStores.InMemoryKeyStore(),
        nodeUrl: 'https://rpc.testnet.near.org'
    };
    
    // Establish our connection to the NEAR network
    const near = await connect(config);
    
    // Create our complete wallet object containing all necessary information
    const wallet = {
        accountId: accountId,
        publicKey: publicKey.toString(),
        privateKey: privateKey,
        network: config.networkId
    };
    
    return wallet;
}
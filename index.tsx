// src/index.ts
import axios, { AxiosResponse } from 'axios';
import { split, combine } from 'shamir-secret-sharing';
import { ethers } from 'ethers';
import { keyStores, KeyPair, connect } from 'near-api-js';
import { sha256 } from 'js-sha256';

// Helper function to convert a buffer to base58
// This implementation uses Node.js built-in Buffer capabilities
function toBase58(buffer) {
    const ALPHABET = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
    const BASE = ALPHABET.length;

    // Convert buffer to a number array
    const digits = Array.from(buffer);
    let output = '';

    // Perform base conversion manually
    let n = BigInt(0);
    for (const digit of digits) {
        n = n * BigInt(256) + BigInt(digit as any);
    }

    // Extract base58 digits
    while (n > 0) {
        output = ALPHABET[Number(n % BigInt(BASE))] + output;
        n = n / BigInt(BASE);
    }

    // Add leading zeros from input
    for (let i = 0; i < buffer.length && buffer[i] === 0; i++) {
        output = ALPHABET[0] + output;
    }

    return output;
}

export async function generateNEARWallet() {
    try {
        // Generate a new ED25519 key pair
        const keyPair = KeyPair.fromRandom('ed25519');

        // Get the public key and private key
        const publicKey = keyPair.getPublicKey();
        const privateKey = keyPair.toString();

        // Extract the base64 portion of the public key
        // The public key string comes in format "ed25519:base64string"
        const publicKeyBase64 = publicKey.toString().split(':')[1];

        // Convert the public key to bytes
        const publicKeyBytes = Buffer.from(publicKeyBase64, 'base64');

        // Create a SHA-256 hash of the public key bytes
        const hashedKeyBytes = Buffer.from(sha256(publicKeyBytes), 'hex');

        // Convert the hash to our custom base58 format
        const accountId = toBase58(hashedKeyBytes);

        // Configure connection to NEAR testnet
        const config = {
            networkId: 'testnet',
            keyStore: new keyStores.InMemoryKeyStore(),
            nodeUrl: 'https://rpc.testnet.near.org'
        };

        // Establish connection to NEAR network
        const near = await connect(config as any);

        // Create and return the wallet object
        const wallet = {
            accountId: accountId,
            publicKey: publicKey.toString(),
            privateKey: privateKey,
            network: config.networkId
        };

        return wallet;

    } catch (error) {
        console.error('Error generating NEAR wallet:', error);
        throw error;
    }
}

// Interfaces
interface WalletInfo {
    privateKey?: string;
    address: string;
}

interface EncryptionResult {
    user_shares?: string[];
    public_address: string;
}

interface ApiResponse {
    secret?: string;
    [key: string]: any;
}

interface UserCreateParams {
    email?: string;
    phone?: string;
    evm?: string;
}

interface EncryptParams {
    user_id?: string;
    wallet_type: 'near' | 'ethereum';
}

interface DecryptParams {
    userShares?: string[];
    user_id?: string;
}

interface UserParams {
    user_id?: string;
}

interface SecretParams extends UserParams {
    secret?: string;
}



export class CubidSDK {
    private readonly dapp_id: string;
    private readonly api_key: string;
    private readonly baseUrl: string;
    private readonly TOTAL_SHARES: number = 3;  // Always create 3 shares
    private readonly THRESHOLD: number = 2;     // Need 2 shares to reconstruct

    constructor(dapp_id: string, api_key: string) {
        this.dapp_id = dapp_id;
        this.api_key = api_key;
        this.baseUrl = 'https://passport.cubid.me/api/v2';
    }

    /**
     * Converts a hex string to Uint8Array
     */
    private hexToBytes(hex: string): Uint8Array {
        hex = hex.replace('0x', '');
        const bytes = new Uint8Array(hex.length / 2);
        for (let i = 0; i < hex.length; i += 2) {
            bytes[i / 2] = parseInt(hex.slice(i, i + 2), 16);
        }
        return bytes;
    }

    /**
     * Converts Uint8Array to hex string
     */
    private bytesToHex(bytes: Uint8Array): string {
        return '0x' + Array.from(bytes)
            .map(b => b.toString(16).padStart(2, '0'))
            .join('');
    }

    /**
     * Helper function to make POST HTTP requests
     */
    private async makePostRequest<T>(endpoint: string, data: Record<string, any> = {}): Promise<T> {
        try {
            const response: AxiosResponse<T> = await axios({
                url: `${this.baseUrl}/${endpoint}`,
                method: 'POST',
                headers: {
                    'dapp-id': this.dapp_id,
                    'api-key': this.api_key,
                    'Content-Type': 'application/json',
                },
                data,
            });
            return response.data;
        } catch (error) {
            throw new Error(`API request to ${endpoint} failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }

    private async generateEthereumKey(): Promise<WalletInfo> {
        console.log('Starting Ethereum wallet generation');
        try {
            const wallet = ethers.Wallet.createRandom();
            console.log('Successfully generated Ethereum wallet', {
                addressPrefix: wallet.address.slice(0, 6), // Log only first few chars of address for identification
                timestamp: new Date().toISOString()
            });
            return {
                privateKey: wallet.privateKey,
                address: wallet.address
            };
        } catch (error) {
            console.error('Failed to generate Ethereum wallet:', {
                error: error instanceof Error ? error.message : 'Unknown error',
                stack: error instanceof Error ? error.stack : '',
                timestamp: new Date().toISOString()
            });
            throw error;
        }
    }

    private async generateNearKey(): Promise<WalletInfo> {
        console.log('Starting NEAR wallet generation');
        try {
            const wallet = await generateNEARWallet();
            console.log('Successfully generated NEAR wallet', {
                addressPrefix: wallet.publicKey.slice(0, 6), // Log only first few chars for identification
                timestamp: new Date().toISOString()
            });
            return {
                privateKey: wallet.privateKey,
                address: wallet.publicKey
            };
        } catch (error) {
            console.error('Failed to generate NEAR wallet:', {
                error: error instanceof Error ? error.message : 'Unknown error',
                stack: error instanceof Error ? error.stack : '',
                timestamp: new Date().toISOString()
            });
            throw error;
        }
    }

    async encryptPrivateKey({ user_id, wallet_type }: EncryptParams): Promise<EncryptionResult> {
        console.log('Starting private key encryption process', {
            userId: user_id,
            walletType: wallet_type,
            timestamp: new Date().toISOString()
        });

        try {
            if (!user_id) {
                console.error('Encryption failed: Missing user ID');
                throw new Error('User ID is required');
            }

            // Log wallet generation start
            console.log(`Generating ${wallet_type} wallet`);
            const walletInfo = wallet_type === "near" ?
                await this.generateNearKey() :
                await this.generateEthereumKey();

            console.log('Converting private key to bytes for sharing');
            const secretBytes = this.hexToBytes(walletInfo.privateKey);

            console.log('Generating Shamir shares', {
                totalShares: this.TOTAL_SHARES,
                threshold: this.THRESHOLD,
                timestamp: new Date().toISOString()
            });
            const shares = await split(secretBytes, this.TOTAL_SHARES, this.THRESHOLD);

            console.log('Converting shares to hex format');
            const hexShares = shares.map(share => this.bytesToHex(share));
            const [userShare1, userShare2, apiShare] = hexShares;

            console.log('Saving API share to storage', {
                userId: user_id,
                timestamp: new Date().toISOString()
            });
            await this.saveSecret({
                user_id,
                secret: apiShare,
            });

            console.log('Successfully completed encryption process', {
                userId: user_id,
                walletType: wallet_type,
                addressPrefix: walletInfo.address.slice(0, 6),
                timestamp: new Date().toISOString()
            });

            return {
                user_shares: [userShare1, userShare2],
                public_address: walletInfo.address
            };

        } catch (error) {
            console.error('Encryption process failed:', {
                error: error instanceof Error ? error.message : 'Unknown error',
                stack: error instanceof Error ? error.stack : '',
                userId: user_id,
                walletType: wallet_type,
                timestamp: new Date().toISOString()
            });

            throw new Error(`Encryption failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }

    async decryptPrivateKey({ userShares, user_id }: DecryptParams): Promise<string> {
        console.log('Starting private key decryption process', {
            userId: user_id,
            hasUserShares: Boolean(userShares?.length),
            timestamp: new Date().toISOString()
        });

        try {
            if (!Array.isArray(userShares) || userShares.length !== 2) {
                console.error('Decryption failed: Invalid number of user shares', {
                    userId: user_id,
                    providedShares: userShares?.length,
                    timestamp: new Date().toISOString()
                });
                throw new Error('Exactly two user shares are required');
            }

            if (!user_id) {
                console.error('Decryption failed: Missing user ID');
                throw new Error('User ID is required');
            }

            console.log('Fetching API share from storage', {
                userId: user_id,
                timestamp: new Date().toISOString()
            });
            const apiShareResponse = await this.fetchUserData({ user_id });

            if (!apiShareResponse?.secret) {
                console.error('Failed to retrieve API share', {
                    userId: user_id,
                    timestamp: new Date().toISOString()
                });
                throw new Error('Failed to retrieve share from API');
            }

            console.log('Converting shares to bytes for combination');
            const shareBytes = [...userShares, apiShareResponse.secret].map(share => this.hexToBytes(share));

            console.log('Combining shares to recover secret', {
                numberOfShares: shareBytes.length,
                threshold: this.THRESHOLD,
                timestamp: new Date().toISOString()
            });
            const recoveredBytes = await combine(shareBytes.slice(0, this.THRESHOLD));

            console.log('Successfully completed decryption process', {
                userId: user_id,
                timestamp: new Date().toISOString()
            });

            return this.bytesToHex(recoveredBytes);

        } catch (error) {
            console.error('Decryption process failed:', {
                error: error instanceof Error ? error.message : 'Unknown error',
                stack: error instanceof Error ? error.stack : '',
                userId: user_id,
                timestamp: new Date().toISOString()
            });
            throw new Error(`Decryption failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }

    // API Methods
    async fetchApproxLocation({ user_id }: UserParams): Promise<ApiResponse> {
        return this.makePostRequest<ApiResponse>('identity/fetch_approx_location', { apikey: this.api_key, user_id });
    }

    async fetchExactLocation({ user_id }: UserParams): Promise<ApiResponse> {
        return this.makePostRequest<ApiResponse>('identity/fetch_exact_location', { apikey: this.api_key, user_id });
    }

    async fetchIdentity({ user_id }: UserParams): Promise<ApiResponse> {
        return this.makePostRequest<ApiResponse>('identity/fetch_identity', { apikey: this.api_key, user_id });
    }

    async fetchStamps({ user_id }: UserParams): Promise<ApiResponse> {
        return this.makePostRequest<ApiResponse>('identity/fetch_stamps', { apikey: this.api_key, user_id });
    }

    async fetchRoughLocation({ user_id }: UserParams): Promise<ApiResponse> {
        return this.makePostRequest<ApiResponse>('identity/fetch_rough_location', { apikey: this.api_key, user_id });
    }

    async fetchUserData({ user_id }: UserParams): Promise<ApiResponse> {
        return this.makePostRequest<ApiResponse>('identity/fetch_user_data', { apikey: this.api_key, user_id });
    }

    async fetchScore({ user_id }: UserParams): Promise<ApiResponse> {
        return this.makePostRequest<ApiResponse>('score/fetch_score', { apikey: this.api_key, user_id });
    }

    async createUser({ email, phone, evm }: UserCreateParams): Promise<ApiResponse> {
        return this.makePostRequest<ApiResponse>('create_user', {
            dapp_id: this.dapp_id,
            apikey: this.api_key,
            email,
            phone,
            evm
        });
    }

    async saveSecret({ user_id, secret }: SecretParams): Promise<ApiResponse> {
        return this.makePostRequest<ApiResponse>('save_secret', {
            user_id,
            api_key: this.api_key,
            secret
        });
    }
}

export { CubidWidget } from './src/component/cubidWidget';
export { Provider } from './src/component/providers';
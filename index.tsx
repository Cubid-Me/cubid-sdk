// src/index.ts
import axios, { AxiosResponse } from 'axios';
import { split, combine } from 'shamir-secret-sharing';
import { ethers } from 'ethers';

export { CubidWidget } from './src/component/cubidWidget';
export { Provider } from './src/component/providers';

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
        const wallet = ethers.Wallet.createRandom();
        return {
            privateKey: wallet.privateKey,
            address: wallet.address
        };
    }

    /**
     * Generates and encrypts an Ethereum private key using Shamir's Secret Sharing
     */
    async encryptPrivateKey({ user_id }: EncryptParams): Promise<EncryptionResult> {
        try {
            console.log('Starting private key encryption process for user:', user_id);

            if (!user_id) {
                throw new Error('User ID is required');
            }

            const walletInfo = await this.generateEthereumKey();
            const secretBytes = this.hexToBytes(walletInfo.privateKey);
            const shares = await split(secretBytes, this.TOTAL_SHARES, this.THRESHOLD);
            const hexShares = shares.map(share => this.bytesToHex(share));
            const [userShare1, userShare2, apiShare] = hexShares;

            await this.saveSecret({
                user_id,
                secret: apiShare,
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
                timestamp: new Date().toISOString()
            });

            throw new Error(`Encryption failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }

    /**
     * Decrypts a private key using user shares and retrieving API share
     */
    async decryptPrivateKey({ userShares, user_id }: DecryptParams): Promise<string> {
        try {
            if (!Array.isArray(userShares) || userShares.length !== 2) {
                throw new Error('Exactly two user shares are required');
            }

            if (!user_id) {
                throw new Error('User ID is required');
            }

            const apiShareResponse = await this.fetchUserData({ user_id });
            if (!apiShareResponse?.secret) {
                throw new Error('Failed to retrieve share from API');
            }

            const shareBytes = [...userShares, apiShareResponse.secret].map(share => this.hexToBytes(share));
            const recoveredBytes = await combine(shareBytes.slice(0, this.THRESHOLD));

            return this.bytesToHex(recoveredBytes);

        } catch (error) {
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
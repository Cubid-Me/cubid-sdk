import * as react_jsx_runtime from 'react/jsx-runtime';

/**
 * A simple React widget for the Cubid SDK.
 * @param {Object} props - The component props.
 * @param {string} props.title - The title of the widget.
 */
declare const CubidWidget: ({ stampToRender, uuid, page_id, api_key, onStampChange, onBlacklistVerify }: {
    stampToRender: string;
    uuid: string;
    page_id: string;
    api_key: string;
    onStampChange?: () => void;
}) => react_jsx_runtime.JSX.Element;

declare const Provider: (props: any) => react_jsx_runtime.JSX.Element;

declare function generateNEARWallet(): Promise<{
    accountId: string;
    publicKey: any;
    privateKey: any;
    network: string;
}>;
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
declare class CubidSDK {
    private readonly dapp_id;
    private readonly api_key;
    private readonly baseUrl;
    private readonly TOTAL_SHARES;
    private readonly THRESHOLD;
    constructor(dapp_id: string, api_key: string);
    /**
     * Converts a hex string to Uint8Array
     */
    private hexToBytes;
    /**
     * Converts Uint8Array to hex string
     */
    private bytesToHex;
    /**
     * Helper function to make POST HTTP requests
     */
    private makePostRequest;
    private generateEthereumKey;
    private generateNearKey;
    encryptPrivateKey({ user_id, wallet_type }: EncryptParams): Promise<EncryptionResult>;
    decryptPrivateKey({ userShares, user_id }: DecryptParams): Promise<string>;
    fetchApproxLocation({ user_id }: UserParams): Promise<ApiResponse>;
    fetchExactLocation({ user_id }: UserParams): Promise<ApiResponse>;
    fetchIdentity({ user_id }: UserParams): Promise<ApiResponse>;
    fetchStamps({ user_id }: UserParams): Promise<ApiResponse>;
    fetchRoughLocation({ user_id }: UserParams): Promise<ApiResponse>;
    fetchUserData({ user_id }: UserParams): Promise<ApiResponse>;
    fetchScore({ user_id }: UserParams): Promise<ApiResponse>;
    createUser({ email, phone, evm }: UserCreateParams): Promise<ApiResponse>;
    saveSecret({ user_id, secret }: SecretParams): Promise<ApiResponse>;
}

export { CubidSDK, CubidWidget, Provider, generateNEARWallet };

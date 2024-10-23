export declare class Wallet {
    constructor({ createAccessKeyFor, network }: any);
    startUp(): Promise<any>;
    account(): Promise<any>;
    signIn(): void;
    signOut(): void;
    viewMethod({ contractId, method, args }: any): Promise<any>;
    callMethod({ contractId, method, args, gas, deposit, }: any): Promise<any>;
    getTransactionResult(txhash: string): Promise<string | number | object>;
}

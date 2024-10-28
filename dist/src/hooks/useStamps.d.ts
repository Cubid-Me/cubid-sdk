export declare const useStamps: ({ user }: {
    user?: any;
}) => {
    stamps: any[];
    stampCollector: any[];
    fetchNearAndGitcoinStamps: () => Promise<void>;
    gitcoinScore: number;
};

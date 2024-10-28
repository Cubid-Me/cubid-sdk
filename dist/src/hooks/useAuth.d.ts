export declare const useAuth: () => {
    loading: boolean;
    user: {};
    supabaseUser: {};
    getUser: () => Promise<void>;
};
export default useAuth;

import { Profile } from '@lens-protocol/react-web';
export type LoginAsProps = {
    profile: Profile;
    wallet: string;
    onSuccess: (profile: Profile) => void;
};
type LoginOptionsProps = {
    wallet: string;
    onSuccess: (profile: Profile) => void;
};
export declare function LoginOptions({ wallet, onSuccess }: LoginOptionsProps): any;
export {};

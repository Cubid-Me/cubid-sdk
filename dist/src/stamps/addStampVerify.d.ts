import React from 'react';
export declare function AdvancedCredentialCollection({ email, apikey, refresh, uuid, allStampIds }: {
    email: string;
    apikey: string;
    refresh: () => Promise<void>;
    uuid: string;
    allStampIds: Array<number>;
}): React.JSX.Element;

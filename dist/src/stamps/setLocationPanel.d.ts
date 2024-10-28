import React from "react";
import 'react-phone-input-2/lib/style.css';
export declare const LocationSearchPanel: ({ open, onClose, apikey, page_id, uuid, fetchStamps }: {
    open: boolean;
    onClose: () => void;
    apikey: string;
    page_id?: string;
    uuid: string;
    fetchStamps: () => void;
}) => React.JSX.Element;

import React from 'react';
/**
 * A simple React widget for the Cubid SDK.
 * @param {Object} props - The component props.
 * @param {string} props.title - The title of the widget.
 */
export declare const CubidWidget: ({ stampToRender, uuid, page_id, api_key, onStampChange }: {
    stampToRender: string;
    uuid: string;
    page_id: string;
    api_key: string;
    onStampChange?: () => void;
}) => React.JSX.Element;
export declare const CubidWidgetCollection: ({ stampToRender, uuid, page_id, api_key, onStampChange }: {
    stampToRender: string[];
    uuid: string;
    page_id: string;
    api_key: string;
    onStampChange?: () => void;
}) => React.JSX.Element;

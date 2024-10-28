import React from 'react';
import 'tailwindcss/tailwind.css';
/**
 * A simple React widget for the Cubid SDK.
 * @param {Object} props - The component props.
 * @param {string} props.title - The title of the widget.
 */
export declare const CubidWidget: ({ stampToRender, uuid, page_id, api_key }: {
    stampToRender: string;
    uuid: string;
    page_id: string;
    api_key: string;
}) => React.JSX.Element;
export declare const CubidWidgetCollection: ({ stampToRender, uuid, page_id, api_key }: {
    stampToRender: string[];
    uuid: string;
    page_id: string;
    api_key: string;
}) => React.JSX.Element;

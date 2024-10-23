import React from 'react';
import { Stamps } from '../stamps/index'

/**
 * A simple React widget for the Cubid SDK.
 * @param {Object} props - The component props.
 * @param {string} props.title - The title of the widget.
 */
export const CubidWidget = ({ stampToRender, uuid, page_id, api_key }: { stampToRender: string, uuid: string, page_id: string, api_key: string }) => {
    return (
        <Stamps stampToRender={stampToRender} uuid={uuid} page_id={page_id} api_key={api_key} />
    );
};

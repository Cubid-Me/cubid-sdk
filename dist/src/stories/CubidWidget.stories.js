import React from 'react';
import 'react-phone-input-2/lib/style.css';
import '@farcaster/auth-kit/styles.css';
import { CubidWidget } from '../component/cubidWidget';
import { Provider } from '../component/providers';
var PropsWithComp = function(props) {
    return /*#__PURE__*/ React.createElement(Provider, null, /*#__PURE__*/ React.createElement(CubidWidget, props));
};
var meta = {
    title: 'Cubid/Widget',
    component: PropsWithComp,
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: [
        'autodocs'
    ],
    parameters: {
        // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
        layout: 'fullscreen'
    },
    args: {
        stampToRender: "",
        uuid: "",
        page_id: "",
        api_key: ""
    }
};
export default meta;
export var GoogleWidget = {
    args: {
        stampToRender: "google",
        uuid: "4295b01e-4726-44e5-802b-eec14eefe38b",
        page_id: "35",
        api_key: "8c354e51-d323-482a-86ca-e931cd0e91d8"
    }
};
export var DiscordWidget = {
    args: {
        stampToRender: "discord",
        uuid: "4295b01e-4726-44e5-802b-eec14eefe38b",
        page_id: "35",
        api_key: "8c354e51-d323-482a-86ca-e931cd0e91d8"
    }
};
export var AddressWidget = {
    args: {
        stampToRender: "address",
        uuid: "5db88e8c-c458-4ff4-bae6-4299cfd845d9",
        page_id: "20",
        api_key: "8c354e51-d323-482a-86ca-e931cd0e91d8"
    }
};
export var PhoneWidget = {
    args: {
        stampToRender: "phone",
        uuid: "82df4ce6-1414-4c34-9c34-67a7092d9ede\n",
        page_id: "35",
        api_key: "8c354e51-d323-482a-86ca-e931cd0e91d8"
    }
};

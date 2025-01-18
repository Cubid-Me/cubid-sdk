"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhoneWidget = exports.AddressWidget = exports.DiscordWidget = exports.GoogleWidget = void 0;
const react_1 = __importDefault(require("react"));
require("react-phone-input-2/lib/style.css");
require("@farcaster/auth-kit/styles.css");
const cubidWidget_1 = require("../component/cubidWidget");
const providers_1 = require("../component/providers");
const PropsWithComp = (props) => {
    return react_1.default.createElement(providers_1.Provider, null,
        react_1.default.createElement(cubidWidget_1.CubidWidget, Object.assign({}, props)));
};
const meta = {
    title: 'Cubid/Widget',
    component: PropsWithComp,
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ['autodocs'],
    parameters: {
        // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
        layout: 'fullscreen',
    },
    args: {
        stampToRender: "",
        uuid: "",
        page_id: "",
        api_key: "",
    },
};
exports.default = meta;
exports.GoogleWidget = {
    args: {
        stampToRender: "google",
        uuid: "4295b01e-4726-44e5-802b-eec14eefe38b",
        page_id: "35",
        api_key: "8c354e51-d323-482a-86ca-e931cd0e91d8",
    },
};
exports.DiscordWidget = {
    args: {
        stampToRender: "discord",
        uuid: "4295b01e-4726-44e5-802b-eec14eefe38b",
        page_id: "35",
        api_key: "8c354e51-d323-482a-86ca-e931cd0e91d8",
    },
};
exports.AddressWidget = {
    args: {
        stampToRender: "address",
        uuid: "5db88e8c-c458-4ff4-bae6-4299cfd845d9",
        page_id: "20",
        api_key: "8c354e51-d323-482a-86ca-e931cd0e91d8",
    },
};
exports.PhoneWidget = {
    args: {
        stampToRender: "phone",
        uuid: "82df4ce6-1414-4c34-9c34-67a7092d9edc",
        page_id: "35",
        api_key: "8c354e51-d323-482a-86ca-e931cd0e91d8",
    },
};

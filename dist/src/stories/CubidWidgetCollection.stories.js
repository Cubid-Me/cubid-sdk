"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StampCollection = void 0;
const react_1 = __importDefault(require("react"));
const cubidWidget_1 = require("../component/cubidWidget");
const providers_1 = require("../component/providers");
const PropsWithComp = (props) => {
    return react_1.default.createElement(providers_1.Provider, null,
        react_1.default.createElement(cubidWidget_1.CubidWidgetCollection, Object.assign({}, props)));
};
const meta = {
    title: 'Cubid/WidgetCollection',
    component: PropsWithComp,
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ['autodocs'],
    parameters: {
        // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
        layout: 'fullscreen',
    },
    args: {
        stampToRender: [],
        uuid: "",
        page_id: "",
        api_key: "",
    },
};
exports.default = meta;
const allStampTypes = {
    facebook: 1,
    github: 2,
    google: 3,
    twitter: 4,
    discord: 5,
    iah: 7,
    brightid: 8,
    gitcoin: 9,
    instagram: 10,
    phone: 11,
    gooddollar: 12,
    'evm': 14,
    "near-wallet": 15,
    fractal: 17,
    solana: 53,
    telegram: 27,
    worldcoin: 26,
    near: 15,
    "lens-protocol": 66,
    farcaster: 68,
    address: 70
};
exports.StampCollection = {
    args: {
        stampToRender: Object.keys(allStampTypes),
        uuid: "158c64cf-7418-4fb2-b36e-068029c3c486",
        page_id: "35",
        api_key: "653529fd-a25b-4340-ba2b-d87ded675ed1",
    },
};

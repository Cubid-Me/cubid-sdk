"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CubidWidget = void 0;
const react_1 = __importDefault(require("react"));
const index_1 = require("../stamps/index");
/**
 * A simple React widget for the Cubid SDK.
 * @param {Object} props - The component props.
 * @param {string} props.title - The title of the widget.
 */
const CubidWidget = ({ stampToRender, uuid, page_id, api_key }) => {
    return (react_1.default.createElement(index_1.Stamps, { stampToRender: stampToRender, uuid: uuid, page_id: page_id, api_key: api_key }));
};
exports.CubidWidget = CubidWidget;

"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.InfoTooltip = void 0;
// @ts-nocheck
const react_1 = __importStar(require("react"));
const InfoTooltip = ({ content }) => {
    const [visible, setVisible] = (0, react_1.useState)(false);
    const styles = {
        container: {
            position: "relative",
            display: "inline-block",
            cursor: "pointer",
        },
        icon: {
            fontSize: "20px",
            color: "red",
            border: "1px solid red",
            borderRadius: "50%",
            width: "24px",
            height: "24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            userSelect: "none",
        },
        tooltip: {
            position: "absolute",
            top: "30px",
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: "#fff",
            border: "1px solid #ddd",
            borderRadius: "5px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            padding: "10px",
            whiteSpace: "nowrap",
            zIndex: 10,
            display: visible ? "block" : "none",
        },
        tooltipArrow: {
            position: "absolute",
            top: "-6px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "10px",
            height: "10px",
            backgroundColor: "#fff",
            borderLeft: "1px solid #ddd",
            borderTop: "1px solid #ddd",
            transformOrigin: "center",
            transform: "translateX(-50%) rotate(45deg)",
        },
    };
    return (react_1.default.createElement("div", { style: styles.container, onMouseEnter: () => setVisible(true), onMouseLeave: () => setVisible(false), onClick: () => setVisible(!visible) },
        react_1.default.createElement("div", { style: styles.icon }, "i"),
        react_1.default.createElement("div", { style: styles.tooltip },
            react_1.default.createElement("div", { style: styles.tooltipArrow }),
            content)));
};
exports.InfoTooltip = InfoTooltip;

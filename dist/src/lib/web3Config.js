"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const wagmi_1 = require("wagmi");
const chains_1 = require("wagmi/chains");
const projectId = "6833ed2c1539b9d27e8840c51f53bd0c";
const connectors_1 = require("wagmi/connectors");
const chains_2 = require("wagmi/chains");
exports.config = (0, wagmi_1.createConfig)({
    chains: [chains_1.mainnet, chains_2.polygon],
    connectors: [
        (0, connectors_1.injected)(),
        (0, connectors_1.walletConnect)({ projectId }),
        (0, connectors_1.metaMask)(),
        (0, connectors_1.safe)(),
    ],
    transports: {
        [chains_2.polygon.id]: (0, wagmi_1.http)(),
        [chains_1.mainnet.id]: (0, wagmi_1.http)(),
    },
});

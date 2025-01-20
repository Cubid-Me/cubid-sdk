function _define_property(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
import { http, createConfig } from 'wagmi';
import { mainnet } from 'wagmi/chains';
var projectId = "6833ed2c1539b9d27e8840c51f53bd0c";
import { injected, metaMask, safe, walletConnect } from 'wagmi/connectors';
import { polygon } from "wagmi/chains";
var _obj;
export var config = createConfig({
    chains: [
        mainnet,
        polygon
    ],
    connectors: [
        injected(),
        walletConnect({
            projectId: projectId
        }),
        metaMask(),
        safe()
    ],
    transports: (_obj = {}, _define_property(_obj, polygon.id, http()), _define_property(_obj, mainnet.id, http()), _obj)
});

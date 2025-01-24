// Import required dependencies
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
        var info = gen[key](arg);
        var value = info.value;
    } catch (error) {
        reject(error);
        return;
    }
    if (info.done) {
        resolve(value);
    } else {
        Promise.resolve(value).then(_next, _throw);
    }
}
function _async_to_generator(fn) {
    return function() {
        var self = this, args = arguments;
        return new Promise(function(resolve, reject) {
            var gen = fn.apply(self, args);
            function _next(value) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
            }
            function _throw(err) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
            }
            _next(undefined);
        });
    };
}
function _ts_generator(thisArg, body) {
    var f, y, t, g, _ = {
        label: 0,
        sent: function() {
            if (t[0] & 1) throw t[1];
            return t[1];
        },
        trys: [],
        ops: []
    };
    return g = {
        next: verb(0),
        "throw": verb(1),
        "return": verb(2)
    }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
    }), g;
    function verb(n) {
        return function(v) {
            return step([
                n,
                v
            ]);
        };
    }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while(_)try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [
                op[0] & 2,
                t.value
            ];
            switch(op[0]){
                case 0:
                case 1:
                    t = op;
                    break;
                case 4:
                    _.label++;
                    return {
                        value: op[1],
                        done: false
                    };
                case 5:
                    _.label++;
                    y = op[1];
                    op = [
                        0
                    ];
                    continue;
                case 7:
                    op = _.ops.pop();
                    _.trys.pop();
                    continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                        _ = 0;
                        continue;
                    }
                    if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                        _.label = op[1];
                        break;
                    }
                    if (op[0] === 6 && _.label < t[1]) {
                        _.label = t[1];
                        t = op;
                        break;
                    }
                    if (t && _.label < t[2]) {
                        _.label = t[2];
                        _.ops.push(op);
                        break;
                    }
                    if (t[2]) _.ops.pop();
                    _.trys.pop();
                    continue;
            }
            op = body.call(thisArg, _);
        } catch (e) {
            op = [
                6,
                e
            ];
            y = 0;
        } finally{
            f = t = 0;
        }
        if (op[0] & 5) throw op[1];
        return {
            value: op[0] ? op[1] : void 0,
            done: true
        };
    }
}
var _require = require('near-api-js'), keyStores = _require.keyStores, KeyPair = _require.KeyPair, connect = _require.connect;
var sha256 = require('js-sha256').sha256;
var encode = require('bs58').encode;
function generateNEARWallet() {
    return _generateNEARWallet.apply(this, arguments);
}
function _generateNEARWallet() {
    _generateNEARWallet = _async_to_generator(function() {
        var keyPair, publicKey, privateKey, publicKeyBytes, accountId, config, near, wallet;
        return _ts_generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    // Step 1: Generate a new key pair
                    // NEAR uses Ed25519 for its cryptographic operations
                    keyPair = KeyPair.fromRandom('ed25519');
                    // Step 2: Get the public key
                    // The public key will be used as the account identifier
                    publicKey = keyPair.getPublicKey();
                    // Step 3: Get the private key
                    // Keep this secure! Never share your private key
                    privateKey = keyPair.toString();
                    // Step 4: Create an implicit account ID
                    // In NEAR, implicit accounts are derived from the public key
                    publicKeyBytes = Buffer.from(publicKey.toString().split(':')[1], 'base64');
                    accountId = encode(sha256(publicKeyBytes));
                    // Step 5: Connect to NEAR network (testnet in this example)
                    config = {
                        networkId: 'testnet',
                        keyStore: new keyStores.InMemoryKeyStore(),
                        nodeUrl: 'https://rpc.testnet.near.org'
                    };
                    return [
                        4,
                        connect(config)
                    ];
                case 1:
                    near = _state.sent();
                    // Step 6: Create the complete wallet object
                    wallet = {
                        accountId: accountId,
                        publicKey: publicKey.toString(),
                        privateKey: privateKey,
                        network: config.networkId
                    };
                    return [
                        2,
                        wallet
                    ];
            }
        });
    });
    return _generateNEARWallet.apply(this, arguments);
}

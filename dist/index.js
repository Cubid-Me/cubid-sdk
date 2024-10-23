"use strict";
// src/index.js
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CubidWidget = exports.CubidSDK = void 0;
const axios = require('axios');
const cubidWidget_1 = require("./src/component/cubidWidget");
Object.defineProperty(exports, "CubidWidget", { enumerable: true, get: function () { return cubidWidget_1.CubidWidget; } });
class CubidSDK {
    constructor(dapp_id, api_key) {
        this.dapp_id = dapp_id;
        this.api_key = api_key;
        this.baseUrl = 'https://passport.cubid.me/api/v2';
    }
    /**
     * Helper function to make POST HTTP requests.
     * @param {string} endpoint - API endpoint to be called.
     * @param {Object} data - The payload to be sent in the POST request.
     * @returns {Promise<Object>} - The response from the API.
     */
    makePostRequest(endpoint_1) {
        return __awaiter(this, arguments, void 0, function* (endpoint, data = {}) {
            try {
                const response = yield axios({
                    url: `${this.baseUrl}/${endpoint}`,
                    method: 'POST',
                    headers: {
                        'dapp-id': this.dapp_id,
                        'api-key': this.api_key,
                        'Content-Type': 'application/json',
                    },
                    data,
                });
                return response.data;
            }
            catch (error) {
                throw new Error(`API request to ${endpoint} failed: ${error.message}`);
            }
        });
    }
    /**
     * Fetches approximate location data for a user.
     * @param {Object} params - The parameters for the API call.
     * @param {string} params.user_id - The ID of the user.
     * @returns {Promise<Object>} - The approximate location data.
     */
    fetchApproxLocation(_a) {
        return __awaiter(this, arguments, void 0, function* ({ user_id }) {
            return this.makePostRequest('identity/fetch_approx_location', { apikey: this.api_key, user_id });
        });
    }
    /**
     * Fetches exact location data for a user.
     * @param {Object} params - The parameters for the API call.
     * @param {string} params.user_id - The ID of the user.
     * @returns {Promise<Object>} - The exact location data.
     */
    fetchExactLocation(_a) {
        return __awaiter(this, arguments, void 0, function* ({ user_id }) {
            return this.makePostRequest('identity/fetch_exact_location', { apikey: this.api_key, user_id });
        });
    }
    /**
     * Fetches identity data for a user.
     * @param {Object} params - The parameters for the API call.
     * @param {string} params.user_id - The ID of the user.
     * @returns {Promise<Object>} - The identity data.
     */
    fetchIdentity(_a) {
        return __awaiter(this, arguments, void 0, function* ({ user_id }) {
            return this.makePostRequest('identity/fetch_identity', { apikey: this.api_key, user_id });
        });
    }
    /**
     * Fetches rough location data for a user.
     * @param {Object} params - The parameters for the API call.
     * @param {string} params.user_id - The ID of the user.
     * @returns {Promise<Object>} - The rough location data.
     */
    fetchRoughLocation(_a) {
        return __awaiter(this, arguments, void 0, function* ({ user_id }) {
            return this.makePostRequest('identity/fetch_rough_location', { apikey: this.api_key, user_id });
        });
    }
    /**
     * Fetches user data for a user.
     * @param {Object} params - The parameters for the API call.
     * @param {string} params.user_id - The ID of the user.
     * @returns {Promise<Object>} - The user data.
     */
    fetchUserData(_a) {
        return __awaiter(this, arguments, void 0, function* ({ user_id }) {
            return this.makePostRequest('identity/fetch_user_data', { apikey: this.api_key, user_id });
        });
    }
    /**
     * Fetches the score for a user.
     * @param {Object} params - The parameters for the API call.
     * @param {string} params.user_id - The ID of the user.
     * @returns {Promise<Object>} - The score data.
     */
    fetchScore(_a) {
        return __awaiter(this, arguments, void 0, function* ({ user_id }) {
            return this.makePostRequest('score/fetch_score', { apikey: this.api_key, user_id });
        });
    }
    /**
     * Creates a new user in the system.
     * @param {Object} params - The parameters for the API call.
     * @param {string} params.email - The email of the new user.
     * @param {string} params.phone - The phone number of the new user.
     * @returns {Promise<Object>} - The newly created user data.
     */
    createUser(_a) {
        return __awaiter(this, arguments, void 0, function* ({ email, phone }) {
            return this.makePostRequest('create_user', { dapp_id: this.dapp_id, apikey: this.api_key, email, phone });
        });
    }
    /**
 * Saves a secret for a user.
 * @param {Object} params - The parameters for the API call.
 * @param {string} params.user_id - The ID of the user.
 * @param {string} params.secret - The secret to be saved.
 * @returns {Promise<Object>} - The success status of the operation.
 */
    saveSecret(_a) {
        return __awaiter(this, arguments, void 0, function* ({ user_id, secret }) {
            return this.makePostRequest('save_secret', { user_id, api_key: this.api_key, secret });
        });
    }
}
exports.CubidSDK = CubidSDK;

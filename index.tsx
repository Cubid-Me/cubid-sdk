// src/index.js
import axios from 'axios';
export  { CubidWidget } from './src/component/cubidWidget'
export { Provider } from './src/component/providers'

export class CubidSDK {
    dapp_id: any;
    api_key: any;
    baseUrl: string;
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
    async makePostRequest(endpoint, data = {}) {
        try {
            const response = await axios({
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
        } catch (error) {
            throw new Error(`API request to ${endpoint} failed: ${error.message}`);
        }
    }

    /**
     * Fetches approximate location data for a user.
     * @param {Object} params - The parameters for the API call.
     * @param {string} params.user_id - The ID of the user.
     * @returns {Promise<Object>} - The approximate location data.
     */
    async fetchApproxLocation({ user_id }) {
        return this.makePostRequest('identity/fetch_approx_location', { apikey: this.api_key, user_id });
    }

    /**
     * Fetches exact location data for a user.
     * @param {Object} params - The parameters for the API call.
     * @param {string} params.user_id - The ID of the user.
     * @returns {Promise<Object>} - The exact location data.
     */
    async fetchExactLocation({ user_id }) {
        return this.makePostRequest('identity/fetch_exact_location', { apikey: this.api_key, user_id });
    }

    /**
     * Fetches identity data for a user.
     * @param {Object} params - The parameters for the API call.
     * @param {string} params.user_id - The ID of the user.
     * @returns {Promise<Object>} - The identity data.
     */
    async fetchIdentity({ user_id }) {
        return this.makePostRequest('identity/fetch_identity', { apikey: this.api_key, user_id });
    }

    /**
     * Fetches rough location data for a user.
     * @param {Object} params - The parameters for the API call.
     * @param {string} params.user_id - The ID of the user.
     * @returns {Promise<Object>} - The rough location data.
     */
    async fetchRoughLocation({ user_id }) {
        return this.makePostRequest('identity/fetch_rough_location', { apikey: this.api_key, user_id });
    }

    /**
     * Fetches user data for a user.
     * @param {Object} params - The parameters for the API call.
     * @param {string} params.user_id - The ID of the user.
     * @returns {Promise<Object>} - The user data.
     */
    async fetchUserData({ user_id }) {
        return this.makePostRequest('identity/fetch_user_data', { apikey: this.api_key, user_id });
    }

    /**
     * Fetches the score for a user.
     * @param {Object} params - The parameters for the API call.
     * @param {string} params.user_id - The ID of the user.
     * @returns {Promise<Object>} - The score data.
     */
    async fetchScore({ user_id }) {
        return this.makePostRequest('score/fetch_score', { apikey: this.api_key, user_id });
    }

    /**
     * Creates a new user in the system.
     * @param {Object} params - The parameters for the API call.
     * @param {string} params.email - The email of the new user.
     * @param {string} params.phone - The phone number of the new user.
     *  * @param {string} params.evm - The evm address of the new user.
     * @returns {Promise<Object>} - The newly created user data.
     */
    async createUser({ email, phone, evm }) {
        return this.makePostRequest('create_user', { dapp_id: this.dapp_id, apikey: this.api_key, email, phone, evm });
    }

    /**
 * Saves a secret for a user.
 * @param {Object} params - The parameters for the API call.
 * @param {string} params.user_id - The ID of the user.
 * @param {string} params.secret - The secret to be saved.
 * @returns {Promise<Object>} - The success status of the operation.
 */
    async saveSecret({ user_id, secret }) {
        return this.makePostRequest('save_secret', { user_id, api_key: this.api_key, secret });
    }

}
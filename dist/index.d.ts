import { CubidWidget } from './src/component/cubidWidget';
declare class CubidSDK {
    dapp_id: any;
    api_key: any;
    baseUrl: string;
    constructor(dapp_id: any, api_key: any);
    /**
     * Helper function to make POST HTTP requests.
     * @param {string} endpoint - API endpoint to be called.
     * @param {Object} data - The payload to be sent in the POST request.
     * @returns {Promise<Object>} - The response from the API.
     */
    makePostRequest(endpoint: any, data?: {}): Promise<any>;
    /**
     * Fetches approximate location data for a user.
     * @param {Object} params - The parameters for the API call.
     * @param {string} params.user_id - The ID of the user.
     * @returns {Promise<Object>} - The approximate location data.
     */
    fetchApproxLocation({ user_id }: {
        user_id: any;
    }): Promise<any>;
    /**
     * Fetches exact location data for a user.
     * @param {Object} params - The parameters for the API call.
     * @param {string} params.user_id - The ID of the user.
     * @returns {Promise<Object>} - The exact location data.
     */
    fetchExactLocation({ user_id }: {
        user_id: any;
    }): Promise<any>;
    /**
     * Fetches identity data for a user.
     * @param {Object} params - The parameters for the API call.
     * @param {string} params.user_id - The ID of the user.
     * @returns {Promise<Object>} - The identity data.
     */
    fetchIdentity({ user_id }: {
        user_id: any;
    }): Promise<any>;
    /**
     * Fetches rough location data for a user.
     * @param {Object} params - The parameters for the API call.
     * @param {string} params.user_id - The ID of the user.
     * @returns {Promise<Object>} - The rough location data.
     */
    fetchRoughLocation({ user_id }: {
        user_id: any;
    }): Promise<any>;
    /**
     * Fetches user data for a user.
     * @param {Object} params - The parameters for the API call.
     * @param {string} params.user_id - The ID of the user.
     * @returns {Promise<Object>} - The user data.
     */
    fetchUserData({ user_id }: {
        user_id: any;
    }): Promise<any>;
    /**
     * Fetches the score for a user.
     * @param {Object} params - The parameters for the API call.
     * @param {string} params.user_id - The ID of the user.
     * @returns {Promise<Object>} - The score data.
     */
    fetchScore({ user_id }: {
        user_id: any;
    }): Promise<any>;
    /**
     * Creates a new user in the system.
     * @param {Object} params - The parameters for the API call.
     * @param {string} params.email - The email of the new user.
     * @param {string} params.phone - The phone number of the new user.
     * @returns {Promise<Object>} - The newly created user data.
     */
    createUser({ email, phone }: {
        email: any;
        phone: any;
    }): Promise<any>;
    /**
 * Saves a secret for a user.
 * @param {Object} params - The parameters for the API call.
 * @param {string} params.user_id - The ID of the user.
 * @param {string} params.secret - The secret to be saved.
 * @returns {Promise<Object>} - The success status of the operation.
 */
    saveSecret({ user_id, secret }: {
        user_id: any;
        secret: any;
    }): Promise<any>;
}
export { CubidSDK, CubidWidget };

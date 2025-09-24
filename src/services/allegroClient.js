const axios = require('axios');
require('dotenv').config();

const {
    ALLEGRO_CLIENT_ID,
    ALLEGRO_CLIENT_SECRET,
    ALLEGRO_AUTH_BASE_URL,
    ALLEGRO_SANDBOX_BASE_URL
} = process.env;

let accessToken = null;
let tokenExpiry = null;

/**
 * Get Allegro OAuth token (reuse if not expired)
 */
async function getToken() {
    if (accessToken && tokenExpiry && Date.now() < tokenExpiry - 60 * 1000) {
        return accessToken;
    }

    try {
        const basicAuth = Buffer.from(`${ALLEGRO_CLIENT_ID}:${ALLEGRO_CLIENT_SECRET}`).toString('base64');

        const response = await axios.post(
            `${ALLEGRO_AUTH_BASE_URL}/auth/oauth/token?grant_type=client_credentials`,
            null,
            {
                headers: {
                    Authorization: `Basic ${basicAuth}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                    Accept: 'application/json'
                }
            }
        );

        accessToken = response.data.access_token;
        tokenExpiry = Date.now() + response.data.expires_in * 1000;
        return accessToken;
    } catch (err) {
        console.error('Error fetching Allegro token:', err.response?.data || err.message);
        return null;
    }
}

/**
 * Generic API request helper
 */
async function allegroRequest(method, path, data = null, params = null) {
    const token = await getToken();
    if (!token) throw new Error('No access token');

    const url = `${ALLEGRO_SANDBOX_BASE_URL}${path}`;
    const resp = await axios({
        method,
        url,
        headers: {
            Authorization: `Bearer ${token}`,
            'Accept': 'application/vnd.allegro.public.v1+json',
            'Content-Type': 'application/vnd.allegro.public.v1+json'
        },
        data,
        params
    });

    return resp.data;
}

/**
 * Exported functions
 */
module.exports = {
    searchProducts: async (phrase, categoryId) => {
        const params = { phrase, language: 'pl-PL' };
        if (categoryId) params['category.id'] = categoryId;
        return allegroRequest('get', '/sale/products', null, params);
    },

    getProduct: async (productId) => {
        return allegroRequest('get', `/sale/products/${productId}`);
    },

    updateProduct: async (productId, updateData) => {
        return allegroRequest('put', `/sale/products/${productId}`, updateData);
    }
};

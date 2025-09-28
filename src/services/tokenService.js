import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

/**
 * in memory storage for tokens.
 * @type {Object}
 * @property {string|null} access_token 
 * @property {string|null} refresh_token
 * @property {number|null} expires_at 
 */
let tokens = {
    access_token: null,
    refresh_token: null,
    expires_at: null,
};

const basicAuth = Buffer.from(
    `${process.env.ALLEGRO_CLIENT_ID}:${process.env.ALLEGRO_CLIENT_SECRET}`
).toString("base64");

/**
 * store new tokens and calculate expiry time
 * @async
 * @param {Object} newTokens 
 * @param {string} newTokens.access_token 
 * @param {string} newTokens.refresh_token
 * @param {number} newTokens.expires_in 
 */
export async function setTokens(newTokens) {
    tokens.access_token = newTokens.access_token;
    tokens.refresh_token = newTokens.refresh_token;
    tokens.expires_at = Date.now() + newTokens.expires_in * 1000;
}

/**
 * retrieve the current access token.
 * @returns {string|null} 
 */
export function getAccessToken() {
    return tokens.access_token;
}

/**
 * refresh the access token automatically if expired or missing.
 * @async
 * @returns {Promise<string|null>} 
 * @throws {Error} 
 */
export async function refreshAccessTokenIfNeeded() {
    if (!tokens.refresh_token) return null;

    // check if access token is missing or expired
    if (!tokens.access_token || Date.now() >= tokens.expires_at) {
        try {
            const res = await axios.post(
                `${process.env.ALLEGRO_AUTH_BASE_URL}/auth/oauth/token`,
                new URLSearchParams({
                    grant_type: "refresh_token",
                    refresh_token: tokens.refresh_token,
                }),
                {
                    headers: {
                        Authorization: `Basic ${basicAuth}`,
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                }
            );

            await setTokens(res.data);
            console.log("Token refreshed automatically!");
        } catch (err) {
            console.error("Error refreshing token:", err.response?.data || err.message);
            throw err;
        }
    }

    return tokens.access_token;
}

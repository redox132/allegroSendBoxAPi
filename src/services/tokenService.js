import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

let tokens = {
    access_token: null,
    refresh_token: null,
    expires_at: null,
};

const basicAuth = Buffer.from(
    `${process.env.ALLEGRO_CLIENT_ID}:${process.env.ALLEGRO_CLIENT_SECRET}`
).toString("base64");

export async function setTokens(newTokens) {
    tokens.access_token = newTokens.access_token;
    tokens.refresh_token = newTokens.refresh_token;
    tokens.expires_at = Date.now() + newTokens.expires_in * 1000;
}

export function getAccessToken() {
    return tokens.access_token;
}

export async function refreshAccessTokenIfNeeded() {
    if (!tokens.refresh_token) return null;

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
            console.log("✅ Token refreshed automatically!");
        } catch (err) {
            console.error("❌ Error refreshing token:", err.response?.data || err.message);
            throw err;
        }
    }

    return tokens.access_token;
}

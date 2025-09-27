// Get refresh token.js

import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const basicAuth = Buffer.from(
    `${process.env.ALLEGRO_CLIENT_ID}:${process.env.ALLEGRO_CLIENT_SECRET}`
).toString("base64");

async function refreshAccessToken(refreshToken) {
    try {
        const res = await axios.post(
            `${process.env.ALLEGRO_AUTH_BASE_URL}/auth/oauth/token`,
            new URLSearchParams({
                grant_type: "refresh_token",
                refresh_token: refreshToken,
            }),
            {
                headers: {
                    Authorization: `Basic ${basicAuth}`,
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            }
        );

        console.log("✅ Token refreshed!");
        console.log("🔑 New access token:", res.data.access_token);
        console.log("🔄 New refresh token:", res.data.refresh_token);
        console.log("⏰ Expires in:", res.data.expires_in, "seconds");

        return res.data;
    } catch (err) {
        console.error("❌ Error refreshing token:", err.response?.data || err.message);
        return null;
    }
}

// Example usage
refreshAccessToken("eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL2FsbGVncm8ucGwuYWxsZWdyb3NhbmRib3gucGwiLCJ1c2VyX25hbWUiOiIxMDk4ODM2NTkiLCJzY29wZSI6WyJhbGxlZ3JvOmFwaTpvcmRlcnM6cmVhZCIsImFsbGVncm86YXBpOmZ1bGZpbGxtZW50OnJlYWQiLCJhbGxlZ3JvOmFwaTpwcm9maWxlOndyaXRlIiwiYWxsZWdybzphcGk6c2FsZTpvZmZlcnM6d3JpdGUiLCJhbGxlZ3JvOmFwaTpmdWxmaWxsbWVudDp3cml0ZSIsImFsbGVncm86YXBpOmJpbGxpbmc6cmVhZCIsImFsbGVncm86YXBpOmNhbXBhaWducyIsImFsbGVncm86YXBpOmRpc3B1dGVzIiwiYWxsZWdybzphcGk6YWZmaWxpYXRlOndyaXRlIiwiYWxsZWdybzphcGk6YmlkcyIsImFsbGVncm86YXBpOnNoaXBtZW50czp3cml0ZSIsImFsbGVncm86YXBpOnNhbGU6b2ZmZXJzOnJlYWQiLCJhbGxlZ3JvOmFwaTpvcmRlcnM6d3JpdGUiLCJhbGxlZ3JvOmFwaTphZHMiLCJhbGxlZ3JvOmFwaTpwYXltZW50czp3cml0ZSIsImFsbGVncm86YXBpOnNhbGU6c2V0dGluZ3M6d3JpdGUiLCJhbGxlZ3JvOmFwaTpwcm9maWxlOnJlYWQiLCJhbGxlZ3JvOmFwaTphZmZpbGlhdGU6cmVhZCIsImFsbGVncm86YXBpOnJhdGluZ3MiLCJhbGxlZ3JvOmFwaTpzYWxlOnNldHRpbmdzOnJlYWQiLCJhbGxlZ3JvOmFwaTpwYXltZW50czpyZWFkIiwiYWxsZWdybzphcGk6c2hpcG1lbnRzOnJlYWQiLCJhbGxlZ3JvOmFwaTptZXNzYWdpbmciXSwiYXRpIjoiMjIxMWYwNmYtMjk1MS00MjY0LWIwZjYtYTc2YjRmOTllN2Q4IiwiYWxsZWdyb19hcGkiOnRydWUsImV4cCI6MTc2Njc0NzMyNiwiY2xpZW50X2lkIjoiMTM4MjFkOTJkOTU3NDcwZjgyMzBkM2M0MWNkODgwNzYiLCJqdGkiOiIxNzc2NDkxNy1kNmZkLTQ4ZTktODU1OC04MzE1MTk1NTRmYmUifQ.C_HFufi4foPrmT5iaBAa4CEp-LsIasXKb51q1uBh6uPjnIvQqdfHGHqzAppLA-iTHgGDfL-tbOoMRQYDcd0u1G02qwHgmhtZ_z8DYfSLa30lmAKFY0KF2r9cHN_lShxRdkIu5dunN1lZH6Qtm9hPCGJSjeXuiAXGnCIOp3QRoVXnv36Gi_lQbXGFImn-pgHwOuvhdIUCXKrES6w11V_x8586NpMHpSR3hwdIw7VPfHAp0eTom0oBZjzqGdyB4Jt5FwttvEkqcYgAA9wbvg62ijd4R6PcIrbg3hKjgh0wF5aH3ZnGspJfRZJ30sv1_P-JC3ruukzLadaeihQMLbrtgUPOdhJxRU3j-LOjQK7aZNReoRp5VTIrocXnTuu4DIXMuUJv6juPXeEv_GmJzCsX6MxxUP1j7gf-wgs_BHwedbcWkJcVdc-tqS5zqjeqCLPiYsruoaOHKZOqT6z-OrwefBib3HbYehnRcunpjsb2ruzfJCI4JK2pCEvFanbCZEV75dbNRPO7Mlvp1uMz01QxZqysVnBR2_ZfAU1Awk2ILZzGh1nrVUoyuR3Ick7hcVlLVuMaPs_L9XXOZXGcEldSdXe509xIajQhlnC2AAZELEEtn00aNCdjrPi9ho76UX23llXm2EhA9SMj_CcFGOlNsVpqGZ-sryjc0BrIUtUkuV4");

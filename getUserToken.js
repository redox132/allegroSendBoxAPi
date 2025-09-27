// Get user_token.js

import express from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = 3000;

// Step 1: Login URL
app.get("/login", (req, res) => {
    const authUrl = `${process.env.ALLEGRO_AUTH_BASE_URL}/auth/oauth/authorize?response_type=code&client_id=${process.env.ALLEGRO_CLIENT_ID}&redirect_uri=${encodeURIComponent(process.env.ALLEGRO_REDIRECT_URI)}`;
    res.redirect(authUrl);
});

// Step 2: Callback - Allegro redirects here with ?code=...
app.get("/allegro/callback", async (req, res) => {
    const authCode = req.query.code;

    if (!authCode) {
        return res.status(400).send("Missing authorization code");
    }

    const tokenUrl = `${process.env.ALLEGRO_AUTH_BASE_URL}/auth/oauth/token`;
    const basicAuth = Buffer.from(`${process.env.ALLEGRO_CLIENT_ID}:${process.env.ALLEGRO_CLIENT_SECRET}`).toString("base64");

    try {
        const response = await axios.post(
            tokenUrl,
            new URLSearchParams({
                grant_type: "authorization_code",
                code: authCode,
                redirect_uri: process.env.ALLEGRO_REDIRECT_URI,
            }),
            {
                headers: {
                    Authorization: `Basic ${basicAuth}`,
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            }
        );

        // Save tokens in DB/session/etc.
        console.log("Access Token Response:", response.data);
        res.json(response.data);
    } catch (error) {
        console.error("Error fetching token:", error.response?.data || error.message);
        res.status(500).send("Failed to exchange code for token");
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Login with Allegro at: http://localhost:${PORT}/login`);
});

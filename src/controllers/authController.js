import axios from "axios";
import { setTokens } from "../services/tokenService.js";

export async function login(req, res) {
    const authUrl = `${process.env.ALLEGRO_AUTH_BASE_URL}/auth/oauth/authorize?response_type=code&client_id=${process.env.ALLEGRO_CLIENT_ID}&redirect_uri=${encodeURIComponent(process.env.ALLEGRO_REDIRECT_URI)}`;
    res.redirect(authUrl);
}

export async function callback(req, res) {
    const authCode = req.query.code;
    if (!authCode) return res.status(400).send("Missing authorization code");

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

        await setTokens(response.data);
        res.send("✅ Login successful, tokens stored!");
    } catch (err) {
        console.error(err.response?.data || err.message);
        res.status(500).json({ error: "Failed to exchange code for token" });
    }
}

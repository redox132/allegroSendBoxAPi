import axios from "axios";
import { setTokens } from "../services/tokenService.js";
import { query, validationResult } from "express-validator";

/**
 * middleware to validate the presence of the authorization code in query params
 */
export const callbackValidators = [
    query("code").trim().escape().notEmpty().withMessage("Authorization code is required"),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
        next();
    },
];

/**
 * redirects the user to Allegro's authorization page
 * @route GET /login
 */
export async function login(req, res) {
    const authUrl = `${process.env.ALLEGRO_AUTH_BASE_URL}/auth/oauth/authorize?response_type=code&client_id=${process.env.ALLEGRO_CLIENT_ID}&redirect_uri=${encodeURIComponent(process.env.ALLEGRO_REDIRECT_URI)}`;
    res.redirect(authUrl);
}

/**
 * handles Allegro OAuth callback, exchanges authorization code for access/refresh tokens
 * @route GET /allegro/callback
 */
export async function callback(req, res) {
    const authCode = req.query.code;

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
        res.send("Login <b>successful</b>!");
    } catch (err) {
        console.error(err.response?.data || err.message);
        res.status(500).json({ error: "Failed to exchange code for token" });
    }
}

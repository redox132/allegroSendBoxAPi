import express from "express";
import dotenv from "dotenv";
import axios from "axios";
import { setTokens, refreshAccessTokenIfNeeded } from "./allegro/tokenService.js";
import { getOffers, getOfferById, updateOfferById } from "./allegro/allegroApi.js";
import { setupSwagger } from "../setupSwagger.js";

dotenv.config();
const app = express();
const PORT = 3000;

app.use(express.json());

/**
 * @swagger
 * /login:
 *   get:
 *     summary: Redirect user to Allegro login page
 *     tags: [Auth]
 *     responses:
 *       302:
 *         description: Redirects to Allegro OAuth
 */
app.get("/login", (req, res) => {
    const authUrl = `${process.env.ALLEGRO_AUTH_BASE_URL}/auth/oauth/authorize?response_type=code&client_id=${process.env.ALLEGRO_CLIENT_ID}&redirect_uri=${encodeURIComponent(process.env.ALLEGRO_REDIRECT_URI)}`;
    res.redirect(authUrl);
});

/**
 * @swagger
 * /allegro/callback:
 *   get:
 *     summary: OAuth callback to exchange code for tokens
 *     tags: [Auth]
 *     parameters:
 *       - in: query
 *         name: code
 *         schema: { type: string }
 *         required: true
 *         description: Authorization code from Allegro
 *     responses:
 *       200:
 *         description: Login successful
 */
app.get("/allegro/callback", async (req, res) => {
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
        res.status(500).send("Failed to exchange code for token");
    }
});

/**
 * @swagger
 * /offers:
 *   get:
 *     summary: Get all offers
 *     tags: [Offers]
 *     responses:
 *       200:
 *         description: List of offers
 */
app.get("/offers", async (req, res) => {
    try {
        const data = await getOffers();
        res.json(data);
    } catch (err) {
        res.status(500).send("Failed to fetch offers");
    }
});

/**
 * @swagger
 * /offers/{id}:
 *   get:
 *     summary: Get a single offer by ID
 *     tags: [Offers]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema: { type: string }
 *         required: true
 *         description: Offer ID
 *     responses:
 *       200:
 *         description: Offer details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Offer'
 */
app.get("/offers/:id", async (req, res) => {
    try {
        const offer = await getOfferById(req.params.id);
        res.json(offer);
    } catch (err) {
        res.status(err.response?.status || 500).send(err.message);
    }
});

/**
 * @swagger
 * /offers/{id}:
 *   patch:
 *     summary: Update an offer by ID
 *     tags: [Offers]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema: { type: string }
 *         required: true
 *         description: Offer ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Offer'
 *     responses:
 *       200:
 *         description: Updated offer
 */
app.patch("/offers/:id", async (req, res) => {
    try {
        const updatedOffer = await updateOfferById(req.params.id, req.body);
        res.json(updatedOffer);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get("/", (req, res) => {
    res.send("👋 Visit <a href='/login'>Login</a> to authenticate with Allegro.");
});

// Setup Swagger
setupSwagger(app);

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});

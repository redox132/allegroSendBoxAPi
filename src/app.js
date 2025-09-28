import express from "express";
import dotenv from "dotenv";
import { setupSwagger } from "../setupSwagger.js";

import { login, callback, callbackValidators } from "./controllers/authController.js";
import { getAllOffers, getOffer, updateOffer, offerIdValidator, updateOfferValidator } from "./controllers/offerController.js";

import { errorHandler } from "./middlewares/errorHandler.js";
import { apiLimiter } from "./middlewares/rateLimiter.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.set('trust proxy', 1);
app.use(express.json());
app.use(apiLimiter);

// Auth routes
app.get("/login", login);
app.get("/allegro/callback", callbackValidators, callback);

app.get("/offers", getAllOffers);
app.get("/offers/:id", offerIdValidator, getOffer);
app.patch("/offers/:id", offerIdValidator, updateOfferValidator, updateOffer);

app.get("/", (req, res) => {
    res.send("Siema! Visit <a href='/login'>Login</a> to authenticate with Allegro. Or visit https://nontransforming-nell-robustly.ngrok-free.dev for fast testing. Check the API docs at /api-docs");
});

setupSwagger(app);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT} or visit https://nontransforming-nell-robustly.ngrok-free.dev. Check the API docs at /api-docs`);
});

import express from "express";
import dotenv from "dotenv";
import cors from "cors"; 
import { setupSwagger } from "../setupSwagger.js";

import { login, callback, callbackValidators } from "./controllers/authController.js";
import { getAllOffers, getOffer, updateOffer, offerIdValidator, updateOfferValidator } from "./controllers/offerController.js";

import { errorHandler } from "./middlewares/errorHandler.js";
import { apiLimiter } from "./middlewares/rateLimiter.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
    origin: ["http://localhost:3000", "https://nontransforming-nell-robustly.ngrok-free.dev"],
    methods: ["GET", "PATCH"],
    credentials: true
}));

app.set('trust proxy', 1);
app.use(express.json());
app.use(cors()); 
app.use(apiLimiter);

app.get("/api/login", login);
app.get("/allegro/callback", callbackValidators, callback);

app.get("/api/offers", getAllOffers);
app.get("/api/offers/:id", offerIdValidator, getOffer);
app.patch("/api/offers/:id", offerIdValidator, updateOfferValidator, updateOffer);

app.get("/", (req, res) => {
    res.send("Siema! Visit <a href='/api/login'>Login</a> to authenticate with Allegro. Or visit https://nontransforming-nell-robustly.ngrok-free.dev/api/login for fast testing. Check the API docs at /api-docs");
});

setupSwagger(app);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT} or visit https://nontransforming-nell-robustly.ngrok-free.dev. Check the API docs at /api-docs`);
});



export default app;
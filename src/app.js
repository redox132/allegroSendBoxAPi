import express from "express";
import dotenv from "dotenv";
import { setupSwagger } from "../setupSwagger.js";

// Controllers
import { login, callback } from "./controllers/authController.js";
import { getAllOffers, getOffer, updateOffer } from "./controllers/offerController.js";

// Middleware
import { errorHandler } from "./middlewares/errorHandler.js";
import { apiLimiter } from "./middlewares/rateLimiter.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Apply rate limiter to ALL routes
app.use(apiLimiter);

// Auth routes
app.get("/login", login);
app.get("/allegro/callback", callback);

// Offer routes
app.get("/offers", getAllOffers);
app.get("/offers/:id", getOffer);
app.patch("/offers/:id", updateOffer);

// Root
app.get("/", (req, res) => {
    res.send("👋 Visit <a href='/login'>Login</a> to authenticate with Allegro.");
});

// Swagger
setupSwagger(app);

// Error handler (must be last)
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});

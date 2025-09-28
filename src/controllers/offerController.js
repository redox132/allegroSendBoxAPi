import { getOffers, getOfferById, updateOfferById } from "../services/allegroService.js";
import { param, body, validationResult } from "express-validator";

export const offerIdValidator = [
    param("id").trim().escape().notEmpty().withMessage("Offer ID is required"),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
        next();
    },
];

export const updateOfferValidator = [
    body("name").optional().trim().escape(),
    body("sellingMode.price").optional().isNumeric().withMessage("Price must be a number"),
    body("stock.available").optional().isInt({ min: 0 }).withMessage("Stock must be an integer >= 0"),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
        next();
    },
];

export async function getAllOffers(req, res, next) {
    try {
        const data = await getOffers();
        res.json(data);
    } catch (err) {
        next(err);
    }
}

export async function getOffer(req, res, next) {
    try {
        const offer = await getOfferById(req.params.id);
        res.json(offer);
    } catch (err) {
        next(err);
    }
}

export async function updateOffer(req, res, next) {
    try {
        const updatedOffer = await updateOfferById(req.params.id, req.body);
        res.json(updatedOffer);
    } catch (err) {
        next(err);
    }
}

import { getOffers, getOfferById, updateOfferById } from "../services/allegroService.js";
import { param, body, validationResult } from "express-validator";

/**
 * middleware to validate offer ID in route params
 */
export const offerIdValidator = [
    param("id").trim().escape().notEmpty().withMessage("Offer ID is required"),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
        next();
    },
];

/**
 * middleware to validate request body when updating an offer
 */
export const updateOfferValidator = [
    body("name").optional().trim().escape(),

    body("sellingMode.price.amount")
        .optional()
        .isString()
        .withMessage("Price amount must be a string")
        .matches(/^\d+(\.\d{1,2})?$/)
        .withMessage("Price amount must be a valid number format, e.g., '123.45'"),

    body("sellingMode.price.currency")
        .optional()
        .isString()
        .withMessage("Currency must be a string")
        .isLength({ min: 3, max: 3 })
        .withMessage("Currency must be a 3-letter code"),

    body("stock.available")
        .optional()
        .isInt({ min: 0 })
        .withMessage("Stock must be an integer >= 0"),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
        next();
    },
];

/**
 * Get all offers from Allegro API
 * @route GET /offers
 */
export async function getAllOffers(req, res, next) {
    try {
        const data = await getOffers();
        res.json(data);
    } catch (err) {
        next(err);
    }
}

/**
 * get a single offer by ID
 * @route GET /offers/:id
 */
export async function getOffer(req, res, next) {
    try {
        const offer = await getOfferById(req.params.id);
        res.json(offer);
    } catch (err) {
        next(err);
    }
}

/**
 * update an offer by ID
 * @route PATCH /offers/:id
 */
export async function updateOffer(req, res, next) {
    try {
        const updatedOffer = await updateOfferById(req.params.id, req.body);
        res.json(updatedOffer);
    } catch (err) {
        next(err);
    }
}

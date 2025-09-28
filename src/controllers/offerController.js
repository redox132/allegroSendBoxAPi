import { getOffers, getOfferById, updateOfferById } from "../services/allegroService.js";

export async function getAllOffers(req, res, next) {
    try {
        const data = await getOffers();
        res.json(data);
    } catch (err) {
        next(err); // Pass error to middleware
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

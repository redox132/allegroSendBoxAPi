import axios from "axios";
import { refreshAccessTokenIfNeeded } from "./tokenService.js";

/**
 * Fetch all offers from allegro sandbox API
 * @async
 * @returns {Promise<Object>} list of offers returned 
 * @throws {Error} If access token is missing or request fails
 */
export async function getOffers() {
    try {
        const accessToken = await refreshAccessTokenIfNeeded();
        if (!accessToken) throw new Error("No access token available. Make sure to login.");

        const res = await axios.get(`${process.env.ALLEGRO_SANDBOX_BASE_URL}/sale/offers`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                Accept: "application/vnd.allegro.public.v1+json",
            },
        });

        return res.data;
    } catch (err) {
        console.error("Error fetching offers:", err.response?.data || err.message);
        throw err;
    }
}

/**
 * retrieve a single offer by ID from Allegro Sandbox API.
 * @async
 * @param {string} offerId - the ID of the offer to fetch
 * @returns {Promise<Object>} offer details
 * @throws {Error} if access token is missing or request fails
 */
export async function getOfferById(offerId) {
    try {
        const accessToken = await refreshAccessTokenIfNeeded();
        if (!accessToken) throw new Error("No access token available");

        const res = await axios.get(`${process.env.ALLEGRO_SANDBOX_BASE_URL}/sale/product-offers/${offerId}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                Accept: "application/vnd.allegro.public.v1+json",
            },
        });

        return res.data;
    } catch (err) {
        console.error(`Error retrieving offer id: ${offerId}:`, err.response?.data || err.message);
        throw err;
    }
}

/**
 * update an existing offer by ID in Allegro Sandbox API
 * @async
 * @param {string} offerId - the ID of the offer to update
 * @param {Object} updateData - fields to update (name, sellingMode.price, stock.available)
 * @returns {Promise<Object>} updated offer data
 * @throws {Error} if access token is missing, no update data provided, or request fails
 */
export async function updateOfferById(offerId, updateData = {}) {
    try {
        const accessToken = await refreshAccessTokenIfNeeded();
        if (!accessToken) throw new Error("No access token available. Login first.");

        const payload = {};

        if (updateData.name) payload.name = updateData.name;
        if (updateData.sellingMode?.price) payload.sellingMode = { price: updateData.sellingMode.price };
        if (updateData.stock?.available !== undefined) payload.stock = { available: updateData.stock.available };

        if (Object.keys(payload).length === 0) throw new Error("No update data provided");

        const res = await axios.patch(
            `${process.env.ALLEGRO_SANDBOX_BASE_URL}/sale/product-offers/${offerId}`,
            payload,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    Accept: "application/vnd.allegro.public.v1+json",
                    "Content-Type": "application/vnd.allegro.public.v1+json",
                    "Accept-Language": "pl-PL",
                },
            }
        );

        return res.data;
    } catch (err) {
        console.error("Error patching offer:", err.response?.data || err.message);
        if (err.response?.data?.errors) {
            err.response.data.errors.forEach((e, i) => {
                console.log(`Error ${i + 1}: ${e.code} - ${e.message}`);
            });
        }
        throw err;
    }
}

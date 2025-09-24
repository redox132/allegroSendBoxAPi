const express = require('express');
const router = express.Router();
const allegroClient = require('../services/allegroClient');

/**
 * GET /api/products
 * Search Allegro products
 */
router.get('/', async (req, res, next) => {
    try {
        const { phrase = 'powerbank', category } = req.query;
        const result = await allegroClient.searchProducts(phrase, category);

        // Simplify response for front-end
        const items = result.products?.map(p => ({
            id: p.id,
            name: p.name,
            category: p.category?.id,
            parameters: p.parameters,
            images: p.images?.map(img => img.url)
        })) || [];

        res.json(items);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

/**
 * GET /api/products/:productId
 * Get full product details
 */
router.get('/:productId', async (req, res, next) => {
    try {
        const product = await allegroClient.getProduct(req.params.productId);
        res.json(product);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

/**
 * PUT /api/products/:productId
 * Update product (requires Allegro draft)
 */
router.put('/:productId', async (req, res, next) => {
    try {
        const updated = await allegroClient.updateProduct(req.params.productId, req.body);
        res.json(updated);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

module.exports = router;

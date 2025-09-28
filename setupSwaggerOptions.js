// src/config/setupSwaggerOptions.js
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Allegro Offers API",
            version: "1.0.0",
            description: "Express wrapper for Allegro Offers API (get offers, get single offer, update offer)"
        },
        servers: [
            {
                url: "https://nontransforming-nell-robustly.ngrok-free.dev",
                description: "Public ngrok tunnel for testing"
            }
        ],
        components: {
            schemas: {
                Offer: {
                    type: "object",
                    properties: {
                        id: { type: "string", description: "Offer ID" },
                        name: { type: "string", description: "Offer name" },
                        sellingMode: {
                            type: "object",
                            properties: {
                                price: {
                                    type: "object",
                                    properties: {
                                        amount: { type: "string" },
                                        currency: { type: "string" }
                                    }
                                }
                            }
                        },
                        stock: {
                            type: "object",
                            properties: {
                                available: { type: "integer", description: "Available stock quantity" }
                            }
                        }
                    },
                    example: {
                        id: "1234567890",
                        name: "Example Offer",
                        sellingMode: { price: { amount: "100.00", currency: "PLN" } },
                        stock: { available: 5 }
                    }
                }
            },
            responses: {
                400: { description: "Bad request", content: { "application/json": {} } },
                401: { description: "Unauthorized", content: { "application/json": {} } },
                404: { description: "Offer not found", content: { "application/json": {} } }
            },
            securitySchemes: {
                BearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT"
                }
            }
        },
        security: [{ BearerAuth: [] }],
        paths: {
            "/api/offers": {
                get: {
                    summary: "Get all offers",
                    tags: ["Offers"],
                    responses: {
                        200: {
                            description: "List of offers",
                            content: {
                                "application/vnd.allegro.public.v1+json": {
                                    schema: {
                                        type: "array",
                                        items: { $ref: "#/components/schemas/Offer" }
                                    }
                                }
                            }
                        },
                        401: { $ref: "#/components/responses/401" }
                    }
                }
            },
            "/api/offers/{id}": {
                get: {
                    summary: "Get a single offer by ID",
                    tags: ["Offers"],
                    parameters: [
                        {
                            name: "id",
                            in: "path",
                            required: true,
                            schema: { type: "string" },
                            description: "Offer ID"
                        }
                    ],
                    responses: {
                        200: {
                            description: "Offer found",
                            content: {
                                "application/vnd.allegro.public.v1+json": {
                                    schema: { $ref: "#/components/schemas/Offer" }
                                }
                            }
                        },
                        404: { $ref: "#/components/responses/404" }
                    }
                },
                patch: {
                    summary: "Update an offer by ID",
                    tags: ["Offers"],
                    parameters: [
                        {
                            name: "id",
                            in: "path",
                            required: true,
                            schema: { type: "string" },
                            description: "Offer ID"
                        }
                    ],
                    requestBody: {
                        required: true,
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        name: { type: "string" },
                                        sellingMode: {
                                            type: "object",
                                            properties: {
                                                price: {
                                                    type: "object",
                                                    properties: {
                                                        amount: { type: "string" },
                                                        currency: { type: "string" }
                                                    }
                                                }
                                            }
                                        },
                                        stock: {
                                            type: "object",
                                            properties: {
                                                available: { type: "integer" }
                                            }
                                        }
                                    },
                                    example: {
                                        name: "Updated Offer",
                                        sellingMode: { price: { amount: "120.00", currency: "PLN" } },
                                        stock: { available: 10 }
                                    }
                                }
                            }
                        }
                    },
                    responses: {
                        200: {
                            description: "Offer updated successfully",
                            content: {
                                "application/json": {
                                    schema: { $ref: "#/components/schemas/Offer" }
                                }
                            }
                        },
                        400: { $ref: "#/components/responses/400" },
                        404: { $ref: "#/components/responses/404" }
                    }
                }
            }
        }
    },
    apis: []
};

export default options;

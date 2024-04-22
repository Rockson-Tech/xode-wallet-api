// Schema for getting NFTs
export const burn = {
    summary: 'Burn ASTRO token',
    tags: ['Astro Economy Token'],
    description: 'Schema for burning ASTRO token.',
    // Request body schema
    body: {
        type: 'object',
        properties: {
            from: { type: 'string' },
            value: { type: 'number' },
        },
        required: [
            'from',
            'value',
        ],
    },
    // Response schema for success
    response: {
        200: {
            description: 'Success response after burning token.',
            type: 'object',
            properties: {
                status: { type: 'number' },
                message: { type: 'string' },
                data: {
                    type: 'object',
                    properties: {
                        isFinalized: { type: 'boolean' },
                        blockHash: { type: 'string' },
                    },
                },
            },
        },
        // Response schema for unspecified code
        default: {
            description: 'Default response',
            type: 'object',
            properties: {
                status: { type: 'number' },
                message: { type: 'string' },
            },
        }
    },
    security: [
        {
          "apiKey": []
        }
    ]
};
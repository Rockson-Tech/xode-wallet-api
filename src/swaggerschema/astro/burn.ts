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
    // Response schema
    response: {
        200: {
            description: 'Returns hash to be signed and submitted on /chain/extrinsic/submit.',
            type: 'object',
            properties: {
                hash: { type: 'string' },
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
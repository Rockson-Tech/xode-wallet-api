// Schema for getting NFTs
export const transfer = {
    summary: 'Transfer ASTRO token',
    tags: ['Astro Economy Token'],
    description: 'Schema for transferring ASTRO token.',
    // Request body schema
    body: {
        type: 'object',
        properties: {
            to: { type: 'string' },
            value: { type: 'number' },
        },
        required: [
            'to',
            'value',
        ],
    },
    // Response schema for success
    response: {
        200: {
            description: 'Success response after minting token.',
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
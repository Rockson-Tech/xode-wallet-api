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
            from: { type: 'string' },
            value: { type: 'number' },
            token: { type: 'string' },
        },
        required: [
            'to',
            'from',
            'value',
            'token',
        ],
    },
    // Response schema for success
    response: {
        200: {
            description: 'Success response after minting token.',
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
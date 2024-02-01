// Schema for getting NFTs
export const mintEconomy = {
    summary: 'Mint astrochibbi economy token',
    tags: ['AstroChibbi Economy: Send Transaction'],
    description: 'Schema for mint token on astrochibbi economy.',
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
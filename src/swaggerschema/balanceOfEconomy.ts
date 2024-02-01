// Schema for getting NFTs
export const balanceOfEconomy = {
    summary: 'Get astro balance of the account',
    tags: ['AstroChibbi Economy: Send Query'],
    description: 'Schema for getting astro balance of the account.',
    // Request body schema
    params: {
        type: 'object',
        properties: {
            account: { type: 'string' }
        },
        required: [
            'account'
        ],
    },
    // Response schema for success
    response: {
        200: {
            description: 'Success response after getting balance.',
            type: 'object',
            properties: {
                balance: { type: 'string' },
                price: { type: 'string' },
                symbol: { type: 'string' },
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
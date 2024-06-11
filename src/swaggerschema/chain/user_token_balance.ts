// Schema for getting user NFTs
export const user_token_balance = {
    summary: 'Get user balance on each token.',
    tags: ['Chain'],
    description: 'Schema for getting user token balances. ',
    // Request body schema
    params: {
        type: 'object',
        properties: {
            wallet_address: { type: 'string' },
        },
        required: ['wallet_address'],
    },
    // Response schema for success
    response: {
        200: {
            description: 'Succesful response getting balance of each tokens',
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    balance: { type: 'number' },
                    symbol: { type: 'string' },
                    name: {type: 'string' },
                    price: { type: 'string' },
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
};

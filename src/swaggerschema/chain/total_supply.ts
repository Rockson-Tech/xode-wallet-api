// Schema for getting user NFTs
export const total_supply = {
    summary: 'Get total supply.',
    tags: ['Chain'],
    description: 'Schema for getting total supply of tokens. ',
    // Response schema for success
    response: {
        200: {
            description: 'Succesful response getting list of tokens',
            type: 'object',
            properties: {
                totalSupply: { type: 'number' },
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

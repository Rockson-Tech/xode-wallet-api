// Schema for getting user NFTs
export const circulating_supply = {
    summary: 'Get total supply.',
    tags: ['Chain'],
    description: 'Schema for getting circulating supply of tokens. ',
    // Response schema for success
    response: {
        200: {
            description: 'Succesful response getting circulating supply of tokens',
            type: 'object',
            properties: {
                circulatingSupply: { type: 'number' },
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

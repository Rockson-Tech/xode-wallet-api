// Schema for getting NFTs
export const totalSupplyEconomy = {
    summary: 'Get total supply on the economy',
    tags: ['AstroChibbi Economy: Send Query'],
    description: 'Schema for getting total supply of economy.',
    // Request body schema
    params: {
        type: 'object',
        properties: {},
        required: [],
    },
    // Response schema for success
    response: {
        200: {
            description: 'Success response after getting total supply.',
            type: 'object',
            properties: {
                total_supply: { type: 'number' },
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
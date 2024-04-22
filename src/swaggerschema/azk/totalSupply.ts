// Schema for getting NFTs
export const totalSupply = {
    summary: 'Get total supply of AZK token',
    tags: ['Azkal Meme Token'],
    description: 'Schema for getting total supply of AZK token.',
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
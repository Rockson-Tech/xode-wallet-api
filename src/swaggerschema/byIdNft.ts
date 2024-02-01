export const schemaGetNftById = {
    summary: 'Get an NFT by ID',
    tags: ['AstroChibbi NFT: Send Query'],
    description: 'Schema for getting NFT by token ID. ',
    // Request body schema
    params: {
        type: 'object',
        properties: {
            token_id: { type: 'string' },
        },
        required: ['token_id'],
    },
    // Response schema for success
    response: {
        200: {
            description: 'Succesful response getting NFT using token ID',
            type: 'object',
            properties: {
                nftTokenId: { type: 'number' },
                imagePath: { type: 'string' },
                name: { type: 'string' },
                description: { type: 'string' },
                price: { type: 'number' },
                isForSale: { type: 'boolean' },
                isEquipped: { type: 'boolean' },
                category: { type: 'string' },
                collection: { type: 'string' },
                astroType: { type: 'string' },
                rarity: { type: 'string' },
                // stats: { 
                //     type: 'object',
                //     properties: {
                //         rarity: { type: 'number' },
                //         attack: { type: 'number' },
                //         defense: { type: 'number' },
                //         hitpoints: { type: 'number' },
                //         passive1: { 
                //             type: 'object',
                //             properties: { 
                //                 type: { type: 'number' },
                //                 percentage: { type: 'number' },
                //             },
                //         },
                //     }
                // },
                network: { type: 'string' },
                blockchainId: { type: 'string' },
                collectionId: { type: 'string' },
                tokenOwner: { type: 'string' },
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

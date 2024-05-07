// Schema for updating NFT
export const submit_extrinsic = {
    summary: 'Update an NFT',
    tags: ['AstroChibbi NFT'],
    description: 'Schema for updating NFT.',
    // Request body schema
    body: {
        type: 'object',
        properties: {
            extrinsic: { type: 'string' },
        },
        required: [
            'extrinsic',
        ],
    },
    // Response schema for success
    response: {
        200: {
            description: 'Successful response after updating NFT',
            type: 'object',
            properties: {
                status: { type: 'number' },
                message: { type: 'string' },
                data: {
                    type: 'object',
                    properties: {
                        isInBlock: { type: 'boolean' },
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

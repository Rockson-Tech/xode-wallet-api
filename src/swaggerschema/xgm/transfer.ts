// Schema for getting NFTs
export const transfer = {
    summary: 'Transfer XGM token',
    tags: ['XGame Utility Token'],
    description: 'Schema for transferring XGM token.',
    // Request body schema
    body: {
        type: 'object',
        properties: {
            target: { type: 'string' },
            value: { type: 'number' },
        },
        required: [
            'target',
            'value',
        ],
    },
    // Response schema for success
    response: {
        200: {
            description: 'Returns hash to be signed and submitted on /chain/extrinsic/submit.',
            type: 'object',
            properties: {
                hash: { type: 'string' },
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
// Schema for updating NFT
export const submit_extrinsic = {
    summary: 'Submit any signed TX hash to chain',
    tags: ['Chain'],
    description: 'Schema for submitting TX to chain.',
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
            description: 'Successful response after submitting TX',
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

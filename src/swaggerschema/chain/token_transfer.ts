// Schema for getting user NFTs
export const token_transfer = {
    summary: 'Get list of tokens integrated to XODE',
    tags: ['Chain'],
    description: 'Schema for getting list of tokens. ',
    // Request body schema
    body: {
        type: 'object',
        properties: {
            to: { type: 'string' },
            value: { type: 'number' },
        },
        required: ['to', 'value'],
    },
};

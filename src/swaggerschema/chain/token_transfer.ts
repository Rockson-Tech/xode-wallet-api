// Schema for getting user NFTs
export const token_transfer = {
    summary: 'Transfer an XON token that returns TX',
    tags: ['Chain'],
    description: 'Schema for transferring token and return tx to be signed. ',
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

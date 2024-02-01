const path = require('path');

module.exports = {
    mode: 'production',
    entry: './src/repositories/NFTRepository.ts',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.json$/,
                use: 'json-loader',
            },
            { 
                test: /\.txt$/, 
                use: 'raw-loader' 
            }
        ],
    },
};
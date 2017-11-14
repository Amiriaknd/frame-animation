var path = require('path')

module.exports = {
    entry: {
        "index": path.join(__dirname, "src/index.js")
    },
    output: {
        path: path.join(__dirname, 'build'),
        filename: "[name].js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: '/node_modules/',
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['env']
                        }
                    }
                ]
            }
        ]
    }
}
// vue.config.js

module.exports = {
    configureWebpack: {
        module: {
            rules: [{
                test: /\.mtl$/,
                loader: 'mtl-loader'
            },
            {
                test: /\.obj$/,

                // CHANGE HERE
                loader: 'url-loader',

             //   include: '..assets'
            },
            ]
        }
    }
}
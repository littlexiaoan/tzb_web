const {defineConfig} = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    lintOnSave: false,
    devServer: {
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:9999',
                pathRewrite: {"^/api": ""}
                // ws: true,
                // changeOrigin: true
            },
        }
    }
})

const path = require('path')

function resolve(dir){
    return path.join(__dirname,dir)
}

module.exports = {
    chainWebpack: config =>{
        config.resolve.alias
            .set('style',resolve('src/assets/style'))
            .set('font',resolve('src/assets/font'))
            .set('components',resolve('src/components'))
            .set('base',resolve('src/base'))
            .set('views',resolve('src/views'))
            .set('api',resolve('src/api'))
            .set('img',resolve('src/assets/img'))
            .set('store',resolve('src/store'))
            .set('common',resolve('src/common'))
    },
    devServer: {
        proxy: {
            '/api':{
                target: 'http://localhost:3000',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
}
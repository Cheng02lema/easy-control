const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')

//functions 云函数目录
//unpackage/dist  编译输出目录
//因为用到copy-webpack-plugin 插件，所以要 npm install --save-dev copy-webpack-plugin@5.0.0

module.exports = {
    configureWebpack: {
        plugins: [
            new CopyWebpackPlugin([
                {
                    from: path.join(__dirname, 'functions'),
                    to: path.join(__dirname, 'unpackage/dist', process.env.NODE_ENV === 'production' ? 'build' : 'dev', process.env.UNI_PLATFORM, 'functions')
                }
            ])
        ]
    }
}

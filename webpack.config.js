const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin= require("copy-webpack-plugin");
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

let mode = "development";

if( process.env.NODE_ENV === "production"){
    mode = "production";
}
module.exports ={
    mode: mode,

    output: {
        path: path.resolve(__dirname, "dist"),
        assetModuleFilename: "images/[hash][ext][query]"
    },

    module: {
        rules: [
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                type: "asset",
            },
            {
                test: /\.s?css$/i,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {publicPath: "" },
                    }, 
                    "css-loader",
                    "sass-loader",
                ],
                
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                },
            },
        ],
    },

    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin({
            "template": "./src/index.html",
            "filename":"index.html"
        }),
        new HtmlWebpackPlugin({
            "template": "./src/resources.html",
            "filename": "resources.html"
        }),
        new CopyWebpackPlugin({
            "patterns": [".nojekyll",".gitignore"],
            "options": {}
        }),
        new FaviconsWebpackPlugin()
    ],

    devtool: "source-map",
    devServer: {
        hot: true,
        static : "./dist",
    },
};

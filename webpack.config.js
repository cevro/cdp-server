const {TsConfigPathsPlugin} = require('awesome-typescript-loader');

module.exports = {
    devtool: "source-map",
    entry: "./src/index.ts",
    output: {
        filename: "bundle.min.js",
        path: __dirname + "/dist"
    },

    resolve: {
        extensions: [".ts", ".js"],
        plugins: [
            new TsConfigPathsPlugin(/* { configFileName, compiler } */)
        ]
    },
    externals: [
        {
            formidable: 'commonjs formidable',
        },
    ],
    watchOptions: {
        ignored: /node_modules/
    },
    module: {
        rules: [
            /*  {
                  enforce: 'pre',
                  test: /\.ts$/,
                  loader: 'tslint-loader',
                  exclude: /node_modules/,
                  options: {
                      failOnHint: false,
                      configuration: require('../tslint.json')
                  }
              },*/
            {
                test: /\.ts$/,
                use: 'awesome-typescript-loader',
                //use: 'ts-loader',
                exclude: /node_modules/,
            }
        ]
    },
    target: 'node'
    /*  node: {
      //    fs: "empty",
          child_process: "empty"
      },*/
};

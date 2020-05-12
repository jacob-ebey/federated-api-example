const fs = require("fs");
const path = require("path");

const CopyPlugin = require('copy-webpack-plugin');
const ContainerPlugin = require("webpack/lib/container/ContainerPlugin");
const nodeExternals = require("webpack-node-externals");

const routesDir = path.join(process.cwd(), "routes");

const exposes = fs.readdirSync(routesDir).reduce((p, c) => {
    if (c.endsWith(".js")) {
        const name = path.basename(c).slice(0, -3);

        return {
            ...p,
            [name]: path.join(routesDir, c),
        };
    }

    return p;
}, {});

module.exports = {
    entry: "./noop.js",
    target: "async-node",
    optimization: {
        minimize: false,
    },
    performance: {
        hints: false,
    },
    output: {
        libraryTarget: "commonjs2",
    },
    externals: [nodeExternals()],
    plugins: [
        new CopyPlugin([
            { from: 'package.json', to: 'package.json' },
        ]),
        new ContainerPlugin({
            name: "remote-entry",
            library: {
                name: "remote-entry",
                type: "commonjs2"
            },
            exposes
        }),
    ]
};

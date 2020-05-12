const fs = require("fs");
const path = require("path");

const express = require("express");

const routesDir = path.join(process.cwd(), "routes");

const app = express();

const routes = fs.readdirSync(routesDir).reduce((p, c) => {
    if (c.endsWith(".js")) {
        p.push(path.basename(c).slice(0, -3));
    }

    return p;
}, []);

if (routes.length === 0) {
    console.error(`No routes found in: "${routesDir}".`);
    process.exit(1);
}

routes.forEach(route => {
    const middleware = require(path.join(routesDir, route));
    console.log(middleware);
    app.use(`/${route}`, middleware);
});

app.listen(5000, () => {
    console.log(`Dev server started on port ${5000}.`);
});

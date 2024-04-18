require("dotenv").config();
const path = require("path");
const express = require("express");
const http = require("http");
const https = require("https");
const fs = require("fs");

const { NODE_ENV, PORT } = process.env;

console.log(`NODE_ENV, PORT`, NODE_ENV, PORT);



if (NODE_ENV == "production") {
    const app = express();
    const publicPath = path.join(__dirname, "dist/hawk-dashboard");
    // Starting both http & https servers
    app.use(function (request, response, next) {
        console.log("req is secure", request.secure);
        if (!request.secure || request.headers["x-forwarded-proto"] === "http") {
            return response.redirect(
                301,
                "https://" + request.headers.host + request.url
            );
        } else next();
    });

    app.use(express.static(publicPath));
    app.enable("trust proxy");


    app.get("*", (req, res) => {
        res.sendFile(path.join(publicPath, "index.html"));
    });

    const options = {
        key: fs.readFileSync(
            "/etc/letsencrypt/live/app.hawk-technology.com/privkey.pem",
            "utf8"
        ),
        cert: fs.readFileSync(
            "/etc/letsencrypt/live/app.hawk-technology.com/cert.pem",
            "utf8"
        ),
    };

    const httpsServer = https.createServer(options, app);
    const httpServer = http.createServer(app);

    httpsServer.listen(PORT, "0.0.0.0", (err) => {
        if (err) {
            throw err;
        }
        console.log(`https server started @ PORT ${PORT}`);
    });


    httpServer.listen(80, "0.0.0.0", (err) => {
        if (err) {
            throw err;
        }

        console.log(`http server started @ PORT80`);
    });
} else {

    const app = express();
    const publicPath = path.join(__dirname, "dist/hawk-dashboard");

    app.use(express.static(publicPath));
    app.get("*", (req, res) => {
        res.sendFile(path.join(publicPath, "index.html"));
    });

    app.listen(PORT, () => {
        console.log("Server is up!");
    });
}

const express = require("express")
require("./api/db/db")
const path = require("path");
const router = require("./api/routes");
const app = express();
app.set("PORT", 3000);

app.use("/", function(req,res,next) {
    console.log("Req method",req.method, "req url=", req.url);

    next();
})

app.use(express.urlencoded({extended:false}))
app.use(express.json({extended:false}))

app.use(express.static(path.join(__dirname, "public")))
app.use("/node_modules/", express.static(path.join(__dirname, "node_modules")))


app.use("/api", router);

const server = app.listen(app.get("PORT"), function() {
    console.log("server listening on port = ", server.address().port);

})


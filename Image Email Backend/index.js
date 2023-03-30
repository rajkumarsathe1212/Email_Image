let express = require("express");
let bodyparser = require("body-parser");
let mongoose = require("mongoose");

let app = express();
app.use(express.static("assets"));
app.use(bodyparser.json({ limit: '50mb' }));
app.use(bodyparser.urlencoded({ limit: '50mb', extended: true }))
app.use(express.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    if (req.method == "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE");
        return res.status(200).json({});
    }
    next();
});

mongoose.connect("mongodb://127.0.0.1:27017/imageupload");
let db = mongoose.connection;

db.on("error", error => console.log(error));
db.on("open", () => console.log("connection success"));

app.get("/", (req, res) => {
    res.end("Welcome to node js")
})

app.use("/images",require("./routes/images"));

app.listen(8081, () => {
    console.log("API running on http://localhost:8081");
})

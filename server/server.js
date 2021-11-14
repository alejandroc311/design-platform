const cors = require("cors");
const express = require("express");
const app = express();
app.use(cors());
app.use(express.json());
app.options("*", cors());

app.get("/", (req, res) => {
    res.send({ message: '' })
})

app.get('/user', (req, res) => {
    res.send({userid: "1234"});
});

app.post("/mockups", (req, res) => {
    res.json({body: req.body});
});

app.listen(8080, () => {
    console.log('Application listening on port 8080!');
});
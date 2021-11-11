const express = require("express");
const app = express();

app.get('/user/:userid', (req, res) => {
    res.send({ message: 'Hello WWW!' });
});

app.listen(8080, () => {
    console.log('Application listening on port 8080!');
});
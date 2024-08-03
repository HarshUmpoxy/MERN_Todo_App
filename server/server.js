import express from "express";

const app = express();

app.get('/', (req, res) => {
    res.send("<h1>Hello, changes has been made and i tend to work on this app today !!!</h1>");
})

app.listen(3000, () => {
    console.log("App is listening on Port 3000");
})


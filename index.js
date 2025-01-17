// src/index.js
const express = require('express');
const bodyParser = require('body-parser');
const webhookRoutes = require('./routes/webhook');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/webhook', webhookRoutes);

app.get("/test", (req, res) => {
    res.status(200).send("Hello From AutoMoto!");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
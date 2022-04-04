const express = require('express')
const app = express()
const port = 3001

const merchant_model = require('./merchant_model')

app.use(express.json())
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
    next();
});

app.get('/', (req, res) => {
    merchant_model.getMerchants()
        .then(el => {
            res.status(200).send(el)
        })
        .catch(error => {
            res.status(500).send(error);
        })
})

app.post('/editRecord', (req, res) => {
    merchant_model.editRecord(req)
        .then(el => {
            res.status(200).send(el)
            console.log(el)
        })
        .catch(error => {
            console.log(error)
            res.status(500).send(error);
        })
})

app.post('/deleteRecord', (req, res) => {
    merchant_model.deleteRecord(req)
        .then(el => {
            res.status(200).send(el)
        })
        .catch(error => {
            res.status(500).send(error);
        })
})

app.post('/insertRecord', (req, res) => {
    merchant_model.insertRecord(req)
        .then(el => {
            res.status(200).send(el)
        })
        .catch(error => {
            res.status(500).send(error);
        })
})

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})
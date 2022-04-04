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

app.get('/getCompanies', (req, res) => {
    merchant_model.getCompanies()
        .then(el => {
            res.status(200).send(el)
        })
        .catch(error => {
            res.status(500).send(error);
        })
})

app.get('/getCompanyNames', (req, res) => {
    merchant_model.getCompanyNames()
        .then(el => {
            res.status(200).send(el)
        })
        .catch(error => {
            res.status(500).send(error);
        })
})

app.get('/getObjectNames', (req, res) => {
    merchant_model.getObjectNames()
        .then(el => {
            res.status(200).send(el)
        })
        .catch(error => {
            res.status(500).send(error);
        })
})

app.get('/getObjects', (req, res) => {
    merchant_model.getObjects()
        .then(el => {
            res.status(200).send(el)
        })
        .catch(error => {
            res.status(500).send(error);
        })
})

app.get('/getContacts', (req, res) => {
    merchant_model.getContacts()
        .then(el => {
            res.status(200).send(el)
        })
        .catch(error => {
            res.status(500).send(error);
        })
})

app.get('/getYur', (req, res) => {
    merchant_model.getYur()
        .then(el => {
            res.status(200).send(el)
        })
        .catch(error => {
            res.status(500).send(error);
        })
})

app.post('/getCompanyByName', (req, res) => {
    merchant_model.getCompanyByName(req)
        .then(el => {
            res.status(200).send(el)
        })
        .catch(error => {
            res.status(500).send(error);
        })
})

app.post('/getObjectsByCompany', (req, res) => {
    merchant_model.getObjectsByCompany(req)
        .then(el => {
            res.status(200).send(el)
        })
        .catch(error => {
            res.status(500).send(error)
        })
})

app.post('/getContactsByCompany', (req, res) => {
    merchant_model.getContactsByCompany(req)
        .then(el => {
            res.status(200).send(el)
        })
        .catch(error => {
            res.status(500).send(error)
        })
})

app.post('/getYursByCompany', (req, res) => {
    merchant_model.getYursByCompany(req)
        .then(el => {
            res.status(200).send(el)
        })
        .catch(error => {
            res.status(500).send(error)
        })
})

app.post('/getObjectByName', (req, res) => {
    merchant_model.getObjectByName(req)
        .then(el => {
            res.status(200).send(el)
        })
        .catch(error => {
            res.status(500).send(error)
        })
})

app.post('/getContactsByObject', (req, res) => {
    merchant_model.getContactsByObject(req)
        .then(el => {
            res.status(200).send(el)
        })
        .catch(error => {
            res.status(500).send(error)
        })
})

app.post('/getContactByName', (req, res) => {
    merchant_model.getContactByName(req)
        .then(el => {
            res.status(200).send(el)
        })
        .catch(error => {
            res.status(500).send(error)
        })
})

app.post('/getYurByName', (req, res) => {
    merchant_model.getYurByName(req)
        .then(el => {
            res.status(200).send(el)
        })
        .catch(error => {
            res.status(500).send(error)
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
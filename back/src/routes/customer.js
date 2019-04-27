let CustomerModel = require('../models/customer.model');
let express = require('express');
let router = express.Router();

//GET ALL
router.get('/customer', (req, res) => {
    CustomerModel.find((err, data) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true, data: data });
    });
})

// POST - create new customer
router.post('/customer', (req, res) => {
    if(!req.body){
        return res.status(400).send('Request body is missing')
    }
    let model = new CustomerModel(req.body)
    model.save()
        .then(doc => {
            if(!doc || doc.length === 0) {
                return res.status(500).send(doc)
            }
            res.status(201).send(doc)
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

// GET ONE CUSTOMER
router.get('/customer', (req, res) => {
    if(!req.query.email){
        return res.status(400).send('Missing url parameters : email');
    }
    CustomerModel.findOne({
        email: req.query.email
    })
        .then(doc => {
            res.json(doc)
        })
        .catch(err => {
            res.status(500).json(err);
        })
})

// UPDATE
router.put("/customer", (req, res) => {
    if(!req.body){
        return res.status(404).send('Body is missing');
    }
    const { oldEmail, name, email } = req.body;
    CustomerModel.findOneAndUpdate({ email: oldEmail }, {$set: { name: name, email: email }}, (err) => {
            if (err) return res.json({ success: false, error: err });
            return res.json({ success: true });
    });
});

// DELETE
router.delete("/customer", (req, res) => {
    const { email } = req.body;
    CustomerModel.findOneAndRemove({
        email: email
    })
        .then( doc => {
            res.json(doc);
        })
        .catch(err => {
            res.status(500).json(err);
        })
});

module.exports = router;

let express = require('express');
let router = express.Router();

router.get('/person', (req, res) => {
    if(req.query.name){
        res.send(`You have requested ${req.query.name}`);
    }
    else{
        res.send('You have requested a person');
    }
})

router.get('/person/:name', (req, res) => {
    res.send(`You have requested ${req.params.name}`);
})

router.get('/error', (req, res) => {
    throw new Error('This is a forced error');
})

module.exports = router;

let express = require('express');
let app = express();
let personRoute = require('./routes/person');
let customerRoute = require('./routes/customer');
let path = require('path');
let bodyParser = require('body-parser');

const PORT = process.env.PORT || 3001;

// parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/*app.use((req, res, next) => {
    console.log(`${new Date().toString()} => ${req.originalUrl}`, req.body )
    next()
});*/
app.use('/api', personRoute);
app.use('/api', customerRoute);

// Handler for 404
app.use((req, res, next) => {
    res.status(404).send('Miss .. you are lost');
})

// Handler for 500
app.use((err, req, res, next) => {
    console.log(err.stack);
    res.sendFile(path.join(__dirname, '../public/500.html'));
})

app.listen(PORT, () =>
    console.info(`Server lauched on port: ${PORT}`)
)
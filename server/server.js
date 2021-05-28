// need to bring in express
const express = require('express');
const app = express();
// need to bring in body parser
const bodyParser = require('body-parser');
//need to create a port to run on localhost 
const PORT = 5000;
//need to create a router when the client comes the server
const router = require('./routes/list.router');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('server/public'));

//create a route for items on list
app.use('/list', router);

//need to listen for a port 
app.listen(PORT, () => {
    console.log('Listening on PORT:', PORT);
});



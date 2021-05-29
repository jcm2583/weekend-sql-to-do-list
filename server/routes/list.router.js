// bring in express
const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');




// CREATE A GET ROUTE !!!

router.get('/', (req, res) => {
// declare a query text to specify what you want to get from the database
let queryText = `SELECT * FROM "chores" ORDER BY "id";`;

// go get it from the database
pool.query(queryText).then( result => {
// once recieved, send it back to the client
res.send(result.rows);
// create a catch error if there was a problem with the retrieval 
}).catch( err => {
    console.log('There was an error getting the data', err);
    res.sendStatus(500);
});
})























module.exports = router;
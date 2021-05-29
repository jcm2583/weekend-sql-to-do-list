// bring in express
const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');



// CREATE A POST ROUTE !!!

router.post('/', (req, res) => {
//create a console.log to see if any info was received from client
console.log(req.body);
//need to provide instructions to the database on how to store the user input and... SANATIZE!!!
let queryText = `INSERT INTO "chores" ("task", "notes") VALUES ($1, $2);`;

//need to define the user input
let newTask = [req.body.task, req.body.notes];
// user input is safe to be added so let's add it
pool.query(queryText, newTask)
    .then( response => {
        //send status back to the client that their object was added to the database
        res.sendStatus(201);
    }).catch( err => {
        console.log('There was an error posting the info', err);
        res.sendStatus(500);
    });

})






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


// CREATE A DELETE ROUTE
router.delete('/:id', (res, req) => {
    //identify to the database what you want to delete
    let queryText = `DELETE FROM "chores" WHERE "id" = $1;`;
    //create a variable with the client side data to delete
    let deleteTask = req.params.id; 

    //send the delete request to the database
    pool.query(queryText, [deleteTask])
    .then(response => {
        console.log('The following task was deleted', deleteTask);
        res.sendStatus(200);
    }).catch( err => {
        console.log('There was an error', err);
        res.sendStatus(500);
    });
})




















module.exports = router;
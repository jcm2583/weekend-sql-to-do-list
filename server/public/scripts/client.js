
//check that javascript is working 
console.log('JS is working!!!');

$(document).ready( () => {
//make sure that jquery has loaded
console.log('jQuery is working!!!');

getThoseTasks();


});


// Create a GET route to retrieve the information from the database
function getThoseTasks () {
    console.log('In getThoseTasks');
    //use ajax to connect to the server
    $.ajax({
        method: 'GET',
        url: '/list',
    }).then( response => {
        //console log the response to make sure the server sent the requested data
        console.log(response);
        // call on function to put the data received on the DOM
        renderTasks(response);
    }).catch( err => {
        console.log( 'There was an error in the GET', err);
    });
}

// Create a function to append the data on the DOM
function renderTasks (tasks) {
    //empty the DOM
    $('#viewTasks').empty();
    // create a loop to loop through the array 
    for (let task of tasks) {
    // append the data to the DOM
    $('#viewTasks').append(`<tr>
    <td>${task.task}</td>
    <td>${task.notes}</td>
    
    
    
    </tr>`)
    }
}

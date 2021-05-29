
//check that javascript is working 
console.log('JS is working!!!');

$(document).ready( () => {
//make sure that jquery has loaded
console.log('jQuery is working!!!');

//add click listener function
clickListeners();

//render the DOM upon loading the document
getThoseTasks();

});

//create a function for click listeners
function clickListeners () {
    //need a click listener for adding the user input to the server
    $("#submitButton").on('click', addChore);
    //need a click listener for the delete button
    $('#viewTasks').on('click', '.deleteButton', deleteTaskHandler);
    //need a click listener for checking of tasks
    $('#viewTasks').on('click', '.checkoff', checkOffTaskHandler);
}

// create a function that will POST user input to the server
function addChore () {
    console.log('clicker working');
    //create a new object that captures the user input
    let newChoreObject = {
        task: $('#toDoIn').val(),
        notes: $('#notesIn').val()
    }
    console.log(newChoreObject);
    //send new object to the server
    $.ajax({
        method: 'POST',
        url: '/list',
        data: newChoreObject
    }).then( response => {
        console.log('Posted new task to the server. Here is the response', response);
        //clear the input fields
        $('input').val('');
        //re-render the DOM
        getThoseTasks();
    }).catch( err => {
        console.log('The new chore was not added to the server', err);
    });
}






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
    <td><input type="checkbox" class="checkoff" data-id="${task.id}"></td>
    <td><button class="deleteButton" data-id="${task.id}">Remove Task</button></td>
    </tr>`)
    }
}

// need to create a click handler for deleting a task
function deleteTaskHandler () {
    deleteTask($(this).data("id"));
}

// need to create a function to delete task
function deleteTask (taskId) {
    //need to use ajax to communicate to the server
    $.ajax({
        method: 'DELETE',
        url: `/list/${taskId}`
    }).then( response => {
        console.log("The task was successfully deleted");
        //call on function to render the DOM
        getThoseTasks();
    }).catch( err => {
        console.log('There was a problem deleting the task', err);
    });
}

//need to create a click handler to check off chores when complete
function checkOffTaskHandler () {
    checkOffTask($(this).data("id"));
    // $('.checkoff').toggleClass("statusclass");
}

//need to create a function to check off task and send info to the server
function checkOffTask (taskId) {
//need to send the info to the server
$.ajax({
    method: "PUT",
    url: `/list/${taskId}`,
    data: {
        isComplete: true
    }
}).then( response => {
    console.log("The task has been checked off");
    getThoseTasks();
}).catch( err => {
    console.log('There was an issue with the checkmark', err);
});

}
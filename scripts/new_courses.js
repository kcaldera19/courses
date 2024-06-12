"use strict"
window.onload = () => {
    console.log("okay okay")
    //get the create form off the page
    const createCourseForm = document.querySelector("#createCourseForm");

    //listen for the form submission and call createATodo
    createCourseForm.addEventListener("submit", createACourse);
}

const createACourse = async (event) => {

    //call preventDefault to keep the page from reloading
    event.preventDefault();

    //generate a new form data object
    let formData = new FormData(event.target);

    //generate a JavaScript Object from the formData object created above
    let formDataAsObject = Object.fromEntries(formData);


    //try catch for error handling
    try {

        //make a fetch (GET) request to get the comments from the API
        let response = await fetch("http://localhost:8081/api/courses",
            //redundant and not needed for a get request
            {
                method: "POST",
                headers: { "Content-type": "application/json; charset=UTF-8" },
                //take the data from the form and build the body of the request
                body: JSON.stringify(formDataAsObject)
            }
        );

        //turn those comments in to something we can work with
        let newCourse = await response.json();

        //put the comments in the console
        console.log(newCourse);
        window.location = "./index.html"

    } catch (err) {

        //what the hell happend
        console.log("something went south")

    }

}
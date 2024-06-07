"use strict"

window.onload = () => {
    console.log("I work!I work!!")
    populateTable();
}
async function populateTable(){
    // get the cousres from the api
    let courses = await getCourses();

    let tbody = document.querySelector("#courseTableBody")
    // loop over all the courses and work with a single course
    courses.forEach((course)=>{
        
        buildRow(tbody,course)
    })
}

function buildRow (someTableBody,someData){
    
    let row = someTableBody.insertRow();

    let departmentCell = row.insertCell();
    departmentCell.innerHTML = someData.dept;

    let courseNumber = row.insertCell();
    courseNumber.innerHTML = someData.courseNum;

    let courseTitle = row.insertCell();
    courseTitle.innerHTML = someData.courseName;

    let courseDetailCell = row.insertCell();
    courseDetailCell.innerHTML = `<a href="./details.html?courseid=${someData.id}">Show Details</a>`;




}

async function getCourses() {

    try {
        // make the Api call to get all the cousres
        let response = await fetch("http://localhost:8081/api/courses");
        let courses = await response.json();

        return courses;

    } catch (error) {
        console.log(error)
        throw new Error(error)
    }

}
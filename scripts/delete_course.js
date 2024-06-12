"use strict";

window.onload = () => {
    console.log("details is connected");
   
    

    const urlParams = new URLSearchParams(location.search);
    const courseId = urlParams.get("courseid");

    if(courseId){
        displayCourseDetails(courseId);
        const deleteACourse = document.querySelector("#deleteACourseButton");
    deleteACourse.addEventListener("click", (event) => deletetheCourse(event,urlParams.get("courseid")));
        
    } else {
        alert("not valid course id");
        window.location.href = "./index.html";
    }
};

// Method/function to delete a course
// CRUD: (D)elete a course
const deletetheCourse = async (event,courseId) => {
    event.preventDefault();

    try {
        const courseId = event.target.courseId.value;
        const response = await fetch("http://localhost:8081/api/courses/" + courseId, {
            method: "DELETE"
        });

        if(response.ok){
            window.location.href="./index.html";
        }
    } catch (error) {
        console.log("Something went wrong:", error);
    }
};

async function displayCourseDetails(courseId){
    try {
        const courseDetails = await getCourseDetails(courseId);
        console.log(courseDetails);
        
        const courseDetailDiv = document.querySelector("#courseDetails");
        courseDetailDiv.innerHTML = `
            <div>Course ID: ${courseDetails.id}</div>
            <div>Course Name: ${courseDetails.courseName}</div>
            <div>Instructor: ${courseDetails.instructor}</div>
            <div>Days: ${courseDetails.numDays}</div>
        `;
    } catch (error) {
        console.log("Error displaying course details:", error);
    }
}

async function getCourseDetails(courseId){
    try {
        const response = await fetch("http://localhost:8081/api/courses/" + courseId);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log("Error getting course details:", error);
        throw new Error(error);
    }
}

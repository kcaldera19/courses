"use strict"

window.onload =()=>{
    console.log("details is connected");
   


    const urlParams = new URLSearchParams(location.search);
    console.log(urlParams.get("courseid"));

    if(urlParams.has("courseid")){
        displayCourseDetails(urlParams.get("courseid"))
    }else{
        alert("not vaild course id");
        window.location.href="./index.html";
    }
}

async function displayCourseDetails(courseId){
    // get the course details
    let courseDetails = await getCourseDetails(courseId);
    console.log(courseDetails);
    
    let courseDetailDiv = document.querySelector("#courseDetails");
    courseDetailDiv.innerHTML =`<div>courseId:${courseDetails.id}</div>
    <div>course Name:${courseDetails.courseName}</div>
    <div>Instructor:${courseDetails.instructor}</div>
    <div>Days:${courseDetails.numDays}</div>` 
}
async function getCourseDetails(courseId){

    try{
        // use fetch to get the details for the specific course
    let response =await fetch("http://localhost:8081/api/courses/"+courseId);

    let data = await response.json();

    return data;

    }catch (error){
        console.log(error);
        throw new Error(error);
    }

    

}
// Get/initialize name
if (localStorage.getItem('userName') == null) {
    alert("Please login first!")
    location.href = "login.html";

    // let userNameInput = prompt("Please enter your name:", "Stephen");
    // localStorage.setItem('userName', userNameInput);
    // alert("Thanks "+userNameInput+"!");
    // localStorage.setItem('userClasses', null);
}

document.getElementById("welcome").innerHTML += localStorage.getItem('userName') + "!";

// Get the user's classes
var userClasses = localStorage.getItem('classes');

if (userClasses != null) {
    userClasses = JSON.parse(userClasses);
}

// updateHelpBox
function updateHelpBox(name) {
    const courseId = "c" + name.split(":")[0];
    // get user's classes
    var course = JSON.parse(JSON.parse(localStorage.getItem("classes"))[courseId]);

    // populate help box
    //create elements (title/general)
    var classInfoH2 = document.createElement('h2');
    classInfoH2.innerHTML = "Current Class Selected: </br>" + course.courseName;
    var div = document.createElement('div');
    var p1 = document.createElement('p');
    p1.innerHTML = "Units: " + course.units + " units";
    var p2 = document.createElement('p');
    p2.innerHTML = "FCE: " + course.fce;
    var mainTable = document.createElement("table");
    mainTable.classList.add("center");
    var newRow = mainTable.insertRow(0);
    // add class info elements to classInfo
    var classInfo = document.getElementById("class-info");
    classInfo.innerHTML = "";
    classInfo.appendChild(classInfoH2);
    div.appendChild(p1);
    div.appendChild(p2);
    classInfo.appendChild(div);

    // get lecture info
    if (course.section.split("").length == 1) {
        lectureNum = course.section.split("")[0];
    } else {
        var lectureNum = course.section.split("")[0] + course.section.split("")[1];
    }
    var lectureInfo = course.lectures[lectureNum];

    // create cells for table (lecture)
    var lectureCell = newRow.insertCell(0);
    var lectureCellP = document.createElement("p");
    lectureCellP.innerHTML = 
        `
        Lecture Section: ${lectureNum}</br>
        Professor: ${lectureInfo.professor}</br>
        Location: ${lectureInfo.location}</br>
        Times: ${lectureInfo.time}</br>
        `;
    // add lecture elements to classInfo
    lectureCell.appendChild(lectureCellP);

    // create cells for table (recitation, opt.)
    if (course.section.length >= 4) {
        // get recitation Info
        var recitationNum = course.section.split("")[2] + course.section.split("")[3];
        var recitationInfo = course.sections[recitationNum];

        var recitationCell = newRow.insertCell(1);
        var recitationCellP = document.createElement("p");
        recitationCellP.innerHTML = 
            `
            Recitation Section: ${recitationNum}</br>
            Professor: ${recitationInfo.professor}</br>
            Location: ${recitationInfo.location}</br>
            Times: ${recitationInfo.time}</br>
            `;
        // add lecture elements to classInfo
        recitationCell.appendChild(recitationCellP);
        }

    // add buttons(create and appendChild)
    var buttonDiv = document.createElement("div");
    var b1 = document.createElement("button");
    buttonDiv.appendChild(b1);
    b1.innerHTML = "See Grades";

    var b2 = document.createElement("button");
    buttonDiv.appendChild(b2);
    b2.innerHTML = "Change Section";
    // make "Change Section" navigate to class details page
    b2.addEventListener('click', function() {
        localStorage.setItem('selected-class', JSON.stringify(course))
        location.href = "class_details.html";
    });

    var b3 = document.createElement("button");
    b3.innerHTML = "Drop Class";
    buttonDiv.appendChild(b3);
    // make "Drop Class" drop the class
    b3.addEventListener('click', function() {
        var dropBool = confirm("Are you sure to you want to drop this class?");
        if (dropBool) {
            // open/parse user's classes and delete the course
            var usersClasses = JSON.parse(localStorage.getItem('classes'));
            delete usersClasses[courseId];
            localStorage.setItem('classes',JSON.stringify(usersClasses));
            alert(course.courseName + " has been successfully removed.");
            location.href = "index.html";
        };
    });

    // add mainTable/buttons to classInfo 
    classInfo.appendChild(mainTable);
    classInfo.appendChild(buttonDiv);
}

var scheduleTable = document.getElementById('schedule-table');

// iterate through classes and add them to the schedule
if (userClasses != null) {
    for (i=0; i < Object.keys(userClasses).length; i++) {
        var userClassesKey = Object.keys(userClasses)[i];
        // Get class
        var classObjJSON = userClasses[userClassesKey];
        var classObj = JSON.parse(classObjJSON);
    
        // Create row + 2 cells for class entry
        var newRow = scheduleTable.insertRow(-1);
        var nameCell = newRow.insertCell(0);
        var infoCell = newRow.insertCell(1);
    
        // give row click highlighting
        newRow.onclick = function(event) {
            // clear selection of anything on the table
            for (const row of scheduleTable.rows) {
                row.setAttribute("aria-selected", "false");
            }
    
            // make it selected
            event.target.parentElement.setAttribute("aria-selected", "true")
    
            // change help box
            updateHelpBox(event.target.innerHTML);
        };
    
        // Add content to the row
        nameCell.innerHTML = classObj.number + ": " + classObj.courseName;
        infoCell.innerHTML = "More Info";
    
    
        // Add attribute (i.e. make row not selected)
        newRow.setAttribute("aria-selected", "false");
    };
}

// index.js: Buttons
document.getElementById('add-class-button').onclick = function() {
    location.href = "course_database.html";
}
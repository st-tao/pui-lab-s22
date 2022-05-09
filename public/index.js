function Class(number, courseName, units, fce, lectures, sections) {
    this.number = number;
    this.courseName = courseName;
    this.units = units;
    this.fce = fce;
    this.lectures = lectures;
    this.sections = sections;
}

// Class database Object

const classes = {};

// Add example classes to class obj
classes.c05430 = Class(05430, "Programming Usable Interfaces", 15, 10.4,
    {
        L1: {
            "professor": "Scott Hudson",
            "location": "NSH 1305",
            "time": "MW 08:35AM - 09:55AM"
        }
    },

    {
        A1: {
            "professor": "Scott Hudson",
            "location": "PH 226A",
            "time": "M 10:10AM - 11:30AM",
        },

        B1: {
            "professor": "Scott Hudson",
            "location": "WEH 5415",
            "time": "M 10:10AM - 11:30AM",
        },
    },
);

classes.c70311 = Class(70311, "Organizational Behavior", 9, 6.9,
    {
        A: {
            "professor": "Hahl",
            "location": "TEP 3801",
            "time": "TR 11:50AM - 01:10PM"
        },

        B: {
            "professor": "Tomprou",
            "location": "TEP 2700",
            "time": "TR 01:25PM - 02:45PM"
        },

        C: {
            "professor": "Tomprou",
            "location": "TEP 2700",
            "time": "TR 03:05PM - 04:25PM"
        },
    },
    null,

);

classes.c73103 = Class(73103, "Principles of Macroeconomics", 9, 6.8,
    {
        L1: {
            "professor": "Ariel Zetlin-Jones",
            "location": "CUC McConomy",
            "time": "MW 12:20PM - 01:10PM"
        },

        L2: {
            "professor": "Ariel Zetlin-Jones",
            "location": "CUC McConomy",
            "time": "MW 01:25PM - 02:15PM"
        },
    },
    null,
);

classes.c73103 = Class(73103, "Optimization For Business", 9, 6.4,
    {
        L1: {
            "professor": "Ben Moseley",
            "location": "TEP 2613",
            "time": "MW 11:50AM - 01:10PM"
        },

        L2: {
            "professor": "Ben Moseley",
            "location": "TEP 2613",
            "time": "MW 01:25PM - 02:15PM"
        },
    },

    {
        A1: {
            "professor": "Ben Moseley",
            "location": "TEP 2611",
            "time": "F 12:20PM - 01:10PM",
        },

        B1: {
            "professor": "Ben Moseley",
            "location": "TEP 2702",
            "time": "F 12:20PM - 01:10PM",
        },

        C1: {
            "professor": "Ben Moseley",
            "location": "TEP 3808",
            "time": "F 12:20PM - 01:10PM",
        },

        D2: {
            "professor": "Ben Moseley",
            "location": "TEP 2610",
            "time": "F 01:25PM - 02:15PM",
        },

        E2: {
            "professor": "Ben Moseley",
            "location": "TEP 2701",
            "time": "F 01:25PM - 02:15PM",
        },

        F2: {
            "professor": "Ben Moseley",
            "location": "TEP 2612",
            "time": "F 01:25PM - 02:15PM",
        },
    },
);


// Get/initialize name
if (localStorage.getItem('userName') == null) {
    let userNameInput = prompt("Please enter your name:", "Stephen");
    localStorage.setItem('userName', userNameInput);
    alert("Thanks "+userNameInput+"!")
    localStorage.setItem('classes', null)
}

// Get classes an/or initialize user classes
if (localStorage.getItem('userClasses') != null) {
    var userClasses = JSON.parse(localStorage.getItem('userClasses'));
} else {
    var userClasses = [];
}

var scheduleTable = document.getElementById('schedule-body');

// iterate through classes and add them to the schedule
for (i = 0; i < userClasses.length; i++) {
    // Get class
    var classObj = userClasses[i];

    // Create row + 2 cells for class entry
    var newRow = scheduleTable.insertRow();
    var nameCell = scheduleTable.insertCell();
    var unitsCell = scheduleTable.insertCell();

    // Create text objects to add to table
    var nameCellText = document.createTextNode(classObj.courseName);
    var unitsCellText = document.createTextNode(classObj.units + " (FCE: " + classObj.FCE +")");

    // Add text objects to the table
    nameCell.appendChild(nameCellText);
    unitsCell.appendChild(unitsCellText);

    // Add attribute (i.e. make row not selected)
    newRow.setAttribute("aria-selected", "false");
}



function AddClass(courseNum) {
    const key = "c" + courseNum;
    const classObj = classes[key];
    if (classObj != null) {
        userClasses.push(classObj);
        localStorage.setItem("classes", JSON.stringify(userClasses));
    }
}

console.log(localStorage)

// index.js: Buttons
document.getElementById('add-class-button').onclick = function() {
    location.href = "course_database.html"
}
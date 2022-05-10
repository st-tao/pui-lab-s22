function Class(number, courseName, units, fce, lectures, sections) {
    this.number = number;
    this.courseName = courseName;
    this.units = units;
    this.fce = fce;
    this.lectures = lectures;
    this.sections = sections;
};

// Class database Object

const classes = {};

// Add example classes to class obj
classes.c05430 = new Class('05430', "Programming Usable Interfaces", 15, 10.4,
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

classes.c70311 = new Class('70311', "Organizational Behavior", 9, 6.9,
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

classes.c73103 = new Class('73103', "Principles of Macroeconomics", 9, 6.8,
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

classes.c70257 = new Class('70257', "Optimization For Business", 9, 6.4,
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

const infoButtons = document.getElementsByClassName('info-button');

for (i=0; i < infoButtons.length; i++) {
    var currInfoButton = infoButtons[i];
    currInfoButton.addEventListener('click', function(event) {
        // get class info and store in localStorage
        var selectedClass = classes[event.target.id];
        localStorage.setItem('selected-class', JSON.stringify(selectedClass));
        // send to class details page
        location.href = 'class_details.html';
    });
}
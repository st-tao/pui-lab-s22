function formatUnits(units, fce) {
    return units + " units (FCE: " + fce + ")";
}

function AddCourse(course) {
    // add chosen section to course attributes
    course.section = localStorage.getItem('selected-section-value');

    var userClassesList = JSON.parse(localStorage.getItem('classes'));
    // if classes have been added, add to list

    // turn userClassesList into obj if not an object already
    if (userClassesList == null) {
        userClassesList = {};
    }
    // add new class to userClassesList
    userClassesList["c" + course.number] = JSON.stringify(course);

    // update classes
    localStorage.setItem("classes", JSON.stringify(userClassesList));
}

// get course

const course = JSON.parse(localStorage.getItem('selected-class'));

// add data to webpage
document.getElementById('course-title').innerHTML += course.courseName;
document.getElementById('course-units').innerHTML = formatUnits(course.units, course.fce);
document.getElementById('course-description').innerHTML += 
`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam eleifend, augue eget molestie laoreet, 
purus ipsum fringilla elit, vel faucibus orci libero mattis quam. Pellentesque volutpat sem vel lacus pulvinar rutrum. 
Vivamus varius quam id nunc pulvinar sodales. In iaculis dolor id congue tristique. Sed semper eros velit, 
in aliquet risus aliquet nec. In eget mattis lorem, interdum rutrum lectus. In hac habitasse platea dictumst. 
Nam lorem dolor, maximus et semper quis, laoreet in nisi.`;
var courseSectionsOffered = document.getElementById('course-sections-offered');

var courseSections = document.createElement('form');
courseSections.setAttribute('id','course-sections-form')
const header = document.createElement('h2');
const headerText = document.createTextNode("Sections (Offered Spring 2022)");
// add elements to "courseSections" form
header.appendChild(headerText);
courseSections.appendChild(header);

// add submit button
var submit = document.createElement('button');
submit.setAttribute('type', 'button');
submit.setAttribute('id', 'submit-button');
submit.setAttribute('disabled','');

// Add Submit Button Text
var submitText = document.createTextNode("Select Section to Add Course");

const currClasses = JSON.parse(localStorage.getItem('classes'));
for (i=0; i < Object.keys(course.lectures).length; i++) {
    var lectureName = Object.keys(course.lectures)[i];
    // create lecture header part
    var lecture = course.lectures[lectureName];

    // separate for classes with/without recitations
    // for classes with recitations
    if (course.sections != null) {
        // create lecture beginning paragraphs
        var p = document.createElement('p');
        var pText = document.createTextNode(lecture.professor + ", " + lecture.location + ", " + lecture.time);
        p.appendChild(pText);
        courseSections.appendChild(p);

        // iterate through "sections" Object's keys
        for (j=0; j < Object.keys(course.sections).length; j++) {
            var sectionName = Object.keys(course.sections)[j];
            // check if section number is the same as the lecture number
            var sectionNum = sectionName.split("")[1];
            var lectureNum = lectureName.split("")[1];
            if (sectionNum != lectureNum) { continue; }

            // create elements for form and set attributes
            var section = course.sections[sectionName];
            var input = document.createElement('input');
            input.setAttribute('type', 'radio');
            input.setAttribute('name', 'radio-sections');
            input.setAttribute('id', "section" + sectionName);
            input.setAttribute('value', lectureName + sectionName)

            // validate in case class has already been added
            // if [can be looked up in current classes] and [matching section]

            // see if the current course is equivalent in value to current input radio buttion
            if ((currClasses != null) && (currClasses["c" + course.number] != null) && (JSON.parse(currClasses["c" + course.number])["section"] == lectureName + sectionName)) {
                input.checked = true;
                submit.disabled = false;
                submitText = document.createTextNode("Update " + course.number + " with section " + lectureName + sectionName)
            }

            var label = document.createElement('label');
            label.setAttribute('for', 'section' + sectionName);
            var labelText = document.createTextNode(section.professor + ", " + section.location + ", " + section.time);
            label.appendChild(labelText);

            const br = document.createElement('br');

            // add elements to "courseSections" form
            courseSections.appendChild(input);
            courseSections.appendChild(label);
            courseSections.appendChild(br);
        };
    } else {
        // make the lectures the input elements (instead of paragraph elements)
        // create elements for form and set attributes
        var input = document.createElement('input');
        input.setAttribute('type', 'radio');
        input.setAttribute('name', 'radio-sections');
        input.setAttribute('id', "section" + lectureName);
        input.setAttribute('value', lectureName);

         // see if the current course is equivalent in value to current input radio buttion
        if ((currClasses != null) && (currClasses["c" + course.number] != null) && (JSON.parse(currClasses["c" + course.number])["section"] == lectureName)) {
            input.checked = true;
            submit.disabled = false;
            submitText = document.createTextNode("Update " + course.number + " with lecture " + lectureName)
        }

        var label = document.createElement('label');
        label.setAttribute('for', 'section' + lectureName);
        var labelText = document.createTextNode(lecture.professor + ", " + lecture.location + ", " + lecture.time);
        label.appendChild(labelText);

        const br = document.createElement('br');

        // add elements to "courseSections" form
        courseSections.appendChild(input);
        courseSections.appendChild(label);
        courseSections.appendChild(br);
        
    }
};

// add final text/submit utton to courseSections
submit.appendChild(submitText);
courseSections.appendChild(submit);

// add event listener to activate button when radio button is selected
submit.addEventListener('click', function() {
    AddCourse(course);
    location.href = 'index.html';
});
courseSectionsOffered.appendChild(courseSections);

// add onclick event listener for updating selected section and submit button
var form = document.getElementById('course-sections-form');
form.addEventListener('click', function(event) {
    if (event.target && event.target.name == 'radio-sections') {
        var submitButton = document.getElementById('submit-button');
        submitButton.disabled = false;

        // same if code as above
        submitButton.innerHTML = "add " + course.number + " " + event.target.id.replace("section","") + " to your schedule";
        localStorage.setItem("selected-section-value", event.target.value);
    }
})

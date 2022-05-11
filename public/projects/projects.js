$(document).ready(function(){
    // project Table of Contents side bar: scroll fade-in effect function
    var myScrollFunc = function() {
        var opacity = 0;
        let threshhold = 800;
        if (window.scrollY >= threshhold) {
            let fadeDistance = 100;
            opacity = Math.min(1, (window.scrollY-threshhold)/fadeDistance);
            projectTOC.classList.remove('d-none')
            projectTOC.classList.add('d-block')
        } else {
            opacity = 0;
            projectTOC.classList.remove('d-block')
            projectTOC.classList.add('d-none')
        }
        projectTOC.style.opacity = opacity;
    };

    projectTOC = document.getElementById("Project-TOC");
    // call in case user doesn't start at top of page
    myScrollFunc();
    window.addEventListener("scroll", myScrollFunc);
});
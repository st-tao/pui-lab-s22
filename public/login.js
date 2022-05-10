var submitButton = document.getElementById('login-submit');
submitButton.onclick = function() {
    if (document.getElementById('user-name').value == "") {
        alert("Please type in a name!")
    } else if (document.getElementById('user-email').value == "") {
        alert("Please type in your email!")
    } else if (document.getElementById('user-pwd').value == "") {
        alert("Please type in your password!")
    } else {
        var userName = document.getElementById('user-name').value;
        localStorage.setItem('userName', userName);
        location.href = "index.html";
    }
};
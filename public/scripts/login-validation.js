document.getElementById('login-form').onsubmit = validate;

function validate() {
    clearErrors();
    let isValid = true;

    let email = document.getElementById('email').value.trim();
    if (email === "") {
        document.getElementById('err-email').style.display = "block";
        isValid = false;
    }

    let password = document.getElementById('password').value.trim();
    if (password === "") {
        document.getElementById('err-password').style.display = "block";
        isValid = false;
    }
    
    console.log(isValid);
    return isValid;
}

function clearErrors() {
    let errors = document.getElementsByClassName('err');
    for(let i = 0; i < errors.length; i++) {
        errors[i].style.display = "none";
    }
}
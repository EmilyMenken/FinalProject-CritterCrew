document.getElementById('account-form').onsubmit = validate;

function validate() {
    clearErrors();
    let isValid = true;
    
    console.log("Validating new account...");

    let fname = document.getElementsById('fname').value.trim();
    if (fname === "") {
        document.getElementById('err-fname').style.display = "block";
        isValid = false;
    }

    let lname = document.getElementById('lname').value.trim();
    if (lname === "") {
        document.getElementById('err-lname').style.display = "block";
        isValid = false;
    }

    let email = document.getElementById('email').value.trim();
    if (email === "" ||
        email.indexOf("@") === -1 ||
        email.indexOf(".") === -1) {
        document.getElementById('email').style.display = "block";
        isValid = false;
    }
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions
    // https://digitalfortress.tech/tips/top-15-commonly-used-regex/
    // https://www.w3schools.com/jsref/jsref_obj_regexp.asp
    let password = document.getElementById('password').value.trim();
    let minLength = /^[\s\S]{5,}$/,
    upper = /[A-Z]/,
    lower = /[a-z]/,
    number = /[0-9]/,
    special = /[^A-Za-z0-9]/

    if (password === "" ||
        !minLength.test(password) ||
        !upper.test(password) ||
        !lower.test(password) ||
        !number.test(password) ||
        !special.test(password)) {
            document.getElementById('err-password').style.display = "block";
            isValid = false;
    }

    let phone = document.getElementById('phone').value.trim();
    let validPhone = /^\d{10}$/
    if (phone === "" ||
        !validPhone.test(phone)) {
            document.getElementById('err-phone').style.display = 'block';
            isValid = false;
    }
    
    let street_address = document.getElementById('street_address').value.trim();
    if (street_address === "") {
        document.getElementById('err-address').style.display = 'block';
        isValid = false;
    }

    let city = document.getElementById('city').value.trim();
    if (city === "") {
        document.getElementById('err-city').style.display = "block";
        isValid = false;
    }

    let currentState = document.getElementById('state').value
    if (currentState === "select") {
        document.getElementById('err-state').style.display = "block";
        isValid = false;
    }

    let zip_code = document.getElementById('zip_code').value.trim();
    let validZipCode = /^[0-9]{5}$/
    if (zip_code === "" ||
        !validZipCode.test(zip_code)){
            document.getElementById('err-zip_code').style.display = "block";
            isValid = false;
        }
    
    return isValid;
}

function clearErrors() {
    let errors = document.getElementsByClassName('err');
    for(let i = 0; i < errors.length; i++) {
        errors[i].style.display = "none";
    }
}
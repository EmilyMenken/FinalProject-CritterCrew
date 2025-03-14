function loginValidation() {
    clearErrors();
    let isValid = true;
    
    return isValid;
}

function newAccountValidation() {
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
    let validPhone = /^\d{3}-?\d{3}-?\d{4}$/
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

function newAppointmentValidation() {
    clearErrors();
    let isValid = true;

    console.log("Validating new appointment...");

    //+TODO: validation

    // pull in the form date and set it to a javascript dateTime object
    let datetimeInput = document.getElementById("datetime").value;
    let appointmentDateTime = new Date(datetimeInput);

    // set the earliest available date at tomorrow @ 9am (pretend business hours)
    const tomorrow = new Date();
    tomorrow.setDate(now.getDate() + 1);

    if (appointmentDateTime < tomorrow) {
        document.getElementById('err-datetime').style.display = "block";
        isValid = false;
    }

    let pname = document.getElementById("pname").value;
    if (pname === "") {
        document.getElementById('err-pname').style.display = "block";
        isValid = false;
    }

    let petTypeButtons = document.getElementsByName("petType");
    let count = 0;
    for(let i=0; i<petTypeButtons.length; i++) {
        if (petTypeButtons[i].checked) {
            count++;
        }
    }

    if (count === 0) {
        document.getElementById('err-petType').style.display = "block";
        isValid = false;
    }

    let serviceType = document.getElementById('serviceType').value;
    if (serviceType === "select") {
        document.getElementById('err-service').style.display = "block";
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

let loginForm = document.getElementById("login-form");
if (loginForm) {
    loginForm.onsubmit = loginValidation;
}
let accountForm = document.getElementById("account-form");
if (accountForm) {
    accountForm.onsubmit = newAccountValidation;
}
let appointmentForm = document.getElementById("appointment-form");
if (appointmentForm) {
    const today = new Date();
    today.setDate(today.getDate() + 1);
    const tomorrow = today.toISOString().split('T')[0];
    const dp = document.getElementById('date');
    dp.setAttribute('min', tomorrow);
    appointmentForm.onsubmit = newAppointmentValidation;
}


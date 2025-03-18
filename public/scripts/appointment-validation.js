minmumdate = new Date()
document.getElementById('appointment-form').onsubmit = validate;

function validate() {
    clearErrors();
    let isValid = true;

    console.log("Validating new appointment...");

    //+TODO: validation

    // // pull in the form date and set it to a javascript dateTime object
    // let datetimeInput = document.getElementById("datetime").value;
    

    // // set the earliest available date at tomorrow @ 9am (pretend business hours)
    // const tomorrow = new Date();
    // tomorrow.setDate(now.getDate() + 1);

    // if (Date.parse(datetimeInput) < Date.parse(datetimeInput)) {
    //     document.getElementById('err-datetime').style.display = "block";
    //     isValid = false;
    // }

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
minmumdate = new Date()
document.getElementById('appt-form').onsubmit = validate;

function validate() {
    clearErrors();
    let isValid = true;

    console.log("Validating new appointment...");

    let today = new Date();
    today.setHours(0, 0, 0, 0);    
    let dateInput = document.getElementById("datetime").value;
    date = new Date(dateInput);

    //if (today <= date || (date.getHours() < 9 || date.getHours() > 21)
    if (date.getHours() < 9 || date.getHours() > 21 || date.getDate() <= today.getDate()) {
        document.getElementById('err-datetime').style.display = "block";
        // document.getElementById('err-datetime').innerHTML = date.getHours() + " date:" + date.getDate() + " today:" + today.getDate();
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
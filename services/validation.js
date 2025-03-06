export function validateNewUser(data) {
    // Store all the validation errors in an array
    const errors = [ ];
    
    // Validate first name
    if (!data.fname || data.fname.trim() === "") {
        errors.push("First name is required");
    }

    // Validate last name
    if (!data.lname || data.lname.trim() === "") {
        errors.push("Last name is required");
    }

    // Validate email
    if (!data.email || data.email.trim() === "" || 
        data.email.indexOf("@") === -1 ||
        data.email.indexOf(".") === -1) {
        errors.push("Email is required and must be valid");
    }
    
    // TODO: Validate password
    // Must include capital, lowercase, 1 symbol
    // https://www.oreilly.com/library/view/regular-expressions-cookbook/9781449327453/ch04s19.html
    var password = data.password.trim();
    
    var minMaxLength = /^[\s\S] {8, 32} $/,
        upper = /[A=Z]/,
        lower = /[a-z]/,
        number = /[0-9]/,
        special = /[^A-Za-z0-9]/,
        count = 0;
    
    if (minMaxLength.test(password)) {
        if (upper.test(password)) count++;
        if (lower.test(password)) count++;
        if (number.test(password)) count++;
        if (special.test(password)) count++;
    }

    if (count != 4) {
        errors.push("The password must be 8-32 characters long and needs 1 uppercase letter (A-Z), 1 lowercase letter (A-Z), 1 digit (0-9), and 1 special character (~!@#$%^&*()_+`-={}[]\\|;:'\").,<>/?");
    }

    // TODO: Validate street_address
    // must not be blank

    // TODO: Validate city
    // must not be blank

    // TODO: Validate state
    // 2 letters from list of states

    // TODO: Validate zip_code
    // 5 numbers

    return {
        isValid: errors.length === 0,
        errors
    }
}

// TODO: Validate new appointment
export function validateNewAppointment(data) {
    const errors = [];

    //TODO: Validate appt date
    // appt_date datetime
    // This needs to be converted to the Database format
    // Appointment date should be after today's date+time

    //TODO: validate pet name
    if (!data.fname || data.fname.trim() === "") {
        errors.push("Pet name is required");
    }

    //TODO: Validate pet type
    // will depend on form fields (dropdown?)
    // pettype varchar(255),

    //TODO: validate service
    // service varchar(255),

    //TODO: validate friendly
    // friendly boolean default false
    // Since there is a default this isn't required, but should be either 0 or 1


    //TODO: validate UID?
    // this should be pulling automatically from the DB but it might be appropriate to do a query just in case since it's a foreign key
    // foreign key (uid) references users(uid)
    // might be better to do the validation in the main function for the async

}
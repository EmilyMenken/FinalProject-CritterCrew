export function validateNewUser(data) {
    // Store all the validation errors in an array
    const errors = [ ];
    
    // Validate first name
    if (!data.fname || data.fname.trim() === "") {
        errors.push("First name is required");
    }

    // // Validate last name
    if (!data.lname || data.lname.trim() === "") {
        errors.push("Last name is required");
    }

    // Validate email
    if (!data.email || data.email.trim() === "" || 
        data.email.indexOf("@") === -1 ||
        data.email.indexOf(".") === -1) {
        errors.push("Email is required and must be valid");
    }
    
    // +TODO: Validate password
    // Must include capital, lowercase, 1 symbol
    // https://www.oreilly.com/library/view/regular-expressions-cookbook/9781449327453/ch04s19.html
    let password = data.password;
    
    //console.log(password);
    let minLength = /^[\s\S]{5,}$/,
        upper = /[A-Z]/,
        lower = /[a-z]/,
        number = /[0-9]/,
        special = /[^A-Za-z0-9]/,
        count = 0;
    
    if ( !minLength.test(password) ||
        !upper.test(password) ||
        !lower.test(password) ||
        !number.test(password) ||
        !special.test(password)) {
            errors.push("The password must be at least 5 characters long and needs 1 uppercase letter (A-Z), 1 lowercase letter (A-Z), 1 digit (0-9), and 1 special character (~!@#$%^&*()_+`-={}[]\\|;:'\").,<>/?");
    }

    //+TODO: Validate phone number
    let validPhone = /^\d{10}$/
    if (!data.phone || data.phone.trim() === "" ||
        !validPhone.test(data.phone.trim())) {
            errors.push("The phone number can contain only digits and hyphens in the format xxx-xxx-xxxx or xxxxxxxxxx.");
        }

    // +TODO: Validate street_address
    // must not be blank
    if (!data.street_address || data.street_address.trim() === "") {
        errors.push("Street address is required.");
    }

    // // +TODO: Validate city
    // // must not be blank
    if (!data.city || data.city.trim() === "") {
        errors.push("City is required.");
    }

    // // +TODO: Validate state
    // // 2 letters from list of states
    // // 
    const state = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "DC", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"];

    if (!state.includes(data.state)) {
        errors.push("State should be entered as the 2 letter abbreviation.")
    }

    // // +TODO: Validate zip_code
    // // 5 numbers
    // // reusing var number from the password section
    var zipCodeTest = /^[0-9]{5}$/;
    console.log(data.zip_code);
    console.log(data)

    if (!data.zip_code || !zipCodeTest.test(data.zip_code.trim())) {
        errors.push("Zip code should be five digits with no letters or characters.");
    }

    return {
        isValid: errors.length === 0,
        errors
    }
}

// +TODO: Validate new appointment
export function validateNewAppointment(data) {
    const errors = [];

    //+TODO: Validate appt date
    if (!data.appt_date || data.appt_date.trim() == "" ||
        data.appt_date > new Date()) {
        errors.push("A date is required and must be a future date.")
    }

    //+TODO: validate pet name
    if (!data.petname || data.petname.trim() === "") {
        errors.push("Pet name is required");
    }

    //+TODO: Validate pet type
    if (!data.pettype) {
        errors.push("Select cat or dog");
    } else {
        const validOptions = [ "cat", "dog" ];
        if (!validOptions.includes(data.pettype)) {
            errors.push("We only know how to groom a cat or dog.");
        }
    }

    //+TODO: validate service
    // may depend on form fields (dropdown?)
    // service varchar(255),
    if (data.service === "select") { //+TODO: Replace Placeholder Text
        errors.push("Please select a service.");
    } else { //+TODO: Add services list
        const validServices = [ "bath+brush", "bath+haircut", "nailtrim", "deluxe" ];
        if (!validServices.includes(data.service)) {
            errors.push("Please select a valid service from our list.");
        }
    }

    //+TODO: validate friendly
    // friendly boolean default false
    // should be either 0 or 1
    if (![0, 1].includes(data.friendly)) {
        errors.push("Friendly can be True (1) or False (0).")
    }

    return {
        isValid: errors.length === 0,
        errors
    }
}
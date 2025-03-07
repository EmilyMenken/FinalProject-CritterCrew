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
    
    // +TODO: Validate password
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

    //+TODO: Validate phone number
    if (!data.phone || data.phone.trim() === "" ||
        !/^\d{3}-\d{3}-\d{4}$/.test(data.phone.trim())) {
            errors.push("The phone number should contain only digits and hyphens in the format xxx-xxx-xxxx.");
        }

    // +TODO: Validate street_address
    // must not be blank
    if (!data.street_address || data.street_address.trim() === "") {
        errors.push("Street address is required.");
    }

    // +TODO: Validate city
    // must not be blank
    if (!data.city || data.city.trim() === "") {
        errors.push("City is required.");
    }

    // +TODO: Validate state
    // 2 letters from list of states
    // 
    var state = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "DC", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"];

    if (state.indexOf(data.state) > -1 || data.state.trim().length() !== 2) {
        errors.push("State should be entered as the 2 letter abbreviation.")
    }

    // +TODO: Validate zip_code
    // 5 numbers
    // reusing var number from the password section
    var zipCodeTest = /^[0-9]{5}$/;

    if (!data.zip_code || zipCodeTest.test(data.zip_code.trim())) {
        errors.push("Zip code should be five digits with no letters or characters.");
    }

    return {
        isValid: errors.length === 0,
        errors
    }
}

// TODO: Validate new appointment
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

    //TODO: validate service
    // may depend on form fields (dropdown?)
    // service varchar(255),
    if (data.service === "PLACEHOLDER TEXT") { //TODO: Replace Placeholder Text
        errors.push("Please select a service.");
    } else { //TODO: Add services list
        const validServices = [ "Placeholder1", "Placeholder2" ];
        if (!validSizes.includes(data.service)) {
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
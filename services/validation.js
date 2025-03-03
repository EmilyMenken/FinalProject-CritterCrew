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
    
    // Validate password
    // Must include capital, lowercase, 1 symbol

    // Validate street_address
    // must not be blank

    // Validate city
    // must not be blank

    // Validate state
    // 2 letters from list of states

    // Validate zip_code
    // 5 numbers

    return {
        isValid: errors.length === 0,
        errors
    }
}

export function validateNewAppointment(data) {
    const errors = [];

    
}
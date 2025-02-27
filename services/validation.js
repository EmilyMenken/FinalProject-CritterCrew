export function validateForm(data) {
    
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
    
    return {
        isValid: errors.length === 0,
        errors
    }
}
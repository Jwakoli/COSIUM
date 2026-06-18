// Wait for the DOM to fully load before running scripts
document.addEventListener('DOMContentLoaded', () => {
    
    // Target the form and the alert box
    const contactForm = document.getElementById('contactForm');
    const formAlert = document.getElementById('formAlert');

    
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            // Prevent the default page reload
            event.preventDefault(); 

            // Grab the values from the input fields and remove whitespace
            const fullName = document.getElementById('fullName').value.trim();
            const emailAddress = document.getElementById('emailAddress').value.trim();
            const messageText = document.getElementById('messageText').value.trim();

            // Validation Logic
            if (fullName === '' || emailAddress === '' || messageText === '') {
                // FAIL: Missing fields
                formAlert.className = 'alert alert-danger';
                formAlert.textContent = 'Please fill out all required fields marked with an asterisk (*).';
                formAlert.classList.remove('d-none');
            } else if (!emailAddress.includes('@') || !emailAddress.includes('.')) {
                // FAIL: Bad email format
                formAlert.className = 'alert alert-danger';
                formAlert.textContent = 'Please enter a valid email address.';
                formAlert.classList.remove('d-none');
            } else {
                // SUCCESS: Form is valid
                formAlert.className = 'alert alert-success';
                formAlert.textContent = 'Thank you, ' + fullName + '! Your inquiry has been sent to the Apex Auto team.';
                formAlert.classList.remove('d-none');
                
                // Clear the form fields
                contactForm.reset(); 
            }
        });
    }
});
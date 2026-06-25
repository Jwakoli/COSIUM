document.addEventListener('DOMContentLoaded', () => {
    
    // --- FEATURE 1: CONTACT FORM VALIDATION ---
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

    // --- FEATURE 3: LOAN CALCULATOR ---
    const loanCalculator = document.getElementById('loanCalculator');
    
    // Only run if the calculator exists on the current page
    if (loanCalculator) {
        loanCalculator.addEventListener('submit', function(e) {
            e.preventDefault(); // Stop page from reloading
            
            // Get values from the inputs
            const price = parseFloat(document.getElementById('vehiclePrice').value);
            const downPayment = parseFloat(document.getElementById('downPayment').value);
            const rate = parseFloat(document.getElementById('interestRate').value);
            const term = parseInt(document.getElementById('loanTerm').value);
            
            // Math calculations
            const principal = price - downPayment;
            const monthlyRate = (rate / 100) / 12;
            
            let monthlyPayment = 0;
            let totalInterest = 0;
            
            // Validate that down payment isn't higher than the car price
            if (principal > 0) {
                // Calculate amortized monthly payment
                if (rate > 0) {
                    monthlyPayment = principal * (monthlyRate * Math.pow(1 + monthlyRate, term)) / (Math.pow(1 + monthlyRate, term) - 1);
                    totalInterest = (monthlyPayment * term) - principal;
                } else {
                    // If 0% interest
                    monthlyPayment = principal / term;
                }
                
                // Reveal the results box
                document.getElementById('calculatorResult').classList.remove('d-none');
                
                // Format the numbers beautifully with commas for KES
                document.getElementById('monthlyPaymentResult').textContent = 'KES ' + monthlyPayment.toLocaleString('en-KE', {maximumFractionDigits: 0});
                document.getElementById('totalInterestResult').textContent = 'KES ' + totalInterest.toLocaleString('en-KE', {maximumFractionDigits: 0});
            } else {
                alert("Your down payment cannot be greater than or equal to the vehicle price.");
            }
        });
    }
});
document.getElementById("registrationForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission

    const courses = Array.from(document.querySelectorAll('input[name="course"]:checked')).map(checkbox => checkbox.value);
    const totalFee = document.getElementById("totalFee").value;

    if (courses.length === 0) {
        alert("Please select at least one course.");
        return;
    }

    if (totalFee === "") {
        alert("Please enter the total tuition fee.");
        return;
    }

    // Display a success message
    const messageDiv = document.getElementById("message");
    messageDiv.classList.remove("hidden");
    messageDiv.innerHTML = `<strong>Registration Successful!</strong><br>You have registered for: ${courses.join(", ")}.<br>Total Fee: ${totalFee}`;

    // Optionally reset the form
    this.reset();
});

(function() {
    emailjs.init("YOUR_USER_ID"); // Replace 'YOUR_USER_ID' with your actual EmailJS user ID
})();

document.getElementById("registrationForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission
    const courses = Array.from(document.querySelectorAll('input[name="course"]:checked')).map(checkbox => checkbox.value);
    
    if (courses.length === 0) {
        alert("Please select at least one course.");
        return;
    }

    // Show confirmation modal
    showModal(courses);
});

function updateTotalFee() {
    const courseFees = {
        CS101: 300,
        ENG201: 300,
        MATH301: 400,
        HIST102: 300,
        BIO101: 400,
    };

    const selectedCourses = Array.from(document.querySelectorAll('input[name="course"]:checked'));
    const totalFee = selectedCourses.reduce((total, checkbox) => total + courseFees[checkbox.value], 0);
    
    document.getElementById("totalFeeDisplay").innerText = `$${totalFee}`;
    document.getElementById("totalFee").value = totalFee;
}

function showModal(courses) {
    const confirmationMessage = `You have selected the following courses: ${courses.join(", ")}. Total Fee: $${document.getElementById("totalFee").value}.`;
    document.getElementById("confirmationMessage").innerText = confirmationMessage;
    document.getElementById("confirmationModal").classList.remove("hidden");
}

function closeModal() {
    document.getElementById("confirmationModal").classList.add("hidden");
}

function sendEmail() {
    closeModal(); // Close modal
    const totalFee = document.getElementById("totalFee").value;

    const templateParams = {
        fullName: document.getElementById("fullName").value,
        email: document.getElementById("email").value,
        courses: Array.from(document.querySelectorAll('input[name="course"]:checked')).map(checkbox => checkbox.value).join(", "),
        totalFee: totalFee,
        emergencyName: document.getElementById("emergencyName").value,
        emergencyPhone: document.getElementById("emergencyPhone").value,
        date: document.getElementById("date").value,
    };

    // Show loading spinner
    const loadingMessage = document.createElement("div");
    loadingMessage.className = "loading";
    loadingMessage.innerText = "Sending...";
    document.body.appendChild(loadingMessage);
    
    // Send email using EmailJS
    emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            loadingMessage.remove(); // Remove loading spinner
            const messageDiv = document.getElementById("message");
            messageDiv.classList.remove("hidden");
            messageDiv.innerHTML = `<strong>Registration Successful!</strong><br>You have registered for: ${templateParams.courses}.<br>Total Fee: ${totalFee}`;
            document.getElementById("registrationForm").reset(); // Reset the form
        }, function(error) {
            console.log('FAILED...', error);
            loadingMessage.remove(); // Remove loading spinner
            alert('Failed to send email. Please try again later.');
        });
}

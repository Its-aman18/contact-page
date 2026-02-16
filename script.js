// ===============================
// Contact Form Script - Web3Forms
// ===============================

const form = document.getElementById("contactForm");
const submitBtn = document.getElementById("submitBtn");
const successMessage = document.getElementById("successMessage");
const errorMessage = document.getElementById("errorMessage");

// Replace with your real Web3Forms Access Key
const ACCESS_KEY = "YOUR_ACCESS_KEY_HERE";

form.addEventListener("submit", async function (e) {
    e.preventDefault();

    // Disable button while sending
    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";

    // Hide old messages
    successMessage.classList.remove("show");
    errorMessage.classList.remove("show");

    // Collect form data
    const formData = new FormData(form);
    formData.append("access_key", ACCESS_KEY);
    formData.append("subject", "New Contact Message - B.L Verdantix");
    formData.append("from_name", "Website Contact Form");

    try {
        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData
        });

        const result = await response.json();

        if (result.success) {
            successMessage.classList.add("show");
            form.reset();

            // Hide success message after 5 seconds
            setTimeout(() => {
                successMessage.classList.remove("show");
            }, 5000);
        } else {
            errorMessage.classList.add("show");
        }

    } catch (error) {
        errorMessage.classList.add("show");
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = "Send Message";
    }
});

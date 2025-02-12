const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

menuBtn.addEventListener('click', () => {
  mobileMenu.classList.toggle('hidden');
});


document
  .getElementById("contact-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    validateForm()
      .then(() => {
        document.getElementById("submit-error").innerText = "Submitting...";
        document.getElementById("submit-error").style.color = "green";
        setTimeout(() => {
          alert("Form submitted successfully!");
          document.getElementById("submit-error").innerText = "";
        }, 3000);
      })
      .catch((error) => {
        document.getElementById("submit-error").innerText = error;
      });
  });

function validateForm() {
  return new Promise((resolve, reject) => {
    let valid = true;
    let errorMessage = "";

    const fields = [
      "name",
      "email",
      "phone",
      "date",
      "gender",
      "city",
      "state",
      "country",
      "address",
      "message",
    ];

    fields.forEach((field) => {
      const input = document.getElementById(field);
      const errorDiv = document.getElementById(`${field}-error`);
      if (!input || !errorDiv) return; // Ensure elements exist before accessing them
      if (!input.value.trim()) {
        errorDiv.innerText = `${field.charAt(0).toUpperCase() + field.slice(1)} is required.`;
        valid = false;
      } else {
        errorDiv.innerText = "";
      }
    });

    const emailInput = document.getElementById("email");
    if (
      emailInput &&
      emailInput.value.trim() &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value.trim())
    ) {
      document.getElementById("email-error").innerText = "Invalid email format.";
      valid = false;
    }

    const dateInput = document.getElementById("date");
    if (dateInput && !isValidDateOfBirth(dateInput.value)) {
      document.getElementById("date-error").innerText = "Date of birth must be after January 1, 1970.";
      valid = false;
    }

    const phoneInput = document.getElementById("phone");
    if (
      phoneInput &&
      phoneInput.value.trim() &&
      !/^\d{10}$/.test(phoneInput.value.trim())
    ) {
      document.getElementById("phone-error").innerText =
        "Phone number must be 10 digits.";
      errorMessage = "phone must be 10 digit";
      valid = false;
    }

    const termsCheckbox = document.getElementById("check");
    if (termsCheckbox && !termsCheckbox.checked) {
      document.getElementById("Terms-condition").innerText =
      "You must agree to terms and conditions.";
      // errorMessage = "You must agree to terms and conditions.";
      valid = false;
    }

    if (valid) {
      resolve();
    } else {
      reject( "Please fill out all required fields correctly.");
    }
  });
}

function isValidDateOfBirth(date) {
  const selectedDate = new Date(date);
  const minDate = new Date("1970-01-01");
  return selectedDate >= minDate;
}

function imageToggle(elem) {
  // console.log("hey");
  const img = elem.querySelector("img");
  console.log(img);
  img.src = img.src.includes("acc.png") ? "acc_2.png" : "acc.png";
}
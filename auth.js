

document.addEventListener("DOMContentLoaded", function () {

    const passwordToggles = document.querySelectorAll(".password-toggle");
    passwordToggles.forEach(toggle => {
        toggle.addEventListener("click", function () {
            const targetId = this.getAttribute("data-target");
            const input = document.getElementById(targetId);
            if (!input) return;

            const isPassword = input.type === "password";
            input.type = isPassword ? "text" : "password";

            this.innerHTML = isPassword ? '<i data-lucide="eye-off"></i>' : '<i data-lucide="eye"></i>';
            if (window.lucide) {
                lucide.createIcons();
            }
        });
    });

    function showToast(message, type = "success") {
        let toast = document.getElementById("authToast");
        if (!toast) {
            toast = document.createElement("div");
            toast.id = "authToast";
            toast.className = "auth-toast";
            document.body.appendChild(toast);
        }

        const icon = type === "success"
            ? '<i data-lucide="check-circle" style="color: #10B981;"></i>'
            : '<i data-lucide="alert-circle" style="color: #EF4444;"></i>';

        toast.className = `auth-toast ${type}`;
        toast.innerHTML = `${icon} <span>${message}</span>`;

        if (window.lucide) {
            lucide.createIcons();
        }

        setTimeout(() => toast.classList.add("show"), 10);

        setTimeout(() => {
            toast.classList.remove("show");
        }, 4000);
    }

    function setError(input, errorElement, message) {
        input.classList.add("input-error");
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = "block";
        }
    }

    function clearError(input, errorElement) {
        input.classList.remove("input-error");
        if (errorElement) {
            errorElement.textContent = "";
            errorElement.style.display = "none";
        }
    }

    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    const socialButtons = document.querySelectorAll(".social-btn");
    socialButtons.forEach(btn => {
        btn.addEventListener("click", function (e) {
            e.preventDefault();
            const provider = this.textContent.trim();
            showToast(`${provider} OAuth integration demo ready!`, "success");
        });
    });

    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const emailInput = document.getElementById("loginEmail");
            const passwordInput = document.getElementById("loginPassword");
            const emailError = document.getElementById("loginEmailError");
            const passwordError = document.getElementById("loginPasswordError");

            let isValid = true;

            clearError(emailInput, emailError);
            clearError(passwordInput, passwordError);

            const emailVal = emailInput.value.trim();
            if (!emailVal) {
                setError(emailInput, emailError, "Email address is required.");
                isValid = false;
            } else if (!validateEmail(emailVal)) {
                setError(emailInput, emailError, "Please enter a valid email address.");
                isValid = false;
            }

            const passwordVal = passwordInput.value;
            if (!passwordVal) {
                setError(passwordInput, passwordError, "Password is required.");
                isValid = false;
            } else if (passwordVal.length < 6) {
                setError(passwordInput, passwordError, "Password must be at least 6 characters.");
                isValid = false;
            }

            if (isValid) {
                showToast("Welcome back! Logging into Premium Lens...", "success");
                setTimeout(() => {
                    window.location.href = "index.html";
                }, 1800);
            } else {
                showToast("Please check the form for errors.", "error");
            }
        });
    }

    const signupForm = document.getElementById("signupForm");
    if (signupForm) {
        signupForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const nameInput = document.getElementById("signupName");
            const emailInput = document.getElementById("signupEmail");
            const phoneInput = document.getElementById("signupPhone");
            const passwordInput = document.getElementById("signupPassword");
            const confirmInput = document.getElementById("signupConfirmPassword");
            const termsInput = document.getElementById("signupTerms");

            const nameError = document.getElementById("signupNameError");
            const emailError = document.getElementById("signupEmailError");
            const phoneError = document.getElementById("signupPhoneError");
            const passwordError = document.getElementById("signupPasswordError");
            const confirmError = document.getElementById("signupConfirmError");
            const termsError = document.getElementById("signupTermsError");

            let isValid = true;

            clearError(nameInput, nameError);
            clearError(emailInput, emailError);
            clearError(phoneInput, phoneError);
            clearError(passwordInput, passwordError);
            clearError(confirmInput, confirmError);

            if (termsError) termsError.style.display = "none";

            if (!nameInput.value.trim()) {
                setError(nameInput, nameError, "Full name is required.");
                isValid = false;
            }

            const emailVal = emailInput.value.trim();
            if (!emailVal) {
                setError(emailInput, emailError, "Email address is required.");
                isValid = false;
            } else if (!validateEmail(emailVal)) {
                setError(emailInput, emailError, "Please enter a valid email address.");
                isValid = false;
            }

            const phoneVal = phoneInput.value.trim();
            if (!phoneVal) {
                setError(phoneInput, phoneError, "Phone number is required.");
                isValid = false;
            }

            const passwordVal = passwordInput.value;
            if (!passwordVal) {
                setError(passwordInput, passwordError, "Password is required.");
                isValid = false;
            } else if (passwordVal.length < 6) {
                setError(passwordInput, passwordError, "Password must be at least 6 characters.");
                isValid = false;
            }

            const confirmVal = confirmInput.value;
            if (!confirmVal) {
                setError(confirmInput, confirmError, "Please confirm your password.");
                isValid = false;
            } else if (confirmVal !== passwordVal) {
                setError(confirmInput, confirmError, "Passwords do not match.");
                isValid = false;
            }

            if (!termsInput.checked) {
                if (termsError) {
                    termsError.textContent = "You must agree to the Terms & Privacy Policy.";
                    termsError.style.display = "block";
                }
                isValid = false;
            }

            if (isValid) {
                showToast("Account created successfully! Redirecting to login...", "success");
                setTimeout(() => {
                    window.location.href = "login.html";
                }, 1800);
            } else {
                showToast("Please fix the highlighted errors.", "error");
            }
        });
    }

});

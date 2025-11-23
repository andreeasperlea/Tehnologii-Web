const form = document.querySelector(".register-form") as HTMLFormElement;
const username = document.getElementById("username") as HTMLInputElement;
const email = document.getElementById("email") as HTMLInputElement;
const password = document.getElementById("password") as HTMLInputElement;
const confirmPassword = document.getElementById("confirm_password") as HTMLInputElement;
const avatar = document.getElementById("avatar") as HTMLInputElement;


function showError(input: HTMLInputElement, message: string) {
  let error = input.parentElement?.querySelector(".error-msg") as HTMLElement;

  if (!error) {
    error = document.createElement("p");
    error.classList.add("error-msg");
    error.style.color = "red";
    error.style.fontSize = "13px";
    input.parentElement?.appendChild(error);
  }

  error.textContent = message;
  input.style.borderColor = "red";
}

// Utility to clear error
function clearError(input: HTMLInputElement) {
  const err = input.parentElement?.querySelector(".error-msg");
  if (err) err.remove();
  input.style.borderColor = "";
}

// Email regex
function validEmail(email: string): boolean {
  const reg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return reg.test(email);
}

function validateAvatar(fileInput: HTMLInputElement): boolean {
  const files = fileInput.files;

  // No file selected → valid (optional field)
  if (!files || files.length === 0) {
    return true;
  }

  const file = files[0];

  // Extra safety for TypeScript's sake
  if (!file) {
    return true;
  }

  const maxSizeMB = 3;
  const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

  if (!allowedTypes.includes(file.type)) {
    showError(fileInput, "Doar imagini JPG, PNG sau WEBP sunt permise.");
    return false;
  }

  if (file.size > maxSizeMB * 1024 * 1024) {
    showError(fileInput, `Imaginea trebuie să fie sub ${maxSizeMB} MB.`);
    return false;
  }

  return true;
}



// Main validation
form.addEventListener("submit", function (event) {
  let isValid = true;

  // Clear previous errors
  [username, email, password, confirmPassword, avatar].forEach(clearError);

  // Username
  if (username.value.trim().length < 3) {
    showError(username, "Numele de utilizator trebuie să aibă cel puțin 3 caractere.");
    isValid = false;
  }

  // Email
  if (!validEmail(email.value.trim())) {
    showError(email, "Introduceți un email valid.");
    isValid = false;
  }

  // Password
  if (password.value.length < 6) {
    showError(password, "Parola trebuie să aibă cel puțin 6 caractere.");
    isValid = false;
  }

  // Confirm password
  if (password.value !== confirmPassword.value) {
    showError(confirmPassword, "Parolele nu se potrivesc.");
    isValid = false;
  }

  // Avatar
  if (!validateAvatar(avatar)) {
    isValid = false;
  }

  // If not valid, stop submission
  if (!isValid) {
    event.preventDefault();
  }
});

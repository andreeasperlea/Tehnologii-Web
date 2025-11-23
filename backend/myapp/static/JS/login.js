let loginForm = document.getElementById("login-form");
let emailInput = document.getElementById("email");
let passwordInput = document.getElementById("password");
loginForm.addEventListener("submit", function(e) {
    e.preventDefault();
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    const emailRegex = /^[a-z]+\.[a-z]+(?:\d{0,2})@e-uvt\.ro$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{7,}$/;
    if (!emailRegex.test(email)) {
        alert("Email invalid");
        return;
    }
    if (!passwordRegex.test(password)) {
        alert("Password invalid");
        return;
    }
    alert("Login reușit!");
    window.location.href = "../HTML/home.html";
});
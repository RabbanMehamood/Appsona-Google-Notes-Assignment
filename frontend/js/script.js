document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form");
  const registerForm = document.getElementById("register-form");
  console.log("script called");

  // Handle login form submission
  console.log(loginForm);
  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;
    console.log(email, password);
    if (email === "" || password === "") {
      alert("Input email and password input fields!");
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      console.log("user logged successfully");

      localStorage.setItem("token", data.token);
      // window.location.href = "./notes.html"; // Redirect to notes page on successful login
    } catch (error) {
      alert("Login failed: " + error.message);
    }
  });

  // Handle register form submission
  registerForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const username = document.getElementById("register-username").value;
    const email = document.getElementById("register-email").value;
    const password = document.getElementById("register-password").value;

    if (email === "" || password === "" || username === "") {
      alert("Input email and password input fields!");
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (!response.ok) {
        throw new Error("Registration failed");
      }

      alert("Registration successful, Use login form to dive in Notes");
      window.location.href = "/";
    } catch (error) {
      alert("Registration failed: " + error.message);
    }
  });
});


    let isLogin = true;

    function toggleForm() {
      isLogin = !isLogin;
      document.getElementById("formTitle").textContent = isLogin ? "Sign in" : "Register";
      document.querySelector("button").textContent = isLogin ? "Login" : "Register";
      document.getElementById("switchText").textContent = isLogin
        ? "Don't have an account?"
        : "Do you have already an account?";
    }

    function handleAuth() {
      const username = document.getElementById("username").value.trim();
      const password = document.getElementById("password").value.trim();

      if (!username || !password) {
        alert("Please fill in all fields.");
        return;
      }

      let users = JSON.parse(localStorage.getItem("users")) || {};

      if (isLogin) {
        // Login
        if (!users[username] || users[username] !== password) {
          alert("Username or password is wrong.");
          return;
        }
        localStorage.setItem("currentUser", username);
        alert("You have successfully logged in!");
        window.location.href = "index.html";
      } else {
        // Register
        if (users[username]) {
          alert("This username is already exits.");
          return;
        }
        users[username] = password;
        localStorage.setItem("users", JSON.stringify(users));
        alert("Registration was completed succesfully!");
        toggleForm(); 
      }
    }

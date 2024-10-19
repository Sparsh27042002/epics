// Handle login/logout functionality
function handleAuth() {
    const isLoggedIn = false; // Replace with actual login status check
    if (!isLoggedIn) {
        window.location.href = "login.html"; // Redirect to login page
    } else {
        // Logic for logging out or going to the dashboard
        // e.g., window.location.href = "dashboard.html";
    }
}

function redirectToDashboard() {
    window.location.href = "dashboard.html"; // Redirect to dashboard
}

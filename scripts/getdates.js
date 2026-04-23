// Get current year
const year = new Date().getFullYear();
document.getElementById("year").textContent = year;

// Get last modified date
const lastModified = document.lastModified;
document.getElementById("lastModified").textContent = "Last Modified: " + lastModified;
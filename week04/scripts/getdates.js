// Get current year
const currentYear = new Date().getFullYear();

// Insert current year into the span
document.getElementById("currentyear").textContent = currentYear;

// Insert last modified date
document.getElementById("lastModified").textContent =
`Last Modification: ${document.lastModified}`;
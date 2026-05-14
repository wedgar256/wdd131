// Static values (assignment style)
const temp = 28; // Celsius
const windSpeed = 10; // km/h

document.getElementById("temp").textContent = temp;
document.getElementById("wind").textContent = windSpeed;

// Wind chill calculation
function calculateWindChill(t, v) {
  return (
    13.12 +
    0.6215 * t -
    11.37 * Math.pow(v, 0.16) +
    0.3965 * t * Math.pow(v, 0.16)
  ).toFixed(2);
}

// Apply logic
let chill = "N/A";
if (temp <= 10 && windSpeed > 4.8) {
  chill = calculateWindChill(temp, windSpeed) + " °C";
}

document.getElementById("chill").textContent = chill;

// Footer
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent =
  "Last Modified: " + document.lastModified;
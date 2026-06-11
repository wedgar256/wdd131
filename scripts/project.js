/* ==========================================================
   Uganda Travel Guide — project.js
   WDD 131 Final Project
   Covers: objects, arrays, forEach/filter/find, template
   literals, DOM manipulation, events, conditionals,
   localStorage, multiple functions.
   ========================================================== */

/* ---------- DATA: array of objects ---------- */
// NOTE: swap the image URLs for "images/bwindi.webp" etc.
// once you download the photos into your images/ folder.
const attractions = [
    {
        name: "Bwindi Impenetrable Forest",
        image: "https://images.pexels.com/photos/1238275/pexels-photo-1238275.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
        description: "A UNESCO World Heritage Site and home to nearly half of the world's remaining mountain gorillas. Trek through ancient rainforest for a once-in-a-lifetime gorilla encounter.",
        region: "Western Uganda",
        category: "wildlife",
        featured: true
    },
    {
        name: "Murchison Falls",
        image: "https://images.pexels.com/photos/17240766/pexels-photo-17240766.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
        description: "The world's most powerful waterfall, where the mighty Nile forces itself through a 7-metre gorge. Uganda's largest national park teems with elephants, lions, and hippos.",
        region: "Northwestern Uganda",
        category: "water",
        featured: true
    },
    {
        name: "Lake Victoria",
        image: "https://images.pexels.com/photos/36470053/pexels-photo-36470053.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
        description: "Africa's largest lake and the source of the Nile. Enjoy island hopping to the Ssese Islands, sport fishing for Nile perch, and stunning lakeside sunsets.",
        region: "Central Uganda",
        category: "water",
        featured: true
    },
    {
        name: "Queen Elizabeth National Park",
        image: "https://images.pexels.com/photos/19530815/pexels-photo-19530815.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
        description: "Uganda's most visited savanna park, famous for tree-climbing lions in Ishasha, boat cruises on the Kazinga Channel, and over 600 bird species.",
        region: "Western Uganda",
        category: "wildlife",
        featured: false
    },
    {
        name: "Source of the Nile",
        image: "https://images.pexels.com/photos/18934597/pexels-photo-18934597.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
        description: "Visit Jinja, the adventure capital of East Africa, where the world's longest river begins its 6,650 km journey. White-water rafting, kayaking, and bungee jumping await.",
        region: "Eastern Uganda",
        category: "water",
        featured: false
    }
];

/* ---------- FUNCTION 1: render attraction cards ---------- */
function displayAttractions(list, selector) {
    const container = document.querySelector(selector);

    // Conditional branching
    if (!container) {
        return;
    }

    if (list.length === 0) {
        container.innerHTML = `<p>No attractions found for that filter.</p>`;
        return;
    }

    container.innerHTML = "";

    // Array method: forEach + template literals + DOM manipulation
    list.forEach((place) => {
        const card = document.createElement("article");
        card.classList.add("card");
        card.innerHTML = `
            <img src="${place.image}" alt="${place.name}" loading="lazy" width="400" height="210">
            <div class="card-body">
                <p class="region">${place.region}</p>
                <h3>${place.name}</h3>
                <p>${place.description}</p>
            </div>
        `;
        container.appendChild(card);
    });
}

/* ---------- FUNCTION 2: featured attractions (home page) ---------- */
function displayFeatured() {
    // Array method: filter
    const featured = attractions.filter((place) => place.featured);
    displayAttractions(featured, "#featured-grid");
}

/* ---------- FUNCTION 3: spotlight (attractions page) ---------- */
function displaySpotlight() {
    const spotlightEl = document.querySelector("#spotlight");

    if (!spotlightEl) {
        return;
    }

    // Array method: find
    const gem = attractions.find((place) =>
        place.name.includes("Bwindi")
    );

    spotlightEl.innerHTML = `
        <h3>🌟 Don't Miss: ${gem.name}</h3>
        <p>${gem.description}</p>
        <p><strong>Region:</strong> ${gem.region}</p>
    `;
}

/* ---------- FUNCTION 4: filter buttons (attractions page) ---------- */
function setupFilters() {
    const buttons = document.querySelectorAll(".filters button");

    if (buttons.length === 0) {
        return;
    }

    buttons.forEach((button) => {
        button.addEventListener("click", () => {
            buttons.forEach((b) => b.classList.remove("active"));
            button.classList.add("active");

            const category = button.dataset.filter;

            if (category === "all") {
                displayAttractions(attractions, "#attractions-grid");
            } else {
                const filtered = attractions.filter(
                    (place) => place.category === category
                );
                displayAttractions(filtered, "#attractions-grid");
            }
        });
    });
}

/* ---------- FUNCTION 5: save contact form (localStorage) ---------- */
function saveForm(e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const destination = document.getElementById("destination").value;
    const message = document.getElementById("message").value.trim();
    const formMessage = document.querySelector("#form-message");

    // Conditional branching / validation
    if (name === "") {
        formMessage.textContent = "⚠ Please enter your name.";
        formMessage.className = "form-message error";
        return;
    }

    if (email === "") {
        formMessage.textContent = "⚠ Please enter your email address.";
        formMessage.className = "form-message error";
        return;
    }

    if (destination === "") {
        formMessage.textContent = "⚠ Please choose a destination of interest.";
        formMessage.className = "form-message error";
        return;
    }

    // localStorage.setItem
    localStorage.setItem("visitorName", name);
    localStorage.setItem("visitorEmail", email);
    localStorage.setItem("visitorDestination", destination);
    localStorage.setItem("visitorMessage", message);

    // Track how many enquiries have been sent
    let count = Number(localStorage.getItem("enquiryCount")) || 0;
    count = count + 1;
    localStorage.setItem("enquiryCount", count);

    formMessage.innerHTML = `✅ Thank you, ${name}! Your enquiry about <strong>${destination}</strong> has been saved. (Enquiries sent: ${count})`;
    formMessage.className = "form-message success";

    document.querySelector("#contact-form").reset();
}

/* ---------- FUNCTION 6: greet returning visitor ---------- */
function greetVisitor() {
    const welcomeEl = document.querySelector("#welcome-back");

    if (!welcomeEl) {
        return;
    }

    // localStorage.getItem
    const savedName = localStorage.getItem("visitorName");
    const savedDestination = localStorage.getItem("visitorDestination");

    if (savedName) {
        welcomeEl.innerHTML = `👋 Welcome back, ${savedName}! Still dreaming about ${savedDestination ?? "Uganda"}?`;
        welcomeEl.style.display = "block";
    }
}

/* ---------- FUNCTION 7: responsive hamburger menu ---------- */
function setupMenu() {
    const menuButton = document.querySelector("#menu-button");
    const navList = document.querySelector("#nav-list");

    if (!menuButton || !navList) {
        return;
    }

    menuButton.addEventListener("click", () => {
        navList.classList.toggle("open");

        if (navList.classList.contains("open")) {
            menuButton.textContent = "✕";
            menuButton.setAttribute("aria-expanded", "true");
        } else {
            menuButton.textContent = "☰";
            menuButton.setAttribute("aria-expanded", "false");
        }
    });
}

/* ---------- FUNCTION 8: footer dates ---------- */
function updateFooter() {
    const yearEl = document.querySelector("#current-year");
    const modifiedEl = document.querySelector("#last-modified");

    if (yearEl) {
        yearEl.textContent = `${new Date().getFullYear()}`;
    }

    if (modifiedEl) {
        modifiedEl.textContent = `Last Modified: ${document.lastModified}`;
    }
}

/* ---------- INITIALIZE ---------- */
document.addEventListener("DOMContentLoaded", () => {
    setupMenu();
    updateFooter();
    greetVisitor();

    // Home page
    displayFeatured();

    // Attractions page
    displayAttractions(attractions, "#attractions-grid");
    displaySpotlight();
    setupFilters();

    // Contact page
    const form = document.querySelector("#contact-form");
    if (form) {
        form.addEventListener("submit", saveForm);
    }
});

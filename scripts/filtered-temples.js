// Get current year
const year = new Date().getFullYear();
document.getElementById("year").textContent = year;

// Get last modified date
const lastModified = document.lastModified;
document.getElementById("lastmodified").textContent = lastModified;

//temple list
const temples = [
  {
    templeName: "Aba Nigeria",
    location: "Aba, Nigeria",
    dedicated: "2005, August, 7",
    area: 11500,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
  },
  {
    templeName: "Manti Utah",
    location: "Manti, Utah, United States",
    dedicated: "1888, May, 21",
    area: 74792,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
  },
  {
    templeName: "Payson Utah",
    location: "Payson, Utah, United States",
    dedicated: "2015, June, 7",
    area: 96630,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
  },
  {
    templeName: "Yigo Guam",
    location: "Yigo, Guam",
    dedicated: "2020, May, 2",
    area: 6861,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
  },
  {
    templeName: "Washington D.C.",
    location: "Kensington, Maryland, United States",
    dedicated: "1974, November, 19",
    area: 156558,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
  },
  {
    templeName: "Lima Perú",
    location: "Lima, Perú",
    dedicated: "1986, January, 10",
    area: 9600,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
  },
  {
    templeName: "Mexico City Mexico",
    location: "Mexico City, Mexico",
    dedicated: "1983, December, 2",
    area: 116642,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
  },
{
  templeName: "Sapporo Japan",
  location: "Sapporo, Japan",
  dedicated: "2016, June, 5",
  area: 48480,
  imageUrl: "https://www.churchofjesuschrist.org/imgs/c917995588e9c8d3ce881ebd32405150f9109fa7/full/500%2C/0/default"
},
{
  templeName: "Colonia Juárez Mexico",
  location: "Colonia Juárez, Mexico",
  dedicated: "1999, March, 6",
  area: 6800,
  imageUrl: "https://www.churchofjesuschrist.org/imgs/9130468c8099ce6d57d408945a4d94ebc97d969a/full/500%2C/0/default"
},
 {
  templeName: "Brigham City Utah",
  location: "Brigham City, Utah, United States",
  dedicated: "2012, September, 23",
  area: 36000,
  imageUrl: "https://www.churchofjesuschrist.org/imgs/154ee0c38f920aa66074c0338fe29f535e0d0a65/full/500%2C/0/default"
}
]

const gallery = document.querySelector(".gallery");

function displayTemples(temples) {
    gallery.innerHTML = "";

    temples.forEach((temple) => {
        const card = document.createElement("section");

        const name = document.createElement("h3");
        name.textContent = temple.templeName;

        const location = document.createElement("p");
        location.innerHTML = `<strong>Location:</strong> ${temple.location}`;

        const dedicated = document.createElement("p");
        dedicated.innerHTML = `<strong>Dedicated:</strong> ${temple.dedicated}`;

        const area = document.createElement("p");
        area.innerHTML = `<strong>Size:</strong> ${temple.area.toLocaleString()} sq ft`;

        const image = document.createElement("img");
        image.src = temple.imageUrl;
        image.alt = temple.templeName;
        image.loading = "lazy";
        image.width = 400;
        image.height = 250;

        card.appendChild(name);
        card.appendChild(location);
        card.appendChild(dedicated);
        card.appendChild(area);
        card.appendChild(image);

        gallery.appendChild(card);
    });
}

displayTemples(temples);
displayTemples(temples);

const navLinks = document.querySelectorAll(".navigation a");

navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
        e.preventDefault();

        const filter = link.textContent;

        switch (filter) {
            case "Home":
                displayTemples(temples);
                document.querySelector("h2").textContent = "Home";
                break;

            case "Old":
                displayTemples(
                    temples.filter(temple => parseInt(temple.dedicated) < 1900)
                );
                document.querySelector("h2").textContent = "Old Temples";
                break;

            case "New":
                displayTemples(
                    temples.filter(temple => parseInt(temple.dedicated) > 2000)
                );
                document.querySelector("h2").textContent = "New Temples";
                break;

            case "Large":
                displayTemples(
                    temples.filter(temple => temple.area > 90000)
                );
                document.querySelector("h2").textContent = "Large Temples";
                break;

            case "Small":
                displayTemples(
                    temples.filter(temple => temple.area < 10000)
                );
                document.querySelector("h2").textContent = "Small Temples";
                break;
        }
    });
});
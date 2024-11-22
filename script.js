

const container = document.querySelector(".container");

document.querySelector(".open-navbar-icon").addEventListener("click", () => {
  container.classList.add("change");
});

document.querySelector(".close-navbar-icon").addEventListener("click", () => {
  container.classList.remove("change");
});

const colors = ["#6495ed", "#7fffd4", "#ffa07a", "#f08080", "#afeeee"];

let i = 0;

Array.from(document.querySelectorAll(".nav-link")).forEach((item) => {
  item.style.cssText = `background-color: ${colors[i++]}`;
});

Array.from(document.querySelectorAll(".navigation-button")).forEach((item) => {
  item.onclick = () => {
    item.parentElement.parentElement.classList.toggle("change");
  };
});

// Wait for the DOM to fully load
document.addEventListener("DOMContentLoaded", function () {
  // Add click event listener to the "Tours" link in the footer
  const toursLink = document.getElementById("scroll-to-tours");
  toursLink.addEventListener("click", function (event) {
    event.preventDefault(); // Prevent the default anchor click behavior

    // Scroll to the "Most Popular Tours" section
    const popularToursSection = document.querySelector(".popular-tours");
    popularToursSection.scrollIntoView({ behavior: "smooth" });
  });
});

// Wait for the DOM to fully load
document.addEventListener("DOMContentLoaded", function () {
  // Select the images for each tour
  const shimlaImage = document.querySelector(".shimla-tour");
  const jodhpurImage = document.querySelector(".jodhpur-jaisalmer-tour");
  const islandBeachImage = document.querySelector(".island-beach-tour");
  

  // Add click event listeners for each image
  shimlaImage.addEventListener("click", function () {
    window.location.href = "/Trip_Detailing/index.html"; // Link to Shimla tour
  });

  jodhpurImage.addEventListener("click", function () {
    window.location.href = "/Trip_Detailing/index.html"; // Link to Jodhpur & Jaisalmer tour
  });

  islandBeachImage.addEventListener("click", function () {
    window.location.href = "/Trip_Detailing/index.html"; // Link to Island Beach tour
  });
});
let autoPlay = setInterval(() => {
  nextBtn.click();
}, 3000);

// Pause on hover
slides.addEventListener("mouseover", () => clearInterval(autoPlay));
slides.addEventListener("mouseout", () => {
  autoPlay = setInterval(() => nextBtn.click(), 3000);
});
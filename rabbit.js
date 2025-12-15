console.log("Rabbit module loaded");

/* Sample Rabbit Data */
const rabbitBreeds = [
  "New Zealand White",
  "Californian",
  "Dutch",
  "Chinchilla",
  "Flemish Giant"
];

const rabbitRecords = [
  "Buck – 6 months – Healthy",
  "Doe – 8 months – Pregnant",
  "Doe – 1 year – Nursing",
  "Grower – 3 months – Weaning stage"
];

/* Inject data after page loads */
document.addEventListener("DOMContentLoaded", () => {
  const breedList = document.getElementById("breedList");
  const recordList = document.getElementById("recordList");

  rabbitBreeds.forEach(breed => {
    const li = document.createElement("li");
    li.textContent = breed;
    breedList.appendChild(li);
  });

  rabbitRecords.forEach(record => {
    const li = document.createElement("li");
    li.textContent = record;
    recordList.appendChild(li);
  });
});

const domainSelect = document.getElementById("domain");
const categorySelect = document.getElementById("category");
const speciesSelect = document.getElementById("species");

const categories = {
  crops: ["vegetables", "cash_crops", "food_crops", "medicinal_crops"],
  livestock: ["poultry", "land_animals", "beekeeping", "aquaculture"]
};

// Populate category when domain changes
domainSelect.addEventListener("change", () => {
  const domain = domainSelect.value;
  categorySelect.innerHTML = `<option value="">Select Category</option>`;
  speciesSelect.innerHTML = `<option value="">Select Species</option>`;

  if (!categories[domain]) return;

  categories[domain].forEach(cat => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat.replace("_", " ").toUpperCase();
    categorySelect.appendChild(option);
  });
});

// Load species when category changes
categorySelect.addEventListener("change", async () => {
  const domain = domainSelect.value;
  const category = categorySelect.value;

  speciesSelect.innerHTML = `<option>Loading...</option>`;

  try {
    const response = await fetch(`data/diagnostic/${domain}/${category}.json`);
    const data = await response.json();

    speciesSelect.innerHTML = `<option value="">Select Species</option>`;

    data.species.forEach(sp => {
      const option = document.createElement("option");
      option.value = sp.name;
      option.textContent = sp.name;
      speciesSelect.appendChild(option);
    });

  } catch (error) {
    speciesSelect.innerHTML = `<option>Error loading species</option>`;
    console.error("Diagnostic load error:", error);
  }
});

const categorySelect = document.getElementById('category');
const speciesSelect = document.getElementById('species');
const diagnosticForm = document.getElementById('diagnosticForm');
const resultSection = document.getElementById('result');

// Species mapping per category
const speciesOptions = {
  crops: ["vegetables", "food_crops", "cash_crops", "medicinal_crops"],
  livestock: ["aquaculture", "beekeeping", "land_animals", "poultry"]
};

// Update species dropdown when category changes
categorySelect.addEventListener('change', () => {
  const category = categorySelect.value;
  speciesSelect.innerHTML = '<option value="">Select species</option>';
if (speciesOptions[category]) {
    speciesOptions[category].forEach(species => {
      const option = document.createElement('option');
      option.value = species;
      option.textContent = species.replace(/_/g, ' ');
      speciesSelect.appendChild(option);
    });
  }
});

// Form submit: fetch JSON and show diagnosis
diagnosticForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const category = categorySelect.value;
  const species = speciesSelect.value;
  const symptom = document.getElementById('symptom').value.toLowerCase().trim();

 if (!category || !species || !symptom) {
    resultSection.textContent = "Please select category, species and enter symptom.";
    return;
  }

  try {
    const response = await fetch(`./data/${category}/${species}.json`);
    const data = await response.json();

    const diagnosis = data[symptom] || "No diagnosis found. Please consult an expert.";
    resultSection.textContent = `Diagnosis: ${diagnosis}`;
  } catch (err) {
    console.error(err);
    resultSection.textContent = "Error fetching diagnostic data. Check JSON files.";
  }
});
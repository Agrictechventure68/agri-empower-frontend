const categorySelect = document.getElementById("category");
const speciesSelect = document.getElementById("species");
const form = document.getElementById("diagnosticForm");
const resultDiv = document.getElementById("result");

let loadedData = {};
const DOMAIN = "crops"; // future-proof (livestock later)

async function loadCategory(category) {
  try {
    const path = `/data/${DOMAIN}/${category}/${category}.json`;
    const res = await fetch(path);

    if (!res.ok) throw new Error("Category data not found");

    const json = await res.json();
    loadedData = json.species || {};

    speciesSelect.innerHTML = "<option value=''>Select species</option>";

    Object.entries(loadedData).forEach(([key, value]) => {
      const opt = document.createElement("option");
      opt.value = key;
      opt.textContent = value.name;
      speciesSelect.appendChild(opt);
    });

  } catch (err) {
    console.error(err);
    speciesSelect.innerHTML = "<option>Error loading species</option>";
  }
}

categorySelect.addEventListener("change", e => {
  loadCategory(e.target.value);
});

form.addEventListener("submit", e => {
  e.preventDefault();

  const speciesKey = speciesSelect.value;
  const rawSymptom = document.getElementById("symptom").value.trim();

  if (!speciesKey || !rawSymptom) {
    resultDiv.textContent = "Please select species and describe symptoms.";
    return;
  }

  const species = loadedData[speciesKey];
  if (!species || !species.symptoms) {
    resultDiv.textContent = "No diagnostic data available for this species.";
    return;
  }

  // Normalize symptom input
  const normalized = rawSymptom.toLowerCase().replace(/\s+/g, "_");

  let match = null;

  Object.keys(species.symptoms).forEach(key => {
    if (normalized.includes(key) || key.includes(normalized)) {
      match = species.symptoms[key];
    }
  });

  if (!match) {
    resultDiv.innerHTML = `
      <strong>No exact match found.</strong><br>
      Please consult an extension officer or refine symptoms.
    `;
    return;
  }

  resultDiv.innerHTML = `
    <strong>Likely Cause:</strong> ${match.cause}<br>
    <strong>Recommended Action:</strong> ${match.solution}
  `;
});

// Initial load
if (categorySelect.value) {
  loadCategory(categorySelect.value);
}

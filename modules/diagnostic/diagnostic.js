const categorySelect = document.getElementById("category");
const speciesSelect = document.getElementById("species");
const form = document.getElementById("diagnosticForm");
const resultDiv = document.getElementById("result");

let loadedData = {};

async function loadCategory(category) {
  const path = `/data/crops/${category}/${category}.json`;
  const res = await fetch(path);
  const json = await res.json();

  loadedData = json.species;
  speciesSelect.innerHTML = "";

  Object.keys(loadedData).forEach(key => {
    const opt = document.createElement("option");
    opt.value = key;
    opt.textContent = loadedData[key].name;
    speciesSelect.appendChild(opt);
  });
}

categorySelect.addEventListener("change", e => {
  loadCategory(e.target.value);
});

form.addEventListener("submit", e => {
  e.preventDefault();

  const species = speciesSelect.value;
  const symptom = document.getElementById("symptom").value.trim();

  if (!loadedData[species]) {
    resultDiv.textContent = "Species not found.";
    return;
  }

  const diagnosis =
    loadedData[species].symptoms[symptom] ||
    "No direct match found. Consult an extension professional.";

  resultDiv.textContent = `Diagnosis: ${diagnosis}`;
});

// Initial load
loadCategory(categorySelect.value);

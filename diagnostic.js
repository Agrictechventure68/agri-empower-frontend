console.log("Diagnostic engine loaded");

// ================= DATA =================
const diagnosticData = {
  crop: {
    maize: {
      "yellowing leaves": {
        disease: "Nitrogen Deficiency or Maize Streak Virus",
        treatment: "Apply nitrogen-rich fertilizer or remove infected plants if viral."
      },
      "stunted growth": {
        disease: "Phosphorus Deficiency",
        treatment: "Apply phosphorus fertilizer and improve soil fertility."
      }
    },
    tomato: {
      "leaf spots": {
        disease: "Early Blight",
        treatment: "Use neem oil spray and avoid overhead irrigation."
      },
      wilting: {
        disease: "Fusarium Wilt",
        treatment: "Remove infected plants and improve drainage."
      }
    },
    fluted_pumpkin: {
      "insect holes": {
        disease: "Leaf Beetle Infestation",
        treatment: "Apply neem extract or wood ash early morning."
      }
    }
  },

  livestock: {
    goat: {
      coughing: {
        disease: "Pneumonia",
        treatment: "Keep animal warm and consult a vet for antibiotics."
      },
      diarrhea: {
        disease: "Worm infestation or poor diet",
        treatment: "Deworm and provide clean water."
      }
    },
    rabbit: {
      diarrhea: {
        disease: "Enteritis",
        treatment: "Remove watery feeds, provide hay only, isolate rabbit."
      },
      "runny nose": {
        disease: "Snuffles",
        treatment: "Improve ventilation and consult a vet."
      }
    }
  }
};

// ================= UI LOGIC =================
const categorySelect = document.getElementById("category-select");
const itemSelect = document.getElementById("item-select");
const symptomSelect = document.getElementById("symptom-select");
const resultDisplay = document.getElementById("result-display");
const diagnoseBtn = document.getElementById("diagnoseBtn");

// Populate items
categorySelect.addEventListener("change", () => {
  itemSelect.innerHTML = `<option value="">--Choose Item--</option>`;
  symptomSelect.innerHTML = `<option value="">--Choose Symptom--</option>`;
  symptomSelect.disabled = true;

  const category = categorySelect.value;
  if (!category) return;

  Object.keys(diagnosticData[category]).forEach(item => {
    const option = document.createElement("option");
    option.value = item;
    option.textContent = item.replace("_", " ");
    itemSelect.appendChild(option);
  });

  itemSelect.disabled = false;
});

// Populate symptoms
itemSelect.addEventListener("change", () => {
  symptomSelect.innerHTML = `<option value="">--Choose Symptom--</option>`;
  const category = categorySelect.value;
  const item = itemSelect.value;

  if (!item) return;

  Object.keys(diagnosticData[category][item]).forEach(symptom => {
    const option = document.createElement("option");
    option.value = symptom;
    option.textContent = symptom;
    symptomSelect.appendChild(option);
  });

  symptomSelect.disabled = false;
});

// Diagnose
diagnoseBtn.addEventListener("click", () => {
  const category = categorySelect.value;
  const item = itemSelect.value;
  const symptom = symptomSelect.value;

  if (!category || !item || !symptom) {
    resultDisplay.innerHTML = "<p>Please complete all selections.</p>";
    return;
  }

  const info = diagnosticData[category][item][symptom];

  resultDisplay.innerHTML = `
    <h3>Diagnosis Result</h3>
    <p><strong>Issue:</strong> ${info.disease}</p>
    <p><strong>Recommended Action:</strong> ${info.treatment}</p>
  `;
});

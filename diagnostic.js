console.log("Diagnostic Engine Loaded");

// ===== SYMPTOM SUGGESTIONS =====
const symptomMap = {
  maize: ["yellowing leaves", "stunted growth"],
  tomato: ["leaf spots", "wilting"],
  cassava: ["wilting", "leaf curling"],
  rice: ["brown spots", "stunted growth"],
  ugu: ["yellowing leaves", "insect holes"],

  goat: ["coughing", "diarrhea", "loss of appetite"],
  sheep: ["lameness", "diarrhea", "wool loss"],
  rabbit: ["diarrhea", "runny nose", "hair loss", "lethargy"]
};

// ===== DIAGNOSIS DATABASE (INLINE FOR STAGE 1) =====
const diagnosisDB = {
  maize: {
    "yellowing leaves": {
      issue: "Nitrogen Deficiency or Maize Streak Virus",
      treatment: "Apply nitrogen fertilizer or remove infected plants."
    }
  },
  tomato: {
    "leaf spots": {
      issue: "Early Blight",
      treatment: "Apply neem oil and avoid overhead irrigation."
    }
  },
  ugu: {
    "insect holes": {
      issue: "Leaf beetle infestation",
      treatment: "Apply neem extract or wood ash early morning."
    }
  },
  rabbit: {
    "diarrhea": {
      issue: "Enteritis or poor diet",
      treatment: "Remove watery feed, provide hay and clean water."
    }
  }
};

// ===== DOM ELEMENTS =====
const cropSelect = document.getElementById("crop-select");
const symptomSelect = document.getElementById("symptom-select");
const symptomList = document.getElementById("symptom-list");
const resultDisplay = document.getElementById("result-display");
const diagnoseBtn = document.getElementById("diagnoseBtn");

// ===== UPDATE SYMPTOMS =====
cropSelect.addEventListener("change", () => {
  const selected = cropSelect.value;
  symptomSelect.innerHTML = `<option value="">-- Choose Symptom --</option>`;

  if (!symptomMap[selected]) {
    symptomList.textContent = "No symptoms available.";
    return;
  }

  symptomMap[selected].forEach(symptom => {
    const opt = document.createElement("option");
    opt.value = symptom;
    opt.textContent = symptom;
    symptomSelect.appendChild(opt);
  });

  symptomList.textContent = symptomMap[selected].join(", ");
});

// ===== DIAGNOSE =====
diagnoseBtn.addEventListener("click", () => {
  const crop = cropSelect.value;
  const symptom = symptomSelect.value;

  if (!crop || !symptom) {
    resultDisplay.className = "diagnostic-result error";
    resultDisplay.innerHTML = "⚠️ Please select both crop/livestock and symptom.";
    resultDisplay.style.display = "block";
    return;
  }

  const result = diagnosisDB[crop]?.[symptom];

  if (!result) {
    resultDisplay.className = "diagnostic-result error";
    resultDisplay.innerHTML = "No exact match found. Consult an agronomist or vet.";
  } else {
    resultDisplay.className = "diagnostic-result";
    resultDisplay.innerHTML = `
      <h3>Diagnosis Result</h3>
      <p><strong>Issue:</strong> ${result.issue}</p>
      <p><strong>Recommended Action:</strong> ${result.treatment}</p>
    `;
  }

  resultDisplay.style.display = "block";
});

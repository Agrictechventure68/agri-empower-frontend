function diagnose() {
  const crop = document.getElementById('crop-select').value;
  const symptom = document.getElementById('symptom-select').value;
  const resultDisplay = document.getElementById('result-display');

  if (!crop || !symptom) {
    resultDisplay.innerHTML = `<p>Please select both crop and symptom.</p>`;
    resultDisplay.style.display = 'block';
    return;
  }

  const diagnoses = {
    "maize_yellowing leaves": {
      disease: "Nitrogen Deficiency or Maize Streak Virus",
      treatment: "Apply organic nitrogen-rich fertilizer or remove affected plants if viral."
    },
    "tomato_leaf spots": {
      disease: "Early Blight (Alternaria)",
      treatment: "Use neem oil spray and avoid overhead irrigation."
    },
    "cassava_wilting": {
      disease: "Cassava Bacterial Blight",
      treatment: "Use disease-resistant varieties and rotate crops."
    },
    "fluted_pumpkin_insect holes": {
      disease: "Leaf Beetle Infestation",
      treatment: "Apply neem extract or wood ash early in the morning."
    }
  };

  const key = `${crop}_${symptom}`;
  const info = diagnoses[key];

  if (info) {
    resultDisplay.innerHTML = `
      <h3>Diagnosis Result</h3>
      <p><strong>Disease/Pest:</strong> ${info.disease}</p>
      <p><strong>Suggested Remedy:</strong> ${info.treatment}</p>
    `;
  } else {
    resultDisplay.innerHTML = `<p>No specific match found. Try manual inspection or consult an agronomist.</p>`;
  }

  resultDisplay.style.display = 'block';
}document.getElementById('crop').addEventListener('change', function () {
  const selected = this.value;
  const suggestionBox = document.getElementById('symptom-list');

  const suggestions = {
    ugu: ["yellow leaves", "leaf holes", "wilting", "powdery spots", "root rot"],
    rice: ["stunted growth", "brown spots", "leaf curling", "grain discoloration"],
    goat: ["coughing", "diarrhea", "nasal discharge", "loss of appetite", "swollen joints"],
    sheep: ["lameness", "wool loss", "diarrhea", "eye discharge", "bloating"],
    rabbit: ["soft stool", "hair loss", "head tilt", "runny nose", "not eating"]
  };

  suggestionBox.textContent = suggestions[selected]?.join(', ') || "Select a valid option to view symptoms.";
});
else if (crop === 'ugu' && symptoms.includes('holes')) {
  result = "Likely pest infestation by caterpillars or beetles. Consider neem-based spray.";
} else if (crop === 'goat' && symptoms.includes('cough') || symptoms.includes('nasal')) {
  result = "Could be pneumonia. Keep animal warm, dry, and consult vet for antibiotics.";
} else if (crop === 'rabbit' && symptoms.includes('diarrhea')) {
  result = "Likely due to diet imbalance or infection. Ensure clean water and check feed.";
}
document.getElementById('diagnostic-form').addEventListener('submit', function (e) {
  e.preventDefault();
  const crop = document.getElementById('crop').value;
  const symptoms = document.getElementById('symptoms').value.toLowerCase();
  let result = "No diagnosis available. Try using specific symptoms.";

  if (crop === 'ugu' && symptoms.includes('yellow')) {
    result = "Likely Nitrogen Deficiency or Fungal Infection. Apply compost and copper-based fungicide.";
  } else if (crop === 'rice' && symptoms.includes('brown spots')) {
    result = "Possible Rice Blast. Use resistant varieties and apply fungicide.";
  } else if (crop === 'rabbit' && symptoms.includes('sore')) {
    result = "Check for Sore Hocks. Ensure cage flooring is smooth and clean.";
  }

  document.getElementById('result').innerText = result;
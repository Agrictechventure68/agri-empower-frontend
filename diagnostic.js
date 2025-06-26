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
}
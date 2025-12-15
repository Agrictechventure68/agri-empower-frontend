console.log("Rabbit Health Diagnostic loaded");

/* Rabbit health knowledge base */
const rabbitDiagnostics = {
  loss_of_appetite: {
    issue: "Digestive problem or stress",
    treatment: "Check feed quality, ensure clean water, reduce stress. If persistent, consult a vet."
  },
  diarrhea: {
    issue: "Enteritis or poor diet",
    treatment: "Remove watery vegetables, provide hay only, isolate affected rabbit."
  },
  runny_nose: {
    issue: "Snuffles (respiratory infection)",
    treatment: "Improve ventilation, isolate rabbit, seek veterinary antibiotics."
  },
  hair_loss: {
    issue: "Mange or fungal infection",
    treatment: "Apply anti-mange treatment, clean housing, isolate infected rabbit."
  },
  lethargy: {
    issue: "Heat stress or illness",
    treatment: "Move to cool area, provide clean water, observe closely and consult a vet."
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const diagnoseBtn = document.getElementById("diagnoseBtn");
  const symptomSelect = document.getElementById("symptomSelect");
  const result = document.getElementById("diagnosisResult");

  diagnoseBtn.addEventListener("click", () => {
    const symptom = symptomSelect.value;

    if (!symptom) {
      result.innerHTML = "⚠️ Please select a symptom.";
      return;
    }

    const diagnosis = rabbitDiagnostics[symptom];

    result.innerHTML = `
      <strong>Possible Issue:</strong> ${diagnosis.issue}<br>
      <strong>Recommended Action:</strong> ${diagnosis.treatment}
    `;
  });
});
‎/* Medication & vaccination tracker */
‎const medForm = document.getElementById("medForm");
‎const medicationList = document.getElementById("medicationList");
‎
‎medForm.addEventListener("submit", (e) => {
‎  e.preventDefault();
‎
‎  const rabbitName = document.getElementById("rabbitName").value;
‎  const medicine = document.getElementById("medicine").value;
‎  const date = document.getElementById("dateGiven").value;
‎
‎  const li = document.createElement("li");
‎  li.textContent = `${rabbitName} – ${medicine} (${date})`;
‎
‎  medicationList.appendChild(li);
‎  medForm.reset();
‎});
‎
‎
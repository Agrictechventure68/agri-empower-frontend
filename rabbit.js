
‎
‎console.log("Rabbit Health Diagnostic loaded");
‎
‎let rabbitDiagnostics = {};
‎
‎fetch("rabbit-diagnostics.json")
‎  .then(res => res.json())
‎  .then(data => {
‎    rabbitDiagnostics = data;
‎  })
‎  .catch(err => console.error("Diagnostics load error:", err));
‎
‎document.addEventListener("DOMContentLoaded", () => {
‎  const diagnoseBtn = document.getElementById("diagnoseBtn");
‎  const symptomSelect = document.getElementById("symptomSelect");
‎  const result = document.getElementById("diagnosisResult");
‎
‎  diagnoseBtn.addEventListener("click", () => {
‎    const symptom = symptomSelect.value;
‎
‎    if (!symptom) {
‎      result.textContent = "⚠️ Please select a symptom.";
‎      return;
‎    }
‎
‎    const diagnosis = rabbitDiagnostics[symptom];
‎
‎    result.innerHTML = `
‎      <strong>Possible Issue:</strong> ${diagnosis.issue}<br>
‎      <strong>Recommended Action:</strong> ${diagnosis.treatment}
‎    `;
‎  });
‎
‎  // Medication tracker
‎  const medForm = document.getElementById("medForm");
‎  const medicationList = document.getElementById("medicationList");
‎
‎  medForm.addEventListener("submit", (e) => {
‎    e.preventDefault();
‎
‎    const rabbitName = document.getElementById("rabbitName").value;
‎    const medicine = document.getElementById("medicine").value;
‎    const date = document.getElementById("dateGiven").value;
‎
‎    const li = document.createElement("li");
‎    li.textContent = `${rabbitName} – ${medicine} (${date})`;
‎
‎    medicationList.appendChild(li);
‎    medForm.reset();
‎  });
‎});
‎
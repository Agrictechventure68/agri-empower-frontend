document.getElementById('diagnosticForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const crop = document.getElementById('crop').value;
  const symptom = document.getElementById('symptom').value;
  const resultSection = document.getElementById('result');

  const diagnoses = {
    ugu: {
      yellowing: "Likely Nitrogen Deficiency or Aphid Infestation.",
      spots: "Possibly Fungal Leaf Spot.",
      wilting: "Could be Root Rot due to overwatering.",
      holes: "Check for Leaf Beetles or Caterpillars.",
      rot: "Stem Rot or Fungal Infection likely."
    },
    maize: {
      yellowing: "Nutrient deficiency or Downy Mildew.",
      spots: "May be caused by Leaf Blight.",
      wilting: "Check for Stem Borers or Root Rot.",
      holes: "Fall Armyworm damage likely.",
      rot: "Fusarium stalk rot or poor drainage."
    },
    tomato: {
      yellowing: "Possible early blight or nutrient deficiency.",
      spots: "Fungal spot diseases common in tomatoes.",
      wilting: "Verticillium or Fusarium wilt likely.",
      holes: "Tomato hornworms or caterpillars suspected.",
      rot: "Bacterial soft rot or blossom end rot."
    },
    cassava: {
      yellowing: "Cassava Mosaic Virus or iron deficiency.",
      spots: "Possible Cercospora leaf spot.",
      wilting: "Likely Cassava Brown Streak Disease.",
      holes: "Grasshoppers or mites may be responsible.",
      rot: "Root rot due to waterlogging."
    },
    rice: {
      yellowing: "Nitrogen deficiency or Rice Yellow Mottle Virus.",
      spots: "Blast disease or brown spot common.",
      wilting: "Could indicate water stress or bacterial wilt.",
      holes: "Likely from rice hispa or stem borers.",
      rot: "Sheath rot or bacterial blight likely."
    }
  };

  const diagnosis = diagnoses[crop]?.[symptom] || "No diagnosis found. Please consult an expert.";
  resultSection.textContent = `Diagnosis: ${diagnosis}`;
});
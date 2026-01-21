// curriculum.js
async function loadCurriculum(crop) {
  try {
    const response = await fetch(`/learning/data/vegetables/${crop}.json`);
    if (!response.ok) throw new Error("Curriculum not found");

    const data = await response.json();
    console.log("Curriculum loaded:", data);

    renderCurriculum(data); // Inject into DOM immediately
    return data;

  } catch (error) {
    console.error("Curriculum load error:", error);
  }
}

// Function to render overview and modules
function renderCurriculum(data) {
  // 1️⃣ Render Overview
  const overviewEl = document.getElementById("overview");
  if (overviewEl) overviewEl.textContent = data.overview.description;

  // 2️⃣ Render Modules
  data.modules.forEach(module => {
    const moduleContainer = document.getElementById(module.id);
    if (!moduleContainer) return;

    // Clear any existing content
    moduleContainer.innerHTML = `<h3>${module.title}</h3>`;

    for (const [level, items] of Object.entries(module.levels)) {
      if (!items || items.length === 0) continue;

      // Create Level Heading
      const levelHeading = document.createElement("h4");
      levelHeading.textContent = `${capitalize(level)} Level`;
      moduleContainer.appendChild(levelHeading);

      // Create List for items
      const ul = document.createElement("ul");
      items.forEach(item => {
        const li = document.createElement("li");
        li.textContent = item;
        ul.appendChild(li);
      });
      moduleContainer.appendChild(ul);
    }
  });
}

// Helper to capitalize first letter
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

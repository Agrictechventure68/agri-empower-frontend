document.addEventListener("DOMContentLoaded", () => {
‎  console.log("📦 Curriculum loader initialized");
‎
‎  const container = document.getElementById("curriculum-container");
‎  if (!container) return;
‎
‎  container.innerHTML = "<p>⏳ Loading curriculum...</p>";
‎});
‎
‎async function loadJSON(path) {
‎  try {
‎    const res = await fetch(path);
‎    if (!res.ok) throw new Error(`Failed to load ${path}`);
‎    return await res.json();
‎  } catch (err) {
‎    console.error(err);
‎    return null;
‎  }
‎}
‎
‎// 🔥 Main Render Function (Now Species-Aware)
‎async function renderCurriculum(trackKey) {
‎  const curriculumContainer = document.getElementById("curriculum-container");
‎  if (!curriculumContainer) return;
‎
‎  const jsonPath = `/data/${trackKey}.json`;
‎  const data = await loadJSON(jsonPath);
‎
‎  if (!data) {
‎    curriculumContainer.innerHTML = "<p>❌ Failed to load curriculum data.</p>";
‎    return;
‎  }
‎
‎  curriculumContainer.innerHTML = "";
‎
‎  // ✅ NEW STRUCTURE (Species-based like poultry.json)
‎  if (data.species) {
‎    data.species.forEach(specie => {
‎      const specieTitle = document.createElement("h2");
‎      specieTitle.textContent = specie.title;
‎      curriculumContainer.appendChild(specieTitle);
‎
‎      specie.modules.forEach(module => {
‎        renderModule(module, curriculumContainer);
‎      });
‎    });
‎  }
‎
‎  // ✅ OLD STRUCTURE (Direct modules like crops.json etc.)
‎  else if (data.modules) {
‎    data.modules.forEach(module => {
‎      renderModule(module, curriculumContainer);
‎    });
‎  }
‎
‎  else {
‎    curriculumContainer.innerHTML = "<p>⚠ No modules found in this curriculum.</p>";
‎  }
‎}
‎
‎
‎// 🔹 Reusable Module Renderer
‎function renderModule(module, container) {
‎  const moduleEl = document.createElement("div");
‎  moduleEl.className = "module";
‎
‎  const title = document.createElement("h3");
‎  title.textContent = module.title;
‎  moduleEl.appendChild(title);
‎
‎  for (const [levelKey, level] of Object.entries(module.levels)) {
‎    const levelEl = document.createElement("div");
‎    levelEl.className = "level";
‎
‎    const heading = document.createElement("h4");
‎    heading.textContent =
‎      `${levelKey.charAt(0).toUpperCase() + levelKey.slice(1)} Level`;
‎    levelEl.appendChild(heading);
‎
‎    if (level.content && level.content.length > 0) {
‎      const ul = document.createElement("ul");
‎      level.content.forEach(item => {
‎        const li = document.createElement("li");
‎        li.textContent = item;
‎        ul.appendChild(li);
‎      });
‎      levelEl.appendChild(ul);
‎    }
‎
‎    if (level.video) {
‎      const videoLink = document.createElement("a");
‎      videoLink.href = level.video;
‎      videoLink.target = "_blank";
‎      videoLink.textContent = "📺 Watch Video";
‎      videoLink.style.display = "block";
‎      levelEl.appendChild(videoLink);
‎    }
‎
‎    if (level.pdf) {
‎      const pdfLink = document.createElement("a");
‎      pdfLink.href = level.pdf;
‎      pdfLink.target = "_blank";
‎      pdfLink.textContent = "📄 Download PDF";
‎      pdfLink.style.display = "block";
‎      levelEl.appendChild(pdfLink);
‎    }
‎
‎    moduleEl.appendChild(levelEl);
‎  }
‎
‎  container.appendChild(moduleEl);
‎}
‎
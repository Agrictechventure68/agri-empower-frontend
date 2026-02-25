document.addEventListener("DOMContentLoaded", () => {
‎  console.log("📦 Curriculum loader initialized");
‎
‎  const container = document.getElementById("curriculum-container");
‎  if (!container) return;
‎
‎  container.innerHTML = "<p>⏳ Loading curriculum...</p>";
‎
‎  // Get track from URL
‎  const params = new URLSearchParams(window.location.search);
‎  const track = params.get("track");
‎
‎  if (track) {
‎    renderCurriculum(track);
‎  } else {
‎    container.innerHTML = "<p>⚠ No track selected.</p>";
‎  }
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
‎async function renderCurriculum(trackKey) {
‎  const curriculumContainer = document.getElementById("curriculum-container");
‎  if (!curriculumContainer) return;
‎
‎  // IMPORTANT: GitHub Pages path fix
‎  const jsonPath = `../data/${trackKey}.json`;
‎
‎  const data = await loadJSON(jsonPath);
‎
‎  if (!data) {
‎    curriculumContainer.innerHTML = "<p>❌ Failed to load curriculum data.</p>";
‎    return;
‎  }
‎
‎  curriculumContainer.innerHTML = "";
‎
‎  if (data.species) {
‎    data.species.forEach(specie => {
‎      const specieTitle = document.createElement("h2");
‎      specieTitle.textContent = specie.title;
‎      curriculumContainer.appendChild(specieTitle);
‎
‎      specie.modules.forEach(module => {
‎        renderModule(module, curriculumContainer, trackKey);
‎      });
‎    });
‎  }
‎
‎  else if (data.enterprises) {
  data.enterprises.forEach(enterprise => {
    renderEnterprise(enterprise, curriculumContainer, trackKey);
  });
}
‎
‎  else {
‎    curriculumContainer.innerHTML = "<p>⚠ No modules found.</p>";
‎  }
‎}
‎
‎function renderModule(module, container, trackKey) {
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
‎    const lessonBtn = document.createElement("button");
‎    lessonBtn.textContent = "Open Lesson";
‎    lessonBtn.className = "btn";
‎
‎    lessonBtn.onclick = () => {
  const params = new URLSearchParams({
    category: trackKey,
    topic: topicKey,
    enterprise: enterpriseKey,   // tomato or broilers
    pillar: pillarKey,           // production_management etc.
    level: levelKey
  });

  window.location.href = "learn.html?" + params.toString();
};
‎
‎    levelEl.appendChild(lessonBtn);
‎    moduleEl.appendChild(levelEl);
‎  }
‎
‎  container.appendChild(moduleEl);
‎}
‎
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
function renderModule(module, container, trackKey) {
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
‎    lessonBtn.style.display = "block";
‎
‎    lessonBtn.onclick = () => {
‎      const params = new URLSearchParams({
‎        track: trackKey,
‎        module: module.id,
‎        level: levelKey
‎      });
‎
‎      window.location.href = `lesson.html?${params.toString()}`;
‎    };
‎
‎    levelEl.appendChild(lessonBtn);
‎
‎    moduleEl.appendChild(levelEl);
‎  }
‎
‎  container.appendChild(moduleEl);
‎}
‎
‎  
‎
‎ 
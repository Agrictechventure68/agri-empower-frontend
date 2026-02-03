function getParam(name) {
  return new URLSearchParams(window.location.search).get(name);
}

const track = getParam("track");
const topic = getParam("topic");
const moduleKey = getParam("module");
const levelKey = getParam("level");

const container = document.getElementById("learning-container");

if (!track || !topic || !moduleKey || !levelKey) {
  container.innerHTML = "<p>❌ Invalid lesson link.</p>";
  throw new Error("Missing URL parameters");
}

const curriculum = window.AGRI_CURRICULUM;

const module =
  curriculum?.[track]?.topics?.[topic]?.modules?.[moduleKey];

if (!module) {
  container.innerHTML = "<p>❌ Module not found.</p>";
  throw new Error("Module not found");
}

const lesson = module.levels?.[levelKey];

if (!lesson) {
  container.innerHTML = "<p>❌ Lesson level not found.</p>";
  throw new Error("Lesson not found");
}

/* ---------- Breadcrumbs ---------- */
document.getElementById("breadcrumbs").innerHTML = `
  <small>
    ${track} → ${topic} → ${moduleKey} → <strong>${levelKey}</strong>
  </small>
`;

/* ---------- Lesson title ---------- */
document.getElementById("lesson-title").textContent =
  lesson.title || "Lesson";

/* ---------- Lesson content ---------- */
document.getElementById("lesson-content").innerHTML = `
  ${lesson.intro ? `<p>${lesson.intro}</p>` : ""}
  <div>${lesson.notes || "<em>No content yet.</em>"}</div>
`;

/* ---------- Navigation ---------- */
const levels = Object.keys(module.levels);
const currentIndex = levels.indexOf(levelKey);

const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");

if (currentIndex > 0) {
  prevBtn.disabled = false;
  prevBtn.onclick = () => {
    window.location.href =
      `learn.html?track=${track}&topic=${topic}&module=${moduleKey}&level=${levels[currentIndex - 1]}`;
  };
} else {
  prevBtn.disabled = true;
}

if (currentIndex < levels.length - 1) {
  nextBtn.disabled = false;
  nextBtn.onclick = () => {
    window.location.href =
      `learn.html?track=${track}&topic=${topic}&module=${moduleKey}&level=${levels[currentIndex + 1]}`;
  };
} else {
  nextBtn.disabled = true;
}

function getParam(name) {
  return new URLSearchParams(window.location.search).get(name);
}

const track = getParam("track");
const topic = getParam("topic");
const moduleKey = getParam("module");
const level = getParam("level");

if (!track || !topic || !moduleKey || !level) {
  document.getElementById("learning-container").innerHTML =
    "<p>❌ Invalid lesson link.</p>";
  throw new Error("Missing URL parameters");
}

const curriculum = window.AGRI_CURRICULUM;

const lesson =
  curriculum?.[track]?.topics?.[topic]?.modules?.[moduleKey]?.levels?.[level];

if (!lesson) {
  document.getElementById("learning-container").innerHTML =
    "<p>❌ Lesson not found.</p>";
  throw new Error("Lesson not found");
}

// Breadcrumbs
document.getElementById("breadcrumbs").innerHTML = `
  <small>
    ${track} → ${topic} → ${moduleKey} → <strong>${level}</strong>
  </small>
`;

// Lesson title
document.getElementById("lesson-title").textContent = lesson.title;

// Lesson content
document.getElementById("lesson-content").innerHTML = `
  <p>${lesson.intro || ""}</p>
  <div>${lesson.notes || "<em>No content yet.</em>"}</div>
`;

// Navigation
const levels = Object.keys(
  curriculum[track].topics[topic].modules[moduleKey].levels
);

const currentIndex = levels.indexOf(level);

const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");

if (currentIndex > 0) {
  prevBtn.onclick = () => {
    window.location.href =
      `learn.html?track=${track}&topic=${topic}&module=${moduleKey}&level=${levels[currentIndex - 1]}`;
  };
} else {
  prevBtn.disabled = true;
}

if (currentIndex < levels.length - 1) {
  nextBtn.onclick = () => {
    window.location.href =
      `learn.html?track=${track}&topic=${topic}&module=${moduleKey}&level=${levels[currentIndex + 1]}`;
  };
} else {
  nextBtn.disabled = true;
}
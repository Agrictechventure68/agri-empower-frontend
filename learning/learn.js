
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

// Render content
document.getElementById("lesson-title").textContent = lesson.title;

// Render NOTES (THIS WAS MISSING)
document.getElementById("lesson-content").innerHTML = `
  <p>${lesson.intro || ""}</p>
  <div>${lesson.notes || "<em>No content yet.</em>"}</div>
`;
    src="https://www.youtube.com/embed/${lesson.videoId}"
    frameborder="0"
    allowfullscreen>
  </iframe>
`;

document.getElementById("pdf-link").href = lesson.pdf;

// Navigation logic
const levels = Object.keys(
  curriculum[track].topics[topic].modules[moduleKey].levels
);

const currentIndex = levels.indexOf(level);

const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");

if (currentIndex > 0) {
  const prevLevel = levels[currentIndex - 1];
  prevBtn.onclick = () => {
    window.location.href =
      `learn.html?track=${track}&topic=${topic}&module=${moduleKey}&level=${prevLevel}`;
  };
} else {
  prevBtn.disabled = true;
}

if (currentIndex < levels.length - 1) {
  const nextLevel = levels[currentIndex + 1];
  nextBtn.onclick = () => {
    window.location.href =
      `learn.html?track=${track}&topic=${topic}&module=${moduleKey}&level=${nextLevel}`;
  };
} else {
  nextBtn.disabled = true;
}
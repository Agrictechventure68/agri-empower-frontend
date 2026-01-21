
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
  throw new Error("Lesson not found in curriculum");
}

// Render content
document.getElementById("lesson-title").textContent = lesson.title;
document.getElementById("lesson-description").textContent = lesson.description;

document.getElementById("video-container").innerHTML = `
  <iframe width="100%" height="400"
    src="https://www.youtube.com/embed/${lesson.videoId}"
    frameborder="0"
    allowfullscreen>
  </iframe>
`;

const pdfLink = document.getElementById("pdf-link");
pdfLink.href = lesson.pdf;

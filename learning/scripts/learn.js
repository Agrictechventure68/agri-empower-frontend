document.addEventListener("DOMContentLoaded", () => {
  console.log("✅ Learn page loaded");

  const lessonTitle = document.getElementById("lesson-title");
  const lessonContent = document.getElementById("lesson-content");
  const pdfLink = document.getElementById("pdf-link");
  const videoContainer = document.getElementById("video-container");

  const urlParams = new URLSearchParams(window.location.search);
  const trackKey = urlParams.get("track");
  const topicKey = urlParams.get("topic");
  const moduleKey = urlParams.get("module");
  const levelKey = urlParams.get("level");

  if (!trackKey || !topicKey || !moduleKey || !levelKey) {
    lessonTitle.textContent = "No lesson selected";
    lessonContent.textContent = "Please select a valid lesson from the roadmap.";
    pdfLink.style.display = "none";
    return;
  }

  const curriculum = window.AGRI_CURRICULUM;

  if (!curriculum || !curriculum[trackKey]) {
    lessonTitle.textContent = "Curriculum not found";
    return;
  }

  const track = curriculum[trackKey];
  const topic = track.topics?.[topicKey];
  const module = topic?.modules?.[moduleKey];
  const lesson = module?.levels?.[levelKey];

  if (!lesson) {
    lessonTitle.textContent = "Lesson not found";
    lessonContent.textContent = "This lesson does not exist in the curriculum.";
    return;
  }

  /* ---------- TITLE ---------- */
  lessonTitle.textContent =
    `${track.name} → ${topic.name} → ${module.name} (${levelKey.toUpperCase()})`;

  /* ---------- CONTENT ---------- */
  let html = "";

  if (lesson.summary) {
    html += `<p><strong>${lesson.summary}</strong></p>`;
  }

  if (Array.isArray(lesson.content)) {
    html += `
      <ul>
        ${lesson.content.map(item => `<li>${item}</li>`).join("")}
      </ul>
    `;
  }

  if (!html) html = "<p>No content available yet.</p>";

  lessonContent.innerHTML = html;

  /* ---------- PDF ---------- */
  if (lesson.pdf) {
    pdfLink.href = lesson.pdf;
    pdfLink.style.display = "inline";
  } else {
    pdfLink.style.display = "none";
  }

  /* ---------- VIDEO ---------- */
  videoContainer.innerHTML = "";

  if (lesson.video) {
    if (lesson.video.includes("youtube")) {
      const videoId = lesson.video.includes("youtu.be")
        ? lesson.video.split("/").pop()
        : lesson.video.split("v=")[1];

      videoContainer.innerHTML = `
        <iframe width="100%" height="400"
          src="https://www.youtube.com/embed/${videoId}"
          frameborder="0"
          allowfullscreen>
        </iframe>
      `;
    }
  }

  /* ---------- SIMPLE NEXT/PREV ---------- */

  const levelKeys = Object.keys(module.levels);
  const currentIndex = levelKeys.indexOf(levelKey);

  document.getElementById("prev-btn")?.addEventListener("click", () => {
    if (currentIndex > 0) {
      const prevLevel = levelKeys[currentIndex - 1];
      window.location.href =
        `learn.html?track=${trackKey}&topic=${topicKey}&module=${moduleKey}&level=${prevLevel}`;
    }
  });

  document.getElementById("next-btn")?.addEventListener("click", () => {
    if (currentIndex < levelKeys.length - 1) {
      const nextLevel = levelKeys[currentIndex + 1];
      window.location.href =
        `learn.html?track=${trackKey}&topic=${topicKey}&module=${moduleKey}&level=${nextLevel}`;
    }
  });

});





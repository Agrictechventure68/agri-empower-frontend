document.addEventListener("DOMContentLoaded", async () => {
  console.log("✅ Agri_Empower Learning JS Loaded");

  const lessonTitle = document.getElementById("lesson-title");
  const lessonContent = document.getElementById("lesson-content");
  const pdfLink = document.getElementById("pdf-link");
  const videoContainer = document.getElementById("video-container");

  // Read query parameters
  const urlParams = new URLSearchParams(window.location.search);
  const trackKey = urlParams.get("track");     // e.g., crops, livestock
  const topicKey = urlParams.get("topic");     // e.g., vegetables
  const moduleKey = urlParams.get("module");   // e.g., production
  const levelKey = urlParams.get("level");     // foundation, intermediate...

  if (!trackKey || !topicKey || !moduleKey || !levelKey) {
    lessonTitle.textContent = "No lesson selected";
    lessonContent.textContent = "Please select a valid lesson from the curriculum.";
    pdfLink.style.display = "none";
    return;
  }

  // Determine JSON path
  const jsonPath = `/data/${trackKey}/${topicKey}.json`;

  try {
    const res = await fetch(jsonPath);
    if (!res.ok) throw new Error("Lesson JSON not found: " + jsonPath);
    const data = await res.json();

    // Get module and level
    const module = data.modules.find(m => m.id === moduleKey);
    if (!module) throw new Error("Module not found: " + moduleKey);

    const lesson = module.levels[levelKey];
    if (!lesson) throw new Error("Level not found: " + levelKey);

    // Populate title and content
    lessonTitle.textContent = lesson.title || "Untitled Lesson";
    lessonContent.innerHTML = lesson.content
      ? `<ul>${lesson.content.map(i => `<li>${i}</li>`).join("")}</ul>`
      : "<p>No content available yet.</p>";

    // PDF
    if (lesson.pdf) {
      pdfLink.href = lesson.pdf;
      pdfLink.style.display = "inline";
    } else {
      pdfLink.style.display = "none";
    }

    // Video
    if (lesson.video) {
      videoContainer.innerHTML = `
        <video width="100%" controls>
          <source src="${lesson.video}" type="video/mp4">
          Your browser does not support the video tag.
        </video>
      `;
    } else {
      videoContainer.innerHTML = "";
    }

  } catch (err) {
    console.error(err);
    lessonTitle.textContent = "Error loading lesson";
    lessonContent.textContent = err.message;
    pdfLink.style.display = "none";
    videoContainer.innerHTML = "";
  }

  // Navigation placeholders
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");

  prevBtn?.addEventListener("click", () => alert("Previous lesson navigation coming soon!"));
  nextBtn?.addEventListener("click", () => alert("Next lesson navigation coming soon!"));
});

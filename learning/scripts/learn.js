
document.addEventListener("DOMContentLoaded", () => {
  console.log("✅ Agri_Empower Learning JS Loaded");

  const lessonTitle = document.getElementById("lesson-title");
  const lessonContent = document.getElementById("lesson-content");
  const pdfLink = document.getElementById("pdf-link");
  const videoContainer = document.getElementById("video-container");

  // Read query parameters
  const urlParams = new URLSearchParams(window.location.search);
  const trackKey = urlParams.get("track");
  const topicKey = urlParams.get("topic");
  const moduleKey = urlParams.get("module");
  const levelKey = urlParams.get("level");

  const curriculum = window.AGRI_CURRICULUM;

  if (!trackKey || !topicKey || !moduleKey || !levelKey) {
    lessonTitle.textContent = "No lesson selected";
    lessonContent.textContent = "Please select a valid lesson from the curriculum.";
    pdfLink.style.display = "none";
    return;
  }

  // Fetch lesson data from curriculum.js
  const lesson =
    curriculum?.[trackKey]?.topics?.[topicKey]?.modules?.[moduleKey]?.levels?.[levelKey];

  if (!lesson) {
    lessonTitle.textContent = "Lesson not found";
    lessonContent.textContent = "The requested lesson data could not be located.";
    pdfLink.style.display = "none";
    return;
  }

  // Populate title, content, PDF
  lessonTitle.textContent = lesson.title || "Untitled Lesson";
  lessonContent.innerHTML = lesson.content || "<p>No content available yet.</p>";

  if (lesson.pdf) {
    pdfLink.href = lesson.pdf;
    pdfLink.style.display = "inline";
  } else {
    pdfLink.style.display = "none";
  }

  // Optional video
  if (lesson.video) {
    videoContainer.innerHTML = `
      <video width="100%" controls>
        <source src="${lesson.video}" type="video/mp4">
        Your browser does not support the video tag.
      </video>
    `;
  }

  // Placeholder for navigation (previous/next)
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");

  prevBtn.addEventListener("click", () => alert("Previous lesson navigation coming soon!"));
  nextBtn.addEventListener("click", () => alert("Next lesson navigation coming soon!"));
});

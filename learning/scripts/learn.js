document.addEventListener("DOMContentLoaded", async () => {
  console.log("✅ Agri_Empower Learning JS Loaded");

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
    lessonContent.textContent = "Please select a valid lesson from the curriculum.";
    pdfLink.style.display = "none";
    return;
  }

  const jsonPath = `/data/${trackKey}/${topicKey}.json`;
  console.log("📦 Loading lesson from:", jsonPath);

  try {
    const res = await fetch(jsonPath);
    if (!res.ok) throw new Error(`Lesson JSON not found (${jsonPath})`);
    const data = await res.json();

    const module = data.modules?.find(m => m.id === moduleKey);
    if (!module) throw new Error(`Module not found: ${moduleKey}`);

    const lesson = module.levels?.[levelKey];
    if (!lesson) throw new Error(`Level not found: ${levelKey}`);

    /* ---------- TITLE ---------- */
    lessonTitle.textContent = lesson.title || "Untitled Lesson";

    /* ---------- CONTENT ---------- */
    if (Array.isArray(lesson.content)) {
      lessonContent.innerHTML = `
        <ul>
          ${lesson.content.map(item => `<li>${item}</li>`).join("")}
        </ul>
      `;
    } else if (typeof lesson.content === "string") {
      lessonContent.innerHTML = lesson.content;
    } else {
      lessonContent.innerHTML = "<p>No content available yet.</p>";
    }

    /* ---------- PDF ---------- */
    if (lesson.pdf) {
      pdfLink.href = lesson.pdf;
      pdfLink.style.display = "inline";
    } else {
      pdfLink.style.display = "none";
    }

    /* ---------- VIDEO (YouTube + MP4) ---------- */
    videoContainer.innerHTML = "";

    if (lesson.video) {
      if (lesson.video.includes("youtube.com") || lesson.video.includes("youtu.be")) {
        const videoId = lesson.video.includes("youtu.be")
          ? lesson.video.split("/").pop()
          : lesson.video.split("v=")[1];

        videoContainer.innerHTML = `
          <iframe
            width="100%"
            height="400"
            src="https://www.youtube.com/embed/${videoId}"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen>
          </iframe>
        `;
      } else {
        videoContainer.innerHTML = `
          <video width="100%" controls>
            <source src="${lesson.video}" type="video/mp4">
            Your browser does not support the video tag.
          </video>
        `;
      }
    }

  } catch (err) {
    console.error("❌ Lesson load error:", err);
    lessonTitle.textContent = "Error loading lesson";
    lessonContent.textContent = err.message;
    pdfLink.style.display = "none";
    videoContainer.innerHTML = "";
  }

  /* ---------- NAVIGATION PLACEHOLDERS ---------- */
  document.getElementById("prev-btn")?.addEventListener("click", () =>
    alert("Previous lesson navigation coming soon!")
  );

  document.getElementById("next-btn")?.addEventListener("click", () =>
    alert("Next lesson navigation coming soon!")
  );
});


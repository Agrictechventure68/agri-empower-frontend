document.addEventListener("DOMContentLoaded", async () => {
  console.log("✅ Agri_Empower Learning JS Loaded");

  const lessonTitle = document.getElementById("lesson-title");
  const lessonContent = document.getElementById("lesson-content");
  const pdfLink = document.getElementById("pdf-link");
  const videoContainer = document.getElementById("video-container");

  const urlParams = new URLSearchParams(window.location.search);
  const category = urlParams.get("category"); // crops or livestock
  const topic = urlParams.get("topic");       // vegetables, poultry, etc.
  const moduleKey = urlParams.get("module");  // production, processing
  const levelKey = urlParams.get("level");    // foundation, intermediate

  if (!category || !topic || !moduleKey || !levelKey) {
    lessonTitle.textContent = "No lesson selected";
    lessonContent.textContent = "Please select a valid lesson from the curriculum.";
    pdfLink.style.display = "none";
    return;
  }

  const jsonPath = `../data/learning/${category}/${topic}.json`;
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
    lessonTitle.textContent =
      `${data.overview.title} - ${module.title} (${levelKey.toUpperCase()})`;

    /* ---------- CONTENT ---------- */
    let html = "";

    if (lesson.summary) {
      html += `<p><strong>${lesson.summary}</strong></p>`;
    }

    if (Array.isArray(lesson.content) && lesson.content.length > 0) {
      html += `
        <ul>
          ${lesson.content.map(item => `<li>${item}</li>`).join("")}
        </ul>
      `;
    }

    if (!html) {
      html = "<p>No content available yet.</p>";
    }

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

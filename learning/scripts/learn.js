

  document.addEventListener("DOMContentLoaded", async () => {
‎  console.log("✅ Agri_Empower Learning JS Loaded");
‎
‎  const lessonTitle = document.getElementById("lesson-title");
‎  const lessonContent = document.getElementById("lesson-content");
‎  const pdfLink = document.getElementById("pdf-link");
‎  const videoContainer = document.getElementById("video-container");
‎
‎  // ---- Read query parameters ----
‎  const params = new URLSearchParams(window.location.search);
‎  const category = params.get("category");  // crops / livestock
‎  const topic = params.get("topic");        // vegetables / poultry etc.
‎  const enterprise = params.get("enterprise"); // tomato / broilers etc.
‎  const pillar = params.get("pillar");      // production_management etc.
‎  const level = params.get("level");        // foundation / intermediate etc.
‎
‎  if (!category || !topic || !enterprise || !pillar || !level) {
‎    lessonTitle.textContent = "No lesson selected";
‎    lessonContent.textContent = "Please select a valid lesson from the curriculum.";
‎    pdfLink.style.display = "none";
‎    videoContainer.innerHTML = "";
‎    return;
‎  }
‎
‎  const jsonPath = `../data/${category}/${topic}/${enterprise}.json`;
‎  console.log("📦 Loading lesson from:", jsonPath);
‎
‎  try {
‎    const res = await fetch(jsonPath);
‎    if (!res.ok) throw new Error(`Lesson JSON not found (${jsonPath})`);
‎
‎    const data = await res.json();
‎    const pillarData = data.pillars?.[pillar];
‎    if (!pillarData) throw new Error(`Pillar not found: ${pillar}`);
‎
‎    const levelData = pillarData.levels?.[level];
‎    if (!levelData) throw new Error(`Level not found: ${level}`);
‎
‎    // ---- Display Title ----
‎    lessonTitle.textContent = `${data.title} - ${pillarData.title} (${level.toUpperCase()})`;
‎
‎    // ---- Display Content ----
‎    let html = "";
‎    if (levelData.summary) html += `<p><strong>${levelData.summary}</strong></p>`;
‎    if (Array.isArray(levelData.content) && levelData.content.length > 0) {
‎      html += `<ul>${levelData.content.map(item => `<li>${item}</li>`).join("")}</ul>`;
‎    }
‎    if (!html) html = "<p>No content available yet.</p>";
‎    lessonContent.innerHTML = html;
‎
‎    // ---- PDF Link ----
‎    if (levelData.pdf) {
‎      pdfLink.href = levelData.pdf;
‎      pdfLink.style.display = "inline";
‎    } else {
‎      pdfLink.style.display = "none";
‎    }
‎
‎    // ---- Video ----
‎    videoContainer.innerHTML = "";
‎    if (levelData.video) {
‎      if (levelData.video.includes("youtube.com") || levelData.video.includes("youtu.be")) {
‎        const videoId = levelData.video.includes("youtu.be")
‎          ? levelData.video.split("/").pop()
‎          : levelData.video.split("v=")[1].split("&")[0];
‎
‎        videoContainer.innerHTML = `
‎          <iframe
‎            width="100%"
‎            height="400"
‎            src="https://www.youtube.com/embed/${videoId}"
‎            frameborder="0"
‎            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
‎            allowfullscreen>
‎          </iframe>
‎        `;
‎      } else {
‎        videoContainer.innerHTML = `
‎          <video width="100%" controls>
‎            <source src="${levelData.video}" type="video/mp4">
‎            Your browser does not support the video tag.
‎          </video>
// ---- Navigation logic ----
‎const levels = Object.keys(pillarData.levels);
‎const currentIndex = levels.indexOf(level);
‎
‎const prevBtn = document.getElementById("prev-btn");
‎const nextBtn = document.getElementById("next-btn");
‎
‎if (prevBtn) {
‎  if (currentIndex > 0) {
‎    const prevLevel = levels[currentIndex - 1];
‎    prevBtn.disabled = false;
‎    prevBtn.onclick = () => {
‎      const p = new URLSearchParams({
‎        category,
‎        topic,
‎        enterprise,
‎        pillar,
‎        level: prevLevel
‎      });
‎      window.location.href = "learn.html?" + p.toString();
‎    };
‎  } else {
‎    prevBtn.disabled = true;
‎  }
‎}
‎
‎if (nextBtn) {
‎  if (currentIndex < levels.length - 1) {
‎    const nextLevel = levels[currentIndex + 1];
‎    nextBtn.disabled = false;
‎    nextBtn.onclick = () => {
‎      const p = new URLSearchParams({
‎        category,
‎        topic,
‎        enterprise,
‎        pillar,
‎        level: nextLevel
‎      });
‎      window.location.href = "learn.html?" + p.toString();
‎    };
‎  } else {
‎    nextBtn.disabled = true;
‎  }
‎}
‎
‎        `;
‎      }
‎    }
‎
‎  } catch (err) {
‎    console.error("❌ Lesson load error:", err);
‎    lessonTitle.textContent = "Error loading lesson";
‎    lessonContent.textContent = err.message;
‎    pdfLink.style.display = "none";
‎    videoContainer.innerHTML = "";
‎  }
‎
‎  
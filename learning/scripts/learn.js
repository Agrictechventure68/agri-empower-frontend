document.addEventListener("DOMContentLoaded", async () => {
‎  console.log("✅ Agri_Empower Learning JS Loaded");
‎
‎  const lessonTitle = document.getElementById("lesson-title");
‎  const lessonContent = document.getElementById("lesson-content");
‎  const pdfLink = document.getElementById("pdf-link");
‎  const videoContainer = document.getElementById("video-container");
‎  const prevBtn = document.getElementById("prev-btn");
‎  const nextBtn = document.getElementById("next-btn");
‎
‎  // ---- Read query parameters ----
‎  const params = new URLSearchParams(window.location.search);
‎  const category = params.get("category");
‎  const topic = params.get("topic");
‎  const enterprise = params.get("enterprise");
‎  const pillar = params.get("pillar");
‎  const level = params.get("level");
‎
‎  if (!category || !topic || !enterprise || !pillar || !level) {
‎    lessonTitle.textContent = "No lesson selected";
‎    lessonContent.textContent = "Please select a valid lesson from the curriculum.";
‎    return;
‎  }
‎
‎  const jsonPath = `../data/learning/${category}/${topic}/${enterprise}.json`;
‎  console.log("📦 Loading lesson from:", jsonPath);
‎
‎  try {
‎    const url = `../data/learning/${category}/${topic}/${enterprise}.json`;

const res = await fetch(url);

if (!res.ok) {
  throw new Error("JSON not found at " + url);
}

const data = await res.json();

if (!data) {
  throw new Error("Enterprise JSON could not be loaded");
}
if (!data) {
  throw new Error("Enterprise JSON could not be loaded");
}
‎    const pillarData = data[pillar];
‎    if (!pillarData) throw new Error(`Pillar not found`);
‎
‎    const levelData = pillarData.levels?.[level];
‎    if (!levelData) throw new Error(`Level not found`);
‎
‎    // ---- Display Title ----
‎    lessonTitle.textContent =
  `${enterprise.toUpperCase()} - ${pillarData.title} (${level.toUpperCase()})`;
‎
‎    // ---- Display Content ----
‎    let html = "";
‎
‎    if (levelData.summary) {
‎      html += `<p><strong>${levelData.summary}</strong></p>`;
‎    }
‎
‎    if (Array.isArray(levelData.content)) {
‎      html += `<ul>`;
‎      levelData.content.forEach(item => {
‎        html += `<li>${item}</li>`;
‎      });
‎      html += `</ul>`;
‎    }
‎
‎    if (!html) {
‎      html = "<p>No content available yet.</p>";
‎    }
‎
‎    lessonContent.innerHTML = html;
‎
‎    // ---- PDF ----
‎    if (pdfLink) {
‎      if (levelData.pdf) {
‎        pdfLink.href = levelData.pdf;
‎        pdfLink.style.display = "inline";
‎      } else {
‎        pdfLink.style.display = "none";
‎      }
‎    }
‎
‎    // ---- Video ----
‎    if (videoContainer) {
‎      videoContainer.innerHTML = "";
‎
‎      if (levelData.video) {
‎        if (
‎          levelData.video.includes("youtube.com") ||
‎          levelData.video.includes("youtu.be")
‎        ) {
‎          const videoId = levelData.video.includes("youtu.be")
‎            ? levelData.video.split("/").pop()
‎            : levelData.video.split("v=")[1]?.split("&")[0];
‎
‎          videoContainer.innerHTML = `
‎            <iframe
‎              width="100%"
‎              height="400"
‎              src="https://www.youtube.com/embed/${videoId}"
‎              frameborder="0"
‎              allowfullscreen>
‎            </iframe>
‎          `;
‎        } else {
‎          videoContainer.innerHTML = `
‎            <video width="100%" controls>
‎              <source src="${levelData.video}" type="video/mp4">
‎            </video>
‎          `;
‎        }
‎      }
‎    }
‎
‎    // ===============================
‎// NAVIGATION (FIXED + STABLE)
‎// ===============================
‎
‎const levelOrder = ["foundation", "intermediate", "advanced", "specialisation"];
‎
‎// Ensure levels exist safely
‎const availableLevels = levelOrder.filter(
‎  l => pillarData.levels && pillarData.levels[l]
‎);
‎
‎// Normalize level from URL
‎const normalizedLevel = level ? level.toLowerCase().trim() : "";
‎
‎const currentIndex = availableLevels.indexOf(normalizedLevel);
‎
‎console.log("📍 Available Levels:", availableLevels);
‎console.log("📍 Level from URL:", normalizedLevel);
‎console.log("📍 Current Index:", currentIndex);
‎
‎// PREVIOUS BUTTON
‎if (prevBtn) {
‎  prevBtn.disabled = currentIndex <= 0;
‎
‎  prevBtn.onclick = () => {
‎    if (currentIndex > 0) {
‎      navigateTo(availableLevels[currentIndex - 1]);
‎    }
‎  };
‎}
‎
‎// NEXT BUTTON
‎if (nextBtn) {
‎  nextBtn.disabled =
‎    currentIndex === -1 || currentIndex >= availableLevels.length - 1;
‎
‎  nextBtn.onclick = () => {
‎    if (currentIndex < availableLevels.length - 1) {
‎      navigateTo(availableLevels[currentIndex + 1]);
‎    }
‎  };
‎}
‎
‎// NAVIGATION FUNCTION
‎function navigateTo(targetLevel) {
‎  const newParams = new URLSearchParams({
‎    category,
‎    topic,
‎    enterprise,
‎    pillar,
‎    level: targetLevel
‎  });
‎
‎  window.location.href =
‎    window.location.pathname + "?" + newParams.toString();
‎}
‎
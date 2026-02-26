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
‎  const jsonPath = `../data/${category}/${topic}/${enterprise}.json`;
‎  console.log("📦 Loading lesson from:", jsonPath);
‎
‎  try {
‎    const res = await fetch(jsonPath);
‎    if (!res.ok) throw new Error(`Lesson JSON not found`);
‎
‎    const data = await res.json();
‎
‎    const pillarData = data.pillars?.[pillar];
‎    if (!pillarData) throw new Error(`Pillar not found`);
‎
‎    const levelData = pillarData.levels?.[level];
‎    if (!levelData) throw new Error(`Level not found`);
‎
‎    // ---- Display Title ----
‎    lessonTitle.textContent =
‎      `${data.title} - ${pillarData.title} (${level.toUpperCase()})`;
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
‎    // NAVIGATION (SAFE VERSION)
‎    // ===============================
‎
‎    const levelOrder = ["foundation", "intermediate", "advanced", "specialisation"];
‎
‎    const availableLevels = levelOrder.filter(l => pillarData.levels[l]);
‎    const currentIndex = availableLevels.indexOf(level);
‎
‎    console.log("📍 Current level:", level);
‎    console.log("📍 Current index:", currentIndex);
‎
‎    if (prevBtn) {
‎      if (currentIndex > 0) {
‎        prevBtn.disabled = false;
‎        prevBtn.onclick = () => {
‎          navigateTo(availableLevels[currentIndex - 1]);
‎        };
‎      } else {
‎        prevBtn.disabled = true;
‎      }
‎    }
‎
‎    if (nextBtn) {
‎      if (currentIndex < availableLevels.length - 1) {
‎        nextBtn.disabled = false;
‎        nextBtn.onclick = () => {
‎          navigateTo(availableLevels[currentIndex + 1]);
‎        };
‎      } else {
‎        nextBtn.disabled = true;
‎      }
‎    }
‎
‎    function navigateTo(targetLevel) {
‎      const newParams = new URLSearchParams({
‎        category,
‎        topic,
‎        enterprise,
‎        pillar,
‎        level: targetLevel
‎      });
‎
‎      window.location.href = "learn.html?" + newParams.toString();
‎    }
‎
‎  } catch (err) {
‎    console.error("❌ Lesson load error:", err);
‎    lessonTitle.textContent = "Error loading lesson";
‎    lessonContent.textContent = err.message;
‎  }
‎});
‎
  
‎  
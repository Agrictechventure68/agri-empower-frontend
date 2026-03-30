document.addEventListener("DOMContentLoaded", () => {
  console.log("📦 Enterprise Curriculum Loader Initialized");

  const container = document.getElementById("curriculum-container");
  if (!container) return;

  container.innerHTML = "<p>⏳ Loading curriculum...</p>";

  const params = new URLSearchParams(window.location.search);
  const track = params.get("track");

  if (!track) {
    container.innerHTML = "<p>⚠ No track selected.</p>";
    return;
  }

  renderCurriculum(track);
});


/* -----------------------------
   GENERIC JSON LOADER
------------------------------ */
async function loadJSON(path) {
  try {
    const res = await fetch(path);
    if (!res.ok) throw new Error(`Failed to load ${path}`);
    return await res.json();
  } catch (err) {
    console.warn("❌", err.message);
    return null;
  }
}


/* -----------------------------
   MAIN RENDER FUNCTION
------------------------------ */
async function renderCurriculum(trackKey) {

  const container = document.getElementById("curriculum-container");
  container.innerHTML = "";

  // Define subtracks per major track
  const subTracks = {
    crops: ["vegetables", "food_crops", "cash_crops", "medicinal_crops"],
    livestock: ["land_animals", "poultry", "aquaculture", "beekeeping"]
  };

  if (!subTracks[trackKey]) {
    container.innerHTML = "<p>⚠ Invalid track selected.</p>";
    return;
  }

  for (const subTrack of subTracks[trackKey]) {

    const subTitle = document.createElement("h2");
    subTitle.textContent = formatTitle(subTrack);
    container.appendChild(subTitle);

    const enterprises = await loadEnterprises(trackKey, subTrack);

    if (enterprises.length === 0) {
      const emptyMsg = document.createElement("p");
      emptyMsg.textContent = "No enterprises available yet.";
      container.appendChild(emptyMsg);
      continue;
    }

    enterprises.forEach(data => {
      renderEnterprise(data, container, trackKey, subTrack);
    });
  }
}


/* -----------------------------
   LOAD ENTERPRISE FILES
------------------------------ */
async function loadEnterprises(trackKey, subTrack) {

  const knownFiles = {
    vegetables: ["tomato"],
    food_crops: ["cassava"],
    cash_crops: ["avocado"],
    medicinal_crops: ["lemongrass"],
    land_animals: ["snail"],
    poultry: ["broilers"],
    aquaculture: ["catfish"],
    beekeeping: ["beekeeping"]
  };

  const enterprises = [];

  if (!knownFiles[subTrack]) return enterprises;

  for (const file of knownFiles[subTrack]) {
    const path = `../data/${trackKey}/${subTrack}/${file}.json`;
    const data = await loadJSON(path);
    if (data) enterprises.push(data);
  }

  return enterprises;
}


/* -----------------------------
   RENDER ENTERPRISE STRUCTURE
------------------------------ */
function renderEnterprise(data, container, trackKey, subTrack) {

  const enterpriseBox = document.createElement("div");
  enterpriseBox.className = "enterprise";

  const title = document.createElement("h3");
  title.textContent = data.title || data.enterprise;
  enterpriseBox.appendChild(title);

  if (!data.pillars) {
    const msg = document.createElement("p");
    msg.textContent = "No pillars defined.";
    enterpriseBox.appendChild(msg);
    container.appendChild(enterpriseBox);
    return;
  }

  Object.entries(data.pillars).forEach(([pillarKey, pillar]) => {

    const pillarTitle = document.createElement("h4");
    pillarTitle.textContent = pillar.title;
    enterpriseBox.appendChild(pillarTitle);

    if (!pillar.levels) return;

    Object.entries(pillar.levels).forEach(([levelKey, level]) => {

      const levelBtn = document.createElement("button");
      levelBtn.className = "btn";
      levelBtn.textContent = formatTitle(levelKey);

      levelBtn.onclick = () => {
        const params = new URLSearchParams({
          category: trackKey,
          subtrack: subTrack,
          enterprise: data.enterprise,
          pillar: pillarKey,
          level: levelKey
        });

        window.location.href = "learn.html?" + params.toString();
      };

      enterpriseBox.appendChild(levelBtn);
    });

  });

  container.appendChild(enterpriseBox);
}


/* -----------------------------
   FORMAT HELPER
------------------------------ */
function formatTitle(text) {
  return text
    .replace(/_/g, " ")
    .replace(/\b\w/g, char => char.toUpperCase());
}

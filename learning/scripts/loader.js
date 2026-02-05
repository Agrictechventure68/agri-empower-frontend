document.addEventListener("DOMContentLoaded", () => {
  console.log("📦 Loader initialized");

  const container = document.getElementById("curriculum-container");

  if (container) {
    container.innerHTML = "<p>⏳ Loading curriculum...</p>";
  }
});

async function loadJSON(path) {
  try {
    const res = await fetch(path);
    if (!res.ok) throw new Error(`Failed to load ${path}`);
    return await res.json();
  } catch (err) {
    console.error(err);
    return null;
  }
}
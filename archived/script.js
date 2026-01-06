console.log("Agri_Empower frontend script loaded");

document.addEventListener("DOMContentLoaded", () => {
  const learnBtn = document.getElementById("nav-learn");
  const mainContent = document.getElementById("main-content");

  if (learnBtn && mainContent) {
    learnBtn.addEventListener("click", (e) => {
      e.preventDefault();

      mainContent.innerHTML = `
        <h2>📘 Learning Hub</h2>
        <p>Access tutorials and farming courses here.</p>
        <ul>
          <li>Crop Farming</li>
          <li>Livestock Farming</li>
          <li>Agro-processing</li>
          <li>Disease & Pest Diagnostics</li>
        </ul>
      `;
    });
  }
});

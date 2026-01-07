console.log("Agri_Empower frontend loaded successfully");
‎
‎/* Run after page loads */
‎document.addEventListener("DOMContentLoaded", () => {
‎
‎  /* Language selector (future-ready) */
‎  const languageSelector = document.getElementById("languageSelector");
‎
‎  if (languageSelector) {
‎    languageSelector.addEventListener("change", () => {
‎      const lang = languageSelector.value;
‎
‎      alert(
‎        "Language switching to '" +
‎        languageSelector.options[languageSelector.selectedIndex].text +
‎        "' will be available soon 🌍"
‎      );
‎
‎      console.log("Selected language:", lang);
‎    });
‎  }
‎
‎  /* Simple button interaction feedback */
‎  const buttons = document.querySelectorAll(".btn");
‎
‎  buttons.forEach(btn => {
‎    btn.addEventListener("click", () => {
‎      console.log("User clicked:", btn.textContent.trim());
‎    });
‎  });
‎
‎});
‎

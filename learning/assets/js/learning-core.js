Js
document.addEventListener("DOMContentLoaded", () => {
  console.log("Agri_Empower Learning Module Loaded");

  const actionButtons = document.querySelectorAll(".btn");

  actionButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      console.log("[Learning Interaction]:", btn.textContent.trim());
    });
  });
});
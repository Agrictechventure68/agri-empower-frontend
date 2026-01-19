/* ======================================================
   Agri_Empower – Learning Modules Controller
   Handles species-level module visibility
   ====================================================== */

function showModule(id, button) {
  // Hide all module sections
  document.querySelectorAll('.module-content').forEach(section => {
    section.classList.remove('active');
  });

  // Show the selected module
  const target = document.getElementById(id);
  if (target) {
    target.classList.add('active');
  }

  // Update active tab
  document.querySelectorAll('.tab').forEach(tab => {
    tab.classList.remove('active');
  });

  if (button) {
    button.classList.add('active');
  }
}


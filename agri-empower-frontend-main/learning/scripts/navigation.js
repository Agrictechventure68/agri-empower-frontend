document.addEventListener("DOMContentLoaded", () => {

  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");

  if (!prevBtn || !nextBtn) {
    console.log("Navigation buttons not found on this page.");
    return;
  }

  console.log("Navigation system ready");

});
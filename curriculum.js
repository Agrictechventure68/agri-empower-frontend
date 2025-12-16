document.addEventListener("DOMContentLoaded", () => {
  fetch("public/curriculum-data.json")
    .then(res => res.json())
    .then(courses => renderCurriculum(courses))
    .catch(err => {
      console.error("Curriculum load error:", err);
      document.getElementById("curriculum-list").innerHTML =
        "<p>Unable to load curriculum.</p>";
    });
});

function renderCurriculum(courses) {
  const list = document.getElementById("curriculum-list");
  list.innerHTML = "";

  courses.forEach(course => {
    const card = document.createElement("div");
    card.className = "curriculum-card";

    card.innerHTML = `
      <h3>${course.title}</h3>
      <p><strong>Category:</strong> ${course.category}</p>
      <p>${course.description}</p>
      <p><strong>Duration:</strong> ${course.duration}</p>
      <p><strong>Level:</strong> ${course.level}</p>
      <a href="${course.link}" target="_blank">View Material</a>
    `;

    list.appendChild(card);
  });
}


document.addEventListener("DOMContentLoaded", initCurriculum);

async function initCurriculum() {
  try {
    const response = await fetch("../data/curriculum/curriculum-data.json");

    if (!response.ok) {
      throw new Error("Failed to fetch curriculum data");
    }

    const courses = await response.json();
    renderCurriculum(courses);

  } catch (error) {
    console.error("Curriculum load error:", error);
    const container = document.getElementById("curriculum-list");
    if (container) {
      container.innerHTML = "<p>Unable to load curriculum at this time.</p>";
    }
  }
}

function renderCurriculum(courses) {
  const list = document.getElementById("curriculum-list");
  if (!list) return;

  list.innerHTML = "";

  courses.forEach(course => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <h3>${course.title}</h3>
      <p><strong>Category:</strong> ${course.category}</p>
      <p>${course.description}</p>
      <p><strong>Duration:</strong> ${course.duration}</p>
      <p><strong>Level:</strong> ${course.level}</p>
      <a class="btn" href="${course.link}" target="_blank">View Material</a>
    `;

    list.appendChild(card);
  });
}

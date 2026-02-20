document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("roadmap-container");

  const urlParams = new URLSearchParams(window.location.search);
  const category = urlParams.get("category"); // crops or livestock
  const topic = urlParams.get("topic");       // vegetables, poultry

  if (!category || !topic) {
    container.innerHTML = "<p>No roadmap selected.</p>";
    return;
  }

  const jsonPath = `../data/learning/${category}/${topic}.json`;

  try {
    const res = await fetch(jsonPath);
    if (!res.ok) throw new Error("Curriculum not found");

    const data = await res.json();

    let html = `<h2>${data.overview.title}</h2>`;
    html += `<p>${data.overview.description}</p>`;

    data.modules.forEach(module => {
      html += `<div class="module-block">`;
      html += `<h3>${module.title}</h3>`;

      Object.keys(module.levels).forEach(levelKey => {
        html += `
          <a class="lesson-link"
             href="learn.html?category=${category}&topic=${topic}&module=${module.id}&level=${levelKey}">
             ${levelKey.toUpperCase()}
          </a><br/>
        `;
      });

      html += `</div><hr/>`;
    });

    container.innerHTML = html;

  } catch (err) {
    container.innerHTML = `<p>Error loading roadmap: ${err.message}</p>`;
  }
});

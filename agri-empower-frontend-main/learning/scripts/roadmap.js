const roadmapData = [
{
title: "🐔 Poultry Foundation Level",
description: "Learn the basics of poultry farming including housing, feeding, breed selection, and health management.",
pdf: "../assets/docs/poultry/poultry-foundation-guide.pdf"
},
{
title: "🌶 Pepper Farming (Foundation)",
description: "Introduction to pepper farming, nursery preparation, transplanting, and early care.",
pdf: "#"
},
{
title: "🍅 Tomato Farming (Foundation)",
description: "Learn tomato cultivation, soil preparation, spacing, watering, and pest control.",
pdf: "#"
}
];

let currentIndex = 0;

const content = document.getElementById("roadmap-content");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");

function renderRoadmap() {
const item = roadmapData[currentIndex];

```
content.innerHTML = `
    <h2>${item.title}</h2>
    <p>${item.description}</p>

    <a href="${item.pdf}" target="_blank">
        📄 Open Guide
    </a>

    <div class="navigation-buttons" style="margin-top:20px;">
        <button id="prev-btn">⬅ Previous</button>
        <button id="next-btn">Next ➡</button>
    </div>
`;

attachEvents();
```

}

function attachEvents() {
document.getElementById("prev-btn").addEventListener("click", () => {
if (currentIndex > 0) {
currentIndex--;
renderRoadmap();
}
});

```
document.getElementById("next-btn").addEventListener("click", () => {
    if (currentIndex < roadmapData.length - 1) {
        currentIndex++;
        renderRoadmap();
    }
});
```

}

// Load first item
document.addEventListener("DOMContentLoaded", renderRoadmap);

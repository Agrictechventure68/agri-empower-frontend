document.addEventListener("DOMContentLoaded", function () {
console.log("✅ learn.js loaded successfully");

```
const lessonTitle = document.getElementById("lesson-title");
const lessonContent = document.getElementById("lesson-content");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");

// Test content
if (lessonTitle) {
    lessonTitle.textContent = "🐔 Poultry Foundation Level";
}

if (lessonContent) {
    lessonContent.innerHTML = `
        <p>Welcome to Agri-Empower Learning.</p>
        <ul>
            <li>Introduction to poultry farming</li>
            <li>Housing and equipment</li>
            <li>Feed and nutrition basics</li>
            <li>Health and vaccination</li>
        </ul>
    `;
}

if (prevBtn) {
    prevBtn.onclick = function () {
        alert("Previous clicked");
    };
}

if (nextBtn) {
    nextBtn.onclick = function () {
        alert("Next clicked");
    };
}
```

});

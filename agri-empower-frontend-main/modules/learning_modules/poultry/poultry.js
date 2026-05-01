function showSection(type) {
    const content = document.getElementById("learning-content");

    if (type === "broiler") {
        content.innerHTML = `
            <h2>Broiler Production</h2>
            <p>Focus on meat production within 6–8 weeks.</p>
        `;
    }

    if (type === "layer") {
        content.innerHTML = `
            <h2>Layer Production</h2>
            <p>Focus on egg production and long-term care.</p>
        `;
    }
}
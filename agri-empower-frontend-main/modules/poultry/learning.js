export function showSection(type) {

    const content = document.getElementById("learning-content");

    if (type === "broiler") {

        content.innerHTML = `
            <h2>Broiler Production</h2>

            <p>
                Learn broiler production systems,
                feeding, housing and management.
            </p>
        `;
    }

    if (type === "layer") {

        content.innerHTML = `
            <h2>Layer Production</h2>

            <p>
                Learn commercial egg production systems.
            </p>
        `;
    }
}

window.showSection = showSection;
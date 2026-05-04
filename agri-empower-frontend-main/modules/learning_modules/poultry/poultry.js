const poultryContainer = document.getElementById("poultry-container");


// Fetch poultry data from Django backend
async function loadPoultry() {
    try {

        const response = await fetch("http://127.0.0.1:8000/api/poultry/");

        const data = await response.json();

        poultryContainer.innerHTML = "";

        data.forEach(item => {

            poultryContainer.innerHTML += `
                <div class="poultry-card">
                    <h3>${item.title}</h3>
                    <p>${item.description}</p>
                </div>
            `;
        });

    } catch (error) {

        poultryContainer.innerHTML = `
            <p>Failed to load poultry data.</p>
        `;

        console.error(error);
    }
}


// Load immediately
loadPoultry();


// Broiler / Layer section switcher
function showSection(type) {

    const content = document.getElementById("learning-content");

    if (type === "broiler") {

        content.innerHTML = `
            <h2>Broiler Production</h2>

            <p>
                Broilers are raised mainly for meat production.
                They grow rapidly within 6–8 weeks.
            </p>

            <ul>
                <li>Housing & Ventilation</li>
                <li>Starter → Grower → Finisher Feed</li>
                <li>Disease Prevention</li>
                <li>Weight Management</li>
            </ul>
        `;
    }

    if (type === "layer") {

        content.innerHTML = `
            <h2>Layer Production</h2>

            <p>
                Layers are raised mainly for egg production.
            </p>

            <ul>
                <li>Lighting Management</li>
                <li>Egg Collection</li>
                <li>Vaccination</li>
                <li>Feed Formulation</li>
            </ul>
        `;
    }
}
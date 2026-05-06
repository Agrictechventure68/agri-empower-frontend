import { fetchPoultryData } from "./poultry-api.js";

const poultryContainer = document.getElementById("poultry-container");

export async function renderPoultryCards() {

    try {

        const data = await fetchPoultryData();

        poultryContainer.innerHTML = data.map(item => `
            <div class="poultry-card">

                <h3>${item.title}</h3>

                <p>${item.description}</p>

            </div>
        `).join("");

    } catch (error) {

        poultryContainer.innerHTML = `
            <p>Failed to load poultry records.</p>
        `;

        console.error(error);
    }
}

renderPoultryCards();
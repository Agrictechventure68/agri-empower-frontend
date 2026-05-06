export async function fetchPoultryData() {

    const response = await fetch(
        "http://127.0.0.1:8000/api/poultry/"
    );

    if (!response.ok) {
        throw new Error("Failed to fetch poultry data");
    }

    return await response.json();
}
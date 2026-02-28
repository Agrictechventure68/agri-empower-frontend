export async function fetchLearningData(category, topic, enterprise) {

  const USE_API = false; // 🔁 change to true when backend ready

  if (USE_API) {
    const base = "https://your-backend-domain.com/api/v1";
    const url = `${base}/learning/${category}/${topic}/${enterprise}/`;
    const response = await fetch(url);
    if (!response.ok) throw new Error("API fetch failed");
    return await response.json();
  } else {
    const url = `../data/learning/${category}/${topic}/${enterprise}.json`;
    const response = await fetch(url);
    if (!response.ok) throw new Error("Static JSON not found");
    return await response.json();
  }
}
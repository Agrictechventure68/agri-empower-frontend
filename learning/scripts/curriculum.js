async function loadCurriculum(crop) {
  try {
    const response = await fetch(`/learning/data/vegetables/${crop}.json`);
    if (!response.ok) throw new Error("Curriculum not found");

    const data = await response.json();
    console.log("Curriculum loaded:", data);
    return data;

  } catch (error) {
    console.error("Curriculum load error:", error);
  }
}

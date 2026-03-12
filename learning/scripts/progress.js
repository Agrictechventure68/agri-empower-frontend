function saveProgress(key, value) {
  localStorage.setItem(key, value);
}

function getProgress(key) {
  return localStorage.getItem(key);
}

function markLessonComplete(enterprise, pillar, level) {

  const progressKey = `${enterprise}_${pillar}_${level}`;

  saveProgress(progressKey, "completed");

  console.log("Progress saved:", progressKey);

}
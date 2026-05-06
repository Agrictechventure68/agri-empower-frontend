export function submitAssessment() {

    const answer1 =
        document.getElementById("answer1").value;

    if (answer1.trim() === "") {

        alert("Please answer all questions.");

        return;
    }

    alert("Assessment submitted successfully.");
}

window.submitAssessment = submitAssessment;
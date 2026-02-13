
// Detect how deep the current file is
const path = window.location.pathname;
let base = "";

// If inside learning or modules, adjust path
if (path.includes("/learning/")) {
  base = "../";
} else if (path.includes("/modules/")) {
  base = "../../";
} else {
  base = "";
}

document.getElementById("header").innerHTML = `
<header>
  <h1>Agri_Empower</h1>
  <nav>
    <a href="${base}index.html">Home</a>
    <a href="${base}learning/index.html">Learning Hub</a>
    <a href="${base}learning/curriculum.html">Curriculum</a>
    <a href="${base}modules/diagnostic/diagnostic.html">Diagnostics</a>
    <a href="${base}profile.html">Register</a>
    <a href="${base}farmers.html">Farmers</a>
    <a href="${base}about.html">About</a>
    <a href="${base}contact.html">Contact</a>
  </nav>
</header>
`;

document.getElementById("footer").innerHTML = `
<footer>
  <p>&copy; 2025 Agri_Empower | Bright Doro AgricTech Venture</p>
</footer>
`;

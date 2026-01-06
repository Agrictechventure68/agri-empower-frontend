import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabase = createClient(
  "https://jdhmhavvqfeeyostvoai.supabase.co",
  "sb_publishable_uVbmMWBOdjGUR0Q0ZoBzcg_8uL9ZSkJ"
);

async function loadFarmers() {
  const { data, error } = await supabase
    .from("farmers")
    .select("*")
    .order("created_at", { ascending: false });

  const grid = document.getElementById("farmersGrid");
  const emptyMsg = document.getElementById("emptyMsg");

  if (error) {
    emptyMsg.textContent = "❌ Unable to load farmers.";
    console.error(error);
    return;
  }

  if (!data || data.length === 0) {
    emptyMsg.textContent = "No farmers registered yet.";
    return;
  }

  grid.innerHTML = "";

  data.forEach(f => {
    grid.innerHTML += `
      <div class="card">
        <h3>${f.full_name}</h3>
        <p><strong>Phone:</strong> ${f.phone}</p>
        <p><strong>Location:</strong> ${f.location || "—"}</p>
        <p><strong>Specialisation:</strong> ${f.specialisation || "—"}</p>
        <p><strong>Language:</strong> ${f.language || "—"}</p>
      </div>
    `;
  });
}

window.addEventListener("DOMContentLoaded", loadFarmers);

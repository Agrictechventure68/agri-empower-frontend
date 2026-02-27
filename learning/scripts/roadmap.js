console.log("🚀 ROADMAP JS LOADED");
‎document.addEventListener("DOMContentLoaded", async () => {
‎
‎  const container = document.getElementById("roadmap-content");
‎  container.innerHTML = "";
‎
‎  // =====================================
‎  // STRUCTURE CONFIGURATION
‎  // =====================================
‎
‎  const structure = {
‎    crops: {
‎      vegetables: ["tomato", "ugu"],
‎      food_crops: ["maize", "cassava"],
‎      medicinal_crops: ["moringa"]
‎    },
‎    livestock: {
‎      poultry: ["broiler", "layer"],
‎      beekeeping: ["honey_production"],
‎      land_animals: ["goat"],
‎      aquaculture: ["catfish"]
‎    }
‎  };
‎
‎  const pillars = ["production", "processing", "agribusiness"];
‎  const levels = ["foundation", "intermediate", "advanced", "specialisation"];
‎
‎  // =====================================
‎  // GENERATE ROADMAP
‎  // =====================================
‎
‎  for (const category in structure) {
‎
‎    const categoryBlock = document.createElement("div");
‎    categoryBlock.innerHTML = `<h2>${category.toUpperCase()}</h2>`;
‎    container.appendChild(categoryBlock);
‎
‎    for (const topic in structure[category]) {
‎
‎      const topicBlock = document.createElement("div");
‎      topicBlock.innerHTML = `<h3>${topic.replace("_", " ").toUpperCase()}</h3>`;
‎      container.appendChild(topicBlock);
‎
‎      structure[category][topic].forEach(enterprise => {
‎
‎        const enterpriseBlock = document.createElement("div");
‎        enterpriseBlock.style.marginLeft = "20px";
‎        enterpriseBlock.innerHTML = `<h4>${enterprise.toUpperCase()}</h4>`;
‎
‎        pillars.forEach(pillar => {
‎
‎          const pillarBlock = document.createElement("div");
‎          pillarBlock.style.marginLeft = "20px";
‎          pillarBlock.innerHTML = `<strong>${pillar.toUpperCase()}</strong><br/>`;
‎
‎          levels.forEach(level => {
‎
‎            const link = document.createElement("a");
‎
‎            link.href =
‎              `learn.html?category=${category}` +
‎              `&topic=${topic}` +
‎              `&enterprise=${enterprise}` +
‎              `&pillar=${pillar}` +
‎              `&level=${level}`;
‎
‎            link.textContent = level.toUpperCase();
‎            link.style.display = "inline-block";
‎            link.style.marginRight = "10px";
‎            link.style.marginBottom = "5px";
‎
‎            pillarBlock.appendChild(link);
‎          });
‎
‎          enterpriseBlock.appendChild(pillarBlock);
‎        });
‎
‎        container.appendChild(enterpriseBlock);
‎
‎      });
‎    }
‎  }
‎
‎});
‎
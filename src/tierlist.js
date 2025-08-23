// Define your tier data here
const tiers = {
  "S": ["chilis.png"],
  "A": ["olive_garden.jpg",],
  "B": ["outback.png", "cracker_barrel.png"],
  "C": ["buffalo_wild_wings.jpg"],
  "D": ["ihop.png"]
};

const tierOrder = ["S", "A", "B", "C", "D"];
const tierList = document.getElementById("tierList");

tierOrder.forEach(tier => {
  const tierDiv = document.createElement("div");
  tierDiv.className = "tier";

  const label = document.createElement("div");
  label.className = `tier-label tier-${tier.toLowerCase()}`;
  label.textContent = tier;

  const itemsDiv = document.createElement("div");
  itemsDiv.className = "tier-items";

  tiers[tier].forEach(item => {
    let img = document.createElement("img");
    img.src = "images/tierlist_pics/" + item
    img.height = 150
    img.width = 150
    itemsDiv.appendChild(img);
  });

  tierDiv.appendChild(label);
  tierDiv.appendChild(itemsDiv);
  tierList.appendChild(tierDiv);
});

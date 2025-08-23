// Define your tier data here
const tiers = {
  "S": ["Item 1", "Item 2"],
  "A": ["Item 3", "Item 4", "Item 5"],
  "B": ["Item 6", "Item 7"],
  "C": ["Item 8"],
  "D": ["Item 9", "Item 10"]
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
    const itemDiv = document.createElement("div");
    itemDiv.className = "item";
    itemDiv.textContent = item;
    itemsDiv.appendChild(itemDiv);
  });

  tierDiv.appendChild(label);
  tierDiv.appendChild(itemsDiv);
  tierList.appendChild(tierDiv);
});

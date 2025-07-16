const products = [
  {
    name: "Fresh Ugu Leaves (Bundle)",
    price: "₦800",
    image: "../../assets/ugu.jpg"
  },
  {
    name: "Processed Rabbit Meat (1kg)",
    price: "₦2,500",
    image: "../../assets/rabbit-meat.jpg"
  },
  {
    name: "Sheep & Goat Feed (25kg)",
    price: "₦9,000",
    image: "../../assets/goat-feed.jpg"
  },
  {
    name: "Organic Fertilizer (50kg)",
    price: "₦6,500",
    image: "../../assets/organic-fertilizer.jpg"
  }
];

const productContainer = document.getElementById("productContainer");

products.forEach(product => {
  const card = document.createElement("div");
  card.className = "product-card";
  card.innerHTML = `
    <img src="${product.image}" alt="${product.name}" />
    <h3>${product.name}</h3>
    <p>Price: ${product.price}</p>
    <button>Buy Now</button>
  `;
  productContainer.appendChild(card);
});
 {
    name: "Dried Ugu Leaf (100g)",
    price: "₦1,200",
    image: "../../assets/ugu/ugu-dried.jpg"
  },
  {
    name: "Goat Milk (1L)",
    price: "₦1,800",
    image: "../../assets/goat-feed/goat-milk.jpg"
  },
  {
    name: "Agri_Drone Spray Service",
    price: "₦15,000 / hectare",
    image: "../../assets/banner/drone-service.jpg"
  },
  {
    name: "Fish Feed (40kg Bag)",
    price: "₦10,000",
    image: "../../assets/fish-feed/fish-feed.jpg"
  },
  {
    name: "Vegetable Seedlings (Tomato, Pepper, Ugu)",
    price: "₦500 / tray",
    image: "../../assets/vegetables/seedlings.jpg"
  }

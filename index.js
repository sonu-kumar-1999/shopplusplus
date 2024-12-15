let cart = [];
let wishlist = [];
let orders = [
  {
    orderId: "12345",
    date: "2024-12-01",
    status: "Processing",
  },
  {
    orderId: "12346",
    date: "2024-12-05",
    status: "Shipped",
  },
  {
    orderId: "12347",
    date: "2024-12-07",
    status: "Delivered",
  },
];
let isLoggedIn = false;
let userInfo = { username: "", email: "", phone: "" };

function showContent(category) {
  const productList = document.getElementById("product-list");
  productList.innerHTML = "";

  let products = [];
  if (category === "home") {
    products = [
      { name: "Home Product 1", price: 499 },
      { name: "Home Product 2", price: 799 },
      { name: "Home Product 3", price: 999 },
      { name: "Home Product 4", price: 1299 },
      { name: "Home Product 5", price: 499 },
      { name: "Home Product 6", price: 799 },
      { name: "Home Product 7", price: 999 },
      { name: "Home Product 8", price: 1299 },
      { name: "Home Product 9", price: 1299 },
      { name: "Home Product 10", price: 999 },
      { name: "Home Product 11", price: 1299 },
      { name: "Home Product 12", price: 1299 },
    ];
  } else if (category === "electronics") {
    products = [
      { name: "Smartphone", price: 15999 },
      { name: "Laptop", price: 45999 },
      { name: "Headphones", price: 2999 },
      { name: "watch", price: 999 },
      { name: "SmartWatch", price: 1200 },
      { name: "Earphone", price: 700 },
      { name: "Juicer& Mixer", price: 2999 },
      { name: "Cattle", price: 1999 },
      { name: "Keyboard", price: 600 },
      { name: "Charger", price: 459 },
      { name: "Bulb", price: 129 },
      { name: "Data Cable", price: 120 },
    ];
  } else if (category === "fashion") {
    products = [
      { name: "T-Shirt", price: 499 },
      { name: "Jeans", price: 799 },
      { name: "Jacket", price: 1999 },
      { name: "Shoes", price: 2999 },
      { name: "Hoodies", price: 499 },
      { name: "Gloves", price: 799 },
      { name: "Thermals", price: 1999 },
      { name: "Kurta", price: 2999 },
      { name: "Shirt", price: 2999 },
      { name: "Top", price: 1999 },
      { name: "Lehnga", price: 2999 },
      { name: "Saree", price: 2999 },
    ];
  } else if (category === "groceries") {
    products = [
      { name: "Rice", price: 120 },
      { name: "Wheat Flour", price: 80 },
      { name: "Sugar", price: 60 },
      { name: "Milk", price: 40 },
      { name: "Butter", price: 120 },
      { name: "Namkeen", price: 80 },
      { name: "Snacks", price: 60 },
      { name: "Bread", price: 40 },
      { name: "Rusk", price: 40 },
      { name: "Potato", price: 60 },
      { name: "Tomato", price: 40 },
      { name: "Almonds", price: 40 },
    ];
  }

  products.forEach((product) => {
    const productElement = document.createElement("div");
    productElement.classList.add("product");
    productElement.innerHTML = `
            <img src="https://via.placeholder.com/200" alt="${product.name}" />
            <h3>${product.name}</h3>
            <p>₹${product.price}</p>
            <button onclick="addToCart('${product.name}', ${product.price})">Add to Cart</button>
            <button onclick="addToWishlist('${product.name}', ${product.price})">Add to Wishlist</button>
          `;
    productList.appendChild(productElement);
  });
}

function addToCart(name, price) {
  cart.push({ name, price });
  updateCartCount();
}

function updateCartCount() {
  document.getElementById("cart-count").innerText = cart.length;
}

function toggleCartModal() {
  const modal = document.getElementById("cart-modal");
  modal.style.display = modal.style.display === "flex" ? "none" : "flex";
  if (modal.style.display === "flex") {
    displayCartItems();
  }
}

function displayCartItems() {
  const cartItemsList = document.getElementById("cart-items");
  cartItemsList.innerHTML = "";

  cart.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `${item.name} - ₹${item.price} <button onclick="removeFromCart(${index})">Remove</button>`;
    cartItemsList.appendChild(li);
  });

  updateCartTotal();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  displayCartItems();
  updateCartCount();
}

function updateCartTotal() {
  const cartTotal = document.getElementById("cart-total");
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  cartTotal.innerText = `Total: ₹${total}`;
}

function addToWishlist(name, price) {
  wishlist.push({ name, price });
  updateWishlistCount();
}

function updateWishlistCount() {
  document.getElementById("wishlist-count").innerText = wishlist.length;
}

function toggleWishlistModal() {
  const modal = document.getElementById("wishlist-modal");
  modal.style.display = modal.style.display === "flex" ? "none" : "flex";
  if (modal.style.display === "flex") {
    displayWishlistItems();
  }
}

function displayWishlistItems() {
  const wishlistItems = document.getElementById("wishlist-items");
  wishlistItems.innerHTML = "";

  wishlist.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `${item.name} - ₹${item.price} 
            <button onclick="removeFromWishlist(${index})">Remove</button>
            <button onclick="addToCart('${item.name}', ${item.price})">Add to Cart</button>`;
    wishlistItems.appendChild(li);
  });
}

function removeFromWishlist(index) {
  wishlist.splice(index, 1);
  displayWishlistItems();
  updateWishlistCount();
}

function toggleOrderHistoryModal() {
  const modal = document.getElementById("order-history-modal");
  modal.style.display = modal.style.display === "flex" ? "none" : "flex";
  if (modal.style.display === "flex") {
    displayOrderHistory();
  }
}

function displayOrderHistory() {
  const orderHistoryList = document.getElementById("order-history-list");
  orderHistoryList.innerHTML = "";

  orders.forEach((order) => {
    const li = document.createElement("li");
    li.innerHTML = `Order ID: ${order.orderId} | Date: ${order.date} 
            <div class="order-status">Status: ${order.status}</div>`;
    orderHistoryList.appendChild(li);
  });
}

function openPaymentModal() {
  const modal = document.getElementById("payment-modal");
  modal.style.display = "flex";
}

function togglePaymentModal() {
  const modal = document.getElementById("payment-modal");
  modal.style.display = "none";
}

function processPayment() {
  alert("Payment successful!");
  togglePaymentModal();
}

function openLoginModal() {
  const modal = document.getElementById("login-modal");
  modal.style.display = "flex";
}

function toggleLoginModal() {
  const modal = document.getElementById("login-modal");
  modal.style.display = "none";
}

function openSignupModal() {
  const modal = document.getElementById("signup-modal");
  modal.style.display = "flex";
}

function toggleSignupModal() {
  const modal = document.getElementById("signup-modal");
  modal.style.display = "none";
}

function signup() {
  const username = document.getElementById("signup-username").value;
  const email = document.getElementById("signup-email").value;
  const phone = document.getElementById("signup-phone").value;
  const password = document.getElementById("signup-password").value;

  if (username && email && phone && password) {
    alert("Sign up successful!");
    toggleSignupModal();
  } else {
    alert("Please fill in all fields.");
  }
}

function login() {
  const username = document.getElementById("username").value;
  const email = document.getElementById("login-email").value;
  const phone = document.getElementById("login-phone").value;
  const password = document.getElementById("password").value;

  if (username && email && phone && password) {
    isLoggedIn = true;
    userInfo = { username, email, phone };
    alert("Login successful!");
    toggleLoginModal();
  } else {
    alert("Please fill in all fields.");
  }
}

// Initialize the home page content
showContent("home");

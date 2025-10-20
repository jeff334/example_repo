/****************************
 ARRAY
 ****************************/
const products = [
  {
    id: 1,
    name: "Pool Table",
    price: 24999.0,
    currency: "R",
    image: "images/pool_table.png",
  },
  {
    id: 2,
    name: "Classic Brass Bridge Head Cue",
    price: 250.0,
    currency: "R",
    image: "images/Classic_Brass_Bridge_Head_Cue.png",
  },
  {
    id: 3,
    name: "Triangle",
    price: 150.0,
    currency: "R",
    image: "images/triangle.png",
  },
  {
    id: 4,
    name: "Cue",
    price: 399.0,
    currency: "R",
    image: "images/cue.png",
  },
  {
    id: 5,
    name: "Cue Case",
    price: 150.0,
    currency: "R",
    image: "images/case.png",
  },
  {
    id: 6,
    name: "Cue Ball",
    price: 89.0,
    currency: "R",
    image: "images/cue_ball.png",
  },
  {
    id: 7,
    name: "Cue Chalk",
    price: 29.0,
    currency: "R",
    image: "images/cue_chalk.png",
  },
  {
    id: 8,
    name: "Pool balls",
    price: 649.0,
    currency: "R",
    image: "images/pool_ball_set.png",
  },
  {
    id: 9,
    name: "8-Pack (Blue Layered Leather)",
    price: 89.0,
    currency: "R",
    image: "images/cue_tips.png",
  },
  {
    id: 10,
    name: "Cue Bag",
    price: 150.0,
    currency: "R",
    image: "images/cue_bag.png",
  },
];

/****************************
 * LOAD MAIN PAGE
 ****************************/
//function that loads each object in the main page
function LoadObjects() {
  //runs this function on each item in the array
  products.forEach((e) => {
    let productContainer = document.createElement("div"); //creates a div
    productContainer.className = "col-md-4 mb-4"; //sets the class of each div
    productContainer.id = e.name; //sets the Id of each div
    // creates the lay out of how the products should be displayed
    productContainer.innerHTML = `<div class="ProductContainer text-center p-3 border">
            <img
              src="${e.image}"
              alt="${e.name}"
              class="img-fluid"
            />
            <h3>${e.name}</h3>
            <p class="price"> R${e.price}</p>
            <button class="btn btn-primary" id="button">Add to Cart</button>
          </div>`;
    //looks for "productShelf" in the "shopping.html" page and loads "inventory"
    let inventory = document.getElementById("productShelf");
    inventory.appendChild(productContainer);
  });
}
// Only run on pages that actually have the product shelf
if (document.getElementById("productShelf")) {
  LoadObjects();
}

/****************************
 * ADD TO CART + LOAD CART
 ****************************/

//labeling where cart data will be stored in local storage
const CART_KEY = "snooker_cart";

// function that gets the date from local storage
function getCart() {
  const data = localStorage.getItem(CART_KEY);
  return data ? JSON.parse(data) : [];
}
//function that saves data under CART_key in localStorage
function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function addToCart(product) {
  const cart = getCart(); //calls the getCart function
  const existing = cart.find((item) => item.id === product.id); //checks items in localStorage saved under CART_KEY if item.id matches product id it is saved in the var existing

  if (existing) {
    existing.qty += 1; //is existing add one to the quantity of that item
  } else {
    cart.push({ ...product, qty: 1 }); //if not existing adds to cart
  }

  saveCart(cart); //tells us the product has been added to the cart
  alert(`${product.name} added to cart!`);
}

/****************************
 * SETUP ADD BUTTONS
 ****************************/
// Waits for the main page (HTML content) to fully load before running this code
document.addEventListener("DOMContentLoaded", () => {
  // Finds all Add to Cart buttons inside the productShelf container
  document.querySelectorAll("#productShelf .btn#button").forEach((btn) => {
    // Gets the product name from the nearest parent div with class 'col-md-4'
    const name = btn.closest(".col-md-4")?.id;

    // Searches the products array to find the product with a matching name
    const prod = products.find((p) => p.name === name);

    // If a matching product is found, add its ID as a data attribute on the button
    if (prod) btn.dataset.id = prod.id;
  });
});

document.addEventListener("click", (e) => {
  // Check if the clicked element is a button with the ID 'button'
  if (e.target && e.target.id === "button") {
    // Get the product ID stored in the button's data-id attribute
    const pid = e.target.dataset.id;

    // Find the matching product in the products array by comparing IDs
    const product = products.find((p) => p.id === Number(pid));

    // If a product is found, call addToCart() to save it to localStorage
    if (product) addToCart(product);
  }
});

/****************************
 * LOAD CART PAGE
 ****************************/
// Waits for the cart page  to fully load before running this code
window.addEventListener("DOMContentLoaded", () => {
  // Selects the element where all cart items will be displayed
  const cartContainer = document.getElementById("Cart_products");

  // If the element doesn't exist  stop running this code
  if (!cartContainer) return;

  // Retrieves the cart data from localStorage using the getCart() function
  const cart = getCart();

  // If the cart is empty or doesn't exist, display a message and stop
  if (!cart || cart.length === 0) {
    cartContainer.innerHTML = "<p>Your cart is empty.</p>";
    return;
  }

  // Create variables to store the total price and build the HTML structure
  let total = 0;
  let html = "";

  // Loop through each item in the cart and build its HTML
  cart.forEach((item) => {
    const sub = item.price * item.qty; // Calculate the item's subtotal
    total += sub; // Add the subtotal to the running total

    // Build the HTML block for this cart item
    html += `
      <div class="text-center p-3 border">
        <img src="${item.image}" 
             alt="${item.name}" 
             class="img-fluid">
        <h4>${item.name}</h4>
        <p>Quantity: ${item.qty}</p>
        <p>Price: R${item.price}</p>
        <p><strong>Subtotal: R${sub.toFixed(2)}</strong></p>
       
    `;
  });

  // Add the total price section at the end of the cart list
  html += `<h3 class="mt-4">Total: R${total.toFixed(2)}</h3>`;

  // Insert the completed HTML into the cart container on the page
  cartContainer.innerHTML = html;
});

/****************************
 * Font
 ****************************/
//names the key which fonts should be stored under
const FONT_KEY = "FONT_OPTIONS";
//gets the data from the sessionStorage
function getFonts() {
  const data = sessionStorage.getItem(FONT_KEY);
  return data;
}
document.addEventListener("DOMContentLoaded", Selected);
function Selected() {
  document.addEventListener("change", (e) => {
    const font = e.target.value;
    console.log(font);
    sessionStorage.setItem(FONT_KEY, font);
    document.body.style.fontFamily = sessionStorage.getItem(FONT_KEY, font);
  });
}
Selected();

/****************************
 * clear from cart
 ****************************/
function ClearCart() {
  //listen for when a button is clicked
  document.addEventListener("click", (e) => {
    let ButtonID =
      e.target
        .id; /*when its is clicked it get the id and stores it under the ButtonID var*/
    console.log(ButtonID);
    //if the ID of the button is = to button_clear it will clear localStorage and reload the page
    if (ButtonID === "button_clear") {
      localStorage.removeItem(CART_KEY);
      location.reload(); //reloads the page so you can see the page has been cleared
    }
  });
}
ClearCart();

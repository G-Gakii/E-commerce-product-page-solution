// get element from html
const MenuIcon = document.querySelector(".menu");
const closeIcon = document.getElementById("cross");
const MenuItem = document.querySelector(".navbar_container");
const images = document.querySelectorAll(".shoe");
const image = document.querySelector(".main_image");
const prev = document.querySelector(".prev_icon");
const next = document.querySelector(".next_icon");
const minus = document.querySelector(".minus");
const plus = document.querySelector(".plus");
let zero = document.querySelector(".zero");
let totalInBasket = document.getElementById("total");
let cartButton = document.querySelector(".cart_btn");
let basket = document.querySelector(".basket");
let items = document.querySelector(".item");
const displayCard = document.querySelector(".cart_content");
const closeOrderList = document.getElementById("closeOrders");

let value = 0;

// display navigation bar
MenuIcon.addEventListener("click", () => {
  MenuItem.classList.add("active");
});

// hide navigation bar
closeIcon.addEventListener("click", () => {
  MenuItem.classList.remove("active");
});
// display image desktop
images.forEach((item) => {
  item.addEventListener("click", () => {
    image.src = item.src;
  });
});

// display image on mobile
let index = 0;
function displayMobile() {
  const mediaQuery = window.matchMedia("(max-width: 700px)");
  if (mediaQuery.matches) {
    for (let i = 0; i < images.length; i++) {
      images[i].style.display = "none";
    }
    images[index].style.display = "block";
  }
}
// handle prev image
prev.addEventListener("click", () => {
  index = (index - 1 + images.length) % images.length;
  displayMobile();
});
// handle next image
next.addEventListener("click", () => {
  index = (index + 1) % images.length;
  displayMobile();
});

// initial display and resize
window.addEventListener("resize", displayMobile);
displayMobile();

// add or reduce cart items

function total() {
  minus.addEventListener("click", () => {
    value = value - 1;
    if (value < 0) {
      value = 0;
    }
    zero.innerHTML = value;
  });
  plus.addEventListener("click", () => {
    value = value + 1;
    zero.innerHTML = value;
  });
}
total();

// add item to cart
cartButton.addEventListener("click", () => {
  totalInBasket.innerHTML = value;
});

// items added to cart
// closeOrderList.addEventListener("click", () => {
//   displayCard.style.display = "none";
// });

function cartContent() {
  items.innerHTML = "";
  if (value <= 0) {
    const emptyCart = document.createElement("p");
    emptyCart.textContent = "Your cart is empty";
    items.appendChild(emptyCart);
  } else {
    let myItems = document.createElement("li");
    myItems.classList.add("myorder");
    // selected item img
    let myItemImage = document.createElement("img");
    myItemImage.src = "images/image-product-1-thumbnail.jpg";
    // selected item name and price
    let myitemcontainer = document.createElement("div");
    let myitemabout = document.createElement("p");
    myitemcontainer.innerHTML = "Fall Limited Edition Sneakers";
    let myItemsPrice = document.createElement("span");
    myItemsPrice.innerHTML = "$125.00";
    let multiply = document.createElement("span");
    multiply.innerHTML = "x";
    let quantity = document.createElement("span");
    quantity.innerHTML = value;
    const myItemsTotalprice = document.createElement("span");
    let checkoutTotal = 125 * value;
    myItemsTotalprice.innerHTML = "$" + checkoutTotal;

    myitemcontainer.append(
      myitemabout,
      myItemsPrice,
      multiply,
      quantity,
      myItemsTotalprice
    );

    myItemsTotalprice.classList.add("myorderTotal");

    // check out button
    const checkOutButton = document.createElement("button");
    checkOutButton.textContent = "CheckOut";

    myItems.append(myItemImage, myitemcontainer, checkOutButton);

    items.append(myItems);
  }
}

basket.addEventListener("click", () => {
  cartContent();
  displayCard.classList.toggle("show");
});
closeOrderList.addEventListener("click", () => {
  displayCard.classList.remove("show");
});

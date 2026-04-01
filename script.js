// USERS
function signup(){
  let u = document.getElementById("newUser").value;
  let p = document.getElementById("newPass").value;
  localStorage.setItem(u, p);
  alert("Signup Success");
  window.location.href="login.html";
}

function login(){
  let u = document.getElementById("username").value;
  let p = document.getElementById("password").value;

  if(localStorage.getItem(u) === p){
    localStorage.setItem("user", u);
    window.location.href="index.html";
  } else {
    document.getElementById("error").innerText="Wrong credentials";
  }
}

function logout(){
  localStorage.removeItem("user");
  window.location.href="login.html";
}

// PRODUCTS
const products = [
  {name:"Paneer Butter Masala",price:180,category:"veg"},
  {name:"Matar Paneer",price:160,category:"veg"},
  {name:"Chicken Biryani",price:220,category:"nonveg"},
  {name:"Butter Chicken",price:250,category:"nonveg"},
  {name:"Cold Coffee",price:80,category:"drinks"},
  {name:"Lassi",price:70,category:"drinks"}
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// DISPLAY
function displayProducts(list){
  let html="";
  list.forEach((p,i)=>{
    html+=`
    <div class="card">
      <h3>${p.name}</h3>
      <p>₹${p.price}</p>
      <button onclick="addToCart(${i})">Add</button>
    </div>`;
  });
  if(document.getElementById("products"))
    document.getElementById("products").innerHTML=html;
}

displayProducts(products);

// FILTER
function filterItems(cat){
  if(cat==="all") displayProducts(products);
  else displayProducts(products.filter(p=>p.category===cat));
}

// SEARCH
function searchFood(){
  let val=document.getElementById("search").value.toLowerCase();
  displayProducts(products.filter(p=>p.name.toLowerCase().includes(val)));
}

// CART
function addToCart(i){
  cart.push(products[i]);
  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Added to cart");
}

// CART PAGE
if(document.getElementById("cartItems")){
  let list="", total=0;
  cart.forEach(item=>{
    list+=`<li>${item.name} - ₹${item.price}</li>`;
    total+=item.price;
  });
  document.getElementById("cartItems").innerHTML=list;
  document.getElementById("total").innerText=total;
}

// PAYMENT
function pay(type){
  alert(type+" Payment Successful 🎉");
  localStorage.removeItem("cart");
  window.location.href="index.html";
}

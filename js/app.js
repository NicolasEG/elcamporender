const products = [

{
name:'Carne',
price:2000,
img:'assets/img/productos/carne.png'
},

{
name:'Pollo',
price:2000,
img:'assets/img/productos/pollo.png'
},

{
name:'Jamón y Muzza',
price:2000,
img:'assets/img/productos/jyq.png'
},

{
name:'Cebolla y Muzza',
price:2000,
img:'assets/img/productos/cym.png'
},

{
name:'Roquefort y Muzza',
price:2000,
img:'assets/img/productos/rym.png'
},

{
name:'Capresse',
price:2000,
img:'assets/img/productos/capresse.png'
},

{
name:'Humita',
price:2000,
img:'assets/img/productos/humita.png'
},

{
name:'Espinaca',
price:2000,
img:'assets/img/productos/espinaca.png'
},

{
name:'Calabaza',
price:2000,
img:'assets/img/productos/calabaza.png'
},

{
name:'Calabresa',
price:2000,
img:'assets/img/productos/calabresa.png'
},

{
name:'Fatay Árabe',
price:2500,
img:'assets/img/productos/fatay.png'
}

];

const state = {};

const productsEl = document.getElementById('products');
const cartItems = document.getElementById('cartItems');
const totalEl = document.getElementById('total');
const cartCount = document.getElementById('cartCount');

products.forEach((p, i) => {

productsEl.innerHTML += `
<div class="card">

<div class="card-image">
<img src="${p.img}" alt="${p.name}">
</div>

<div class="info">

<h3>${p.name}</h3>

<div class="price">
$${p.price.toLocaleString('es-AR')}
</div>

</div>

<div class="controls">

<button onclick="changeQty(${i},-1)">
−
</button>

<div class="qty" id="qty${i}">
0
</div>

<button onclick="changeQty(${i},1)">
+
</button>

</div>

</div>
`;

});

window.changeQty = (i, delta) => {

state[i] = (state[i] || 0) + delta;

if(state[i] < 0){
state[i] = 0;
}

document.getElementById(`qty${i}`).innerText = state[i];

renderCart();

};

function renderCart(){

let total = 0;
let totalItems = 0;

let html = '';

Object.keys(state).forEach(index => {

const qty = state[index];

if(qty <= 0) return;

const product = products[index];

const subtotal = product.price * qty;

total += subtotal;
totalItems += qty;

html += `
<div class="item">

<div class="item-name">
${product.name}
</div>

<div class="item-data">
${qty} x $${product.price.toLocaleString('es-AR')}
</div>

<div class="item-subtotal">
$${subtotal.toLocaleString('es-AR')}
</div>

</div>
`;

});

if(html === ''){

html = `
<div class="empty-cart">

🥟

<p>
Todavía no agregaste empanadas
</p>

</div>
`;

}

cartItems.innerHTML = html;

cartCount.innerText = totalItems;

totalEl.innerText = total.toLocaleString('es-AR');

}

cartToggle.onclick = () => {

cart.classList.add('open');

};

closeCart.onclick = () => {

cart.classList.remove('open');

};

sendOrder.onclick = () => {

let hasProducts = false;

let message = `🥟 Hola Donato!%0A%0A`;
message += `Quiero realizar el siguiente pedido:%0A%0A`;

Object.keys(state).forEach(index => {

const qty = state[index];

if(qty <= 0) return;

hasProducts = true;

message += `• ${products[index].name} x${qty}%0A`;

});

if(!hasProducts){

alert('Agregá al menos una empanada al carrito.');

return;

}

message += `%0A`;
message += `💰 Total: $${totalEl.innerText}%0A`;
message += `%0A`;
message += `Gracias!`;

window.open(
`https://wa.me/542254422649?text=${message}`,
'_blank'
);

};

const canvas = document.getElementById('embers');
const ctx = canvas.getContext('2d');

function resizeCanvas(){

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

}

resizeCanvas();

window.addEventListener('resize', resizeCanvas);

const embers = [...Array(150)].map(() => ({

x: Math.random() * window.innerWidth,
y: Math.random() * window.innerHeight,

size: Math.random() * 3 + 1,

speed: Math.random() * 2 + 1

}));

function animateEmbers(){

ctx.clearRect(0,0,canvas.width,canvas.height);

embers.forEach(particle => {

particle.y += particle.speed;

particle.x += Math.sin(particle.y * 0.01);

if(particle.y > window.innerHeight){

particle.y = -10;
particle.x = Math.random() * window.innerWidth;

}

ctx.beginPath();

ctx.fillStyle = 'rgba(255,60,60,.6)';

ctx.arc(
particle.x,
particle.y,
particle.size,
0,
Math.PI * 2
);

ctx.fill();

});

requestAnimationFrame(animateEmbers);

}

animateEmbers();

renderCart();
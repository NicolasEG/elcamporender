const products = [

{
name:'Maíz Entero 30 Kg',
price:14000,
img:'assets/img/productos/maiz-entero.png'
},

{
name:'Maíz Grueso / Quebrado Fino 24 Kg',
price:16000,
img:'assets/img/productos/maiz-quebrado.png'
},

{
name:'Mezcla para Gallina 24 Kg',
price:15500,
img:'assets/img/productos/mezcla-gallina.png'
},

{
name:'Arroz Saborizado para Perro 15 Kg',
price:17500,
img:'assets/img/productos/arroz-perro.png'
},

{
name:'Piedritas Sanitarias para Gato 25 Kg',
price:14000,
img:'assets/img/productos/piedritas.png'
},

{
name:'Sabrosito Adulto 20 Kg',
price:35000,
img:'assets/img/productos/sabrosito.png'
},

{
name:'Nutricare Perro Adulto 20 Kg',
price:45000,
img:'assets/img/productos/nutricare-adulto.png'
},

{
name:'Nutricare Perro Cachorro 15 Kg',
price:41000,
img:'assets/img/productos/nutricare-cachorro.png'
},

{
name:'Ultra Mix Gato 10 Kg',
price:25000,
img:'assets/img/productos/ultramix-gato.png'
},

{
name:'Bolsa de Carbón 5 Kg',
price:4000,
img:'assets/img/productos/carbon-5kg.png'
},


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
${p.price > 0 ? `$${p.price.toLocaleString('es-AR')}` : 'Consultar'}
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

const subtotal = product.price > 0 ? product.price * qty : 0;

total += subtotal;
totalItems += qty;

html += `
<div class="item">

<div class="item-name">
${product.name}
</div>

<div class="item-data">
${qty} x ${product.price > 0 ? '$' + product.price.toLocaleString('es-AR') : 'Consultar'}
</div>

<div class="item-subtotal">
${product.price > 0 ? '$' + subtotal.toLocaleString('es-AR') : 'Consultar'}
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

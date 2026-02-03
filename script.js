const frutas = [
  ["Manzana", 1.00, "manzana.jpg"],
  ["Banano", 0.50, "banana.jpg"],
  ["Naranja", 0.60, "naranja.jpg"],
  ["Fresa", 1.50, "fresa.jpg"],
  ["Mango", 0.80, "mango.jpg"],
  ["Piña", 1.50, "piña.jpg"],
  ["Uva", 1.50, "uva.jpg"],
  ["Papaya", 1.75, "papaya.jpg"],
  ["Sandía", 3.00, "sandia.jpg"],
  ["Pera", 1.00, "pera.jpg"],
  ["Kiwi", 1.80, "kiwi.jpg"],
  ["Mandarina", 0.55, "mandarina.jpg"],
  ["Melón", 1.60, "melones.jpg"],
  ["Ciruela", 1.00, "ciruela.jpg"],
  ["Aguacate", 1.75, "aguacate.jpg"],
  ["Pitahaya", 2.20, "pitahaya.jpg"],
  ["Grosella China", 1.00, "china.jpg"],
  ["Achotillo", 1.00, "achotillo.jpg"]
];

let frutasActuales = [...frutas];
let carrito = [];

const lista = document.getElementById("listaProductos");
const carritoLista = document.getElementById("carritoLista");
const totalSpan = document.getElementById("total");
const carritoDiv = document.getElementById("carrito");
const nav = document.getElementById("nav");
const ubicacion = document.getElementById("ubicacion");

function toggleMenu(){
  nav.classList.toggle("show");
}

function cerrarMenu(){
  nav.classList.remove("show");
}

function mostrar(id){
  if(id === "contacto"){
    cerrarMenu();
    document.querySelectorAll("section").forEach(s=>s.classList.remove("activo"));
    document.getElementById("inicio").classList.add("activo");
    carritoDiv.style.display = "none";
    ubicacion.style.display = "block";
    setTimeout(()=>ubicacion.scrollIntoView({behavior:"smooth"}),150);
    return;
  }

  document.querySelectorAll("section").forEach(s=>s.classList.remove("activo"));
  document.getElementById(id)?.classList.add("activo");
  ubicacion.style.display = (id === "inicio") ? "block" : "none";
  carritoDiv.style.display = (id === "catalogo") ? "block" : "none";
  cerrarMenu();
}

function cargar(arr){
  lista.innerHTML = "";
  arr.forEach((f,i)=>{
    lista.innerHTML += `
      <div class="card">
        <img src="${f[2]}">
        <h4>${f[0]}</h4>
        <p>Precio: $${f[1].toFixed(2)}</p>
        <button onclick="agregar(${i})">Agregar</button>
      </div>
    `;
  });
}

cargar(frutasActuales);

function filtrar(){
  const texto = document.getElementById("buscador").value.toLowerCase();
  frutasActuales = frutas.filter(f=>f[0].toLowerCase().includes(texto));
  cargar(frutasActuales);
}

function agregar(i){
  carrito.push({
    nombre: frutasActuales[i][0],
    precio: frutasActuales[i][1]
  });
  render();
}

function render(){
  carritoLista.innerHTML = "";
  let total = 0;

  carrito.forEach((c,i)=>{
    total += c.precio;
    carritoLista.innerHTML += `
      <li>
        ${c.nombre} - $${c.precio.toFixed(2)}
        <button onclick="eliminar(${i})">×</button>
      </li>
    `;
  });

  totalSpan.innerText = total.toFixed(2);
}

function eliminar(i){
  carrito.splice(i,1);
  render();
}

function enviarPedido(){
  const nombre = document.getElementById("nombre").value.trim();
  if(nombre === "" || carrito.length === 0){
    alert("Ingrese su nombre y agregue productos");
    return;
  }

  let mensaje = `Hola, soy ${nombre}. Mi pedido es:%0A%0A`;
  carrito.forEach(c=>{
    mensaje += `• ${c.nombre} - $${c.precio.toFixed(2)}%0A`;
  });
  mensaje += `%0ATotal: $${totalSpan.innerText}`;

  window.open(`https://wa.me/593980243568?text=${mensaje}`, "_blank");
}

JAVASCRIPT
/* ================== PRODUCTOS ================== */
/* nombre, precioLibra, precioKilo, imagen */
const frutas = [
  ["Manzana", 1.25, 2.40, "manzana.jpg"],
  ["Banano", 0.50, 1.00, "banana.jpg"],
  ["Naranja", 0.60, 1.15, "naranja.jpg"],
  ["Fresa", 1.80, 3.50, "fresa.jpg"],
  ["Mango", 0.80, 1.50, "mango.jpg"],
  ["Piña", 0.70, 1.30, "piña.jpg"],
  ["Uva", 2.50, 4.80, "uva.jpg"],
  ["Papaya", 0.65, 1.20, "papaya.jpg"],
  ["Sandía", 0.45, 0.85, "sandia.jpg"],
  ["Pera", 1.40, 2.70, "pera.jpg"],
  ["Kiwi", 2.80, 5.40, "kiwi.jpg"],
  ["Mandarina", 0.55, 1.05, "mandarina.jpg"],
  ["Melón", 0.60, 1.10, "melones.jpg"],
  ["Ciruela", 1.90, 3.60, "ciruela.jpg"],
  ["Aguacate", 1.75, 3.40, "aguacate.jpg"],
  ["Pitahaya", 2.20, 4.20, "pitahaya.jpg"],
  ["Grosella China", 1.20, 2.30, "china.jpg"],
  ["Achotillo", 1.00, 1.90, "achotillo.jpg"]
];

let frutasActuales = [...frutas];
let carrito = [];

/* ================== ELEMENTOS ================== */
const lista = document.getElementById("listaProductos");
const carritoLista = document.getElementById("carritoLista");
const totalSpan = document.getElementById("total");
const carritoDiv = document.getElementById("carrito");

/* ================== CARGAR PRODUCTOS ================== */
function cargar(arr){
  lista.innerHTML = "";

  arr.forEach((f, i) => {
    lista.innerHTML += `
      <div class="card">
        <img src="${f[3]}" alt="${f[0]}">
        <h4>${f[0]}</h4>
        <p id="precio${i}">Precio por libra: $${f[1].toFixed(2)}</p>

        <select id="unidad${i}" onchange="actualizarPrecio(${i})">
          <option value="Libra">Libra</option>
          <option value="Kilo">Kilo</option>
        </select>

        <button onclick="agregar(${i})">Agregar</button>
      </div>
    `;
  });
}

cargar(frutasActuales);

/* ================== ACTUALIZAR PRECIO ================== */
function actualizarPrecio(i){
  const unidad = document.getElementById("unidad" + i).value;
  const precio = document.getElementById("precio" + i);

  if(unidad === "Kilo"){
    precio.innerText = `Precio por kilo: $${frutasActuales[i][2].toFixed(2)}`;
  }else{
    precio.innerText = `Precio por libra: $${frutasActuales[i][1].toFixed(2)}`;
  }
}

/* ================== BUSCADOR ================== */
function filtrar(){
  const texto = document.getElementById("buscador").value.toLowerCase();
  frutasActuales = frutas.filter(f =>
    f[0].toLowerCase().includes(texto)
  );
  cargar(frutasActuales);
}

/* ================== AGREGAR AL CARRITO ================== */
function agregar(i){
  const unidad = document.getElementById("unidad" + i).value;
  const precio = unidad === "Kilo"
    ? frutasActuales[i][2]
    : frutasActuales[i][1];

  carrito.push({
    nombre: frutasActuales[i][0],
    unidad: unidad,
    precio: precio
  });

  render();
}

/* ================== MOSTRAR CARRITO ================== */
function render(){
  carritoLista.innerHTML = "";
  let total = 0;

  carrito.forEach((c, i) => {
    total += c.precio;
    carritoLista.innerHTML += `
      <li>
        ${c.nombre} (${c.unidad}) - $${c.precio.toFixed(2)}
        <button onclick="eliminar(${i})">×</button>
      </li>
    `;
  });

  totalSpan.innerText = total.toFixed(2);
}

/* ================== ELIMINAR ================== */
function eliminar(i){
  carrito.splice(i, 1);
  render();
}

/* ================== ENVIAR WHATSAPP ================== */
function enviarPedido(){
  const nombre = document.getElementById("nombre").value.trim();

  if(nombre === "" || carrito.length === 0){
    alert("Ingrese su nombre y agregue productos al carrito");
    return;
  }

  let mensaje = `Hola, soy ${nombre}. Mi pedido es:%0A%0A`;

  carrito.forEach(c => {
    mensaje += `• ${c.nombre} (${c.unidad}) - $${c.precio.toFixed(2)}%0A`;
  });

  mensaje += `%0ATotal: $${totalSpan.innerText}`;

  window.open(
    `https://wa.me/593980243568?text=${mensaje}`,
    "_blank"
  );
}

/* ================== NAVEGACIÓN ================== */
function mostrar(id){
  document.querySelectorAll("section").forEach(s =>
    s.classList.remove("activo")
  );

  document.getElementById(id).classList.add("activo");
  carritoDiv.style.display = (id === "catalogo") ? "block" : "none";
  document.querySelector(".ubicacion").style.display =
    (id === "inicio") ? "block" : "none";
}

/* ================== MENÚ RESPONSIVE ================== */
function toggleMenu(){
  document.getElementById("nav").classList.toggle("show");
}

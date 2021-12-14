
function mostrarProductos(lista) {
	let seccion = document.getElementById("productos");
	seccion.innerHTML = "";

	for (let i = 0; i < lista.length; i++) {
		const producto = lista[i];

		let articulo = document.createElement("article");
		articulo.classList.add("producto");

		let imagen = document.createElement("img");
		imagen.setAttribute("src", `img/${producto.imagenes[0]}`);
		articulo.append(imagen);

		// ir al detalle
		let miLink = document.createElement("a");
		miLink.setAttribute("href", `paginas/detalle.html?id=${producto.id}`);
		miLink.innerHTML = producto.nombre;
		articulo.append(miLink);

		let h2Precio = document.createElement("h2");
		h2Precio.classList.add("precio");
		h2Precio.innerHTML = `$${producto.precio}`;
		articulo.append(h2Precio);

		seccion.append(articulo);
	}

	if (lista.length === 0) {
		let parrafo = document.createElement("p");
		parrafo.innerHTML = "Decathlon no tiene a disposición un producto con esas caracteristicas.";
		seccion.append(parrafo);
	}
}

mostrarProductos(productos);



function filtrarPorCategoriasImgs(evento) {

	// target devuelve q la imagen fue clickeada, el elemento html referido
	let imgClickeada = evento.target;
	let categoriaSeleccionada = imgClickeada.alt;

	let filtrados = [];

	for (let i = 0; i < productos.length; i++) {
		const producto = productos[i];
		if (producto.categoria === categoriaSeleccionada || categoriaSeleccionada === "todos") {
			filtrados.push(producto);
		}
	}

	mostrarProductos(filtrados);
}

// filtro nombre

function buscarItems() {

	let texto = document.getElementById("texto-buscar").value.toLowerCase();
	let productosEncontrados = [];

	for (let i = 0; i < productos.length; i++) {
		const producto = productos[i];

		if (
			producto.nombre.toLowerCase().includes(texto) ||
			producto.descripcion.toLowerCase().includes(texto) ||
			producto.categoria.toLowerCase().includes(texto)
		) {
			productosEncontrados.push(producto);
		}
	}

	mostrarProductos(productosEncontrados);
}

let input = document.getElementById("texto-buscar");
input.addEventListener("keyup", buscarItems);




// filtro nombre


let imgFiltro = document.querySelectorAll("#filtroImg img"); 
for (let i = 0; i < imgFiltro.length; i++) {
	imgFiltro[i].addEventListener("click", filtrarPorCategoriasImgs);
}


function filtrarPorPrecio() {
	let maximoTexto = document.getElementById("precMax").value;
	let minimoTexto = document.getElementById("precMin").value;

	let maximo = parseInt(maximoTexto);
	if (isNaN(maximo)) {
		maximo = Number.MAX_VALUE;
	}

	let minimo = parseInt(minimoTexto);
	if(isNaN(minimo)){
		minimo = 0;
	}

	let filtrados = [];

	for (let i = 0; i < productos.length; i++) {
		let producto = productos[i];

		if (producto.precio >= minimo && producto.precio <= maximo) {
			filtrados.push(producto);
		}
	}

	mostrarProductos(filtrados);
}


let inputPrecioMinimo = document.getElementById("precMin");
inputPrecioMinimo.addEventListener("change", filtrarPorPrecio);

inputPrecioMinimo.addEventListener("keyup", filtrarPorPrecio); 

let inputPrecioMaximo = document.getElementById("precMax");
inputPrecioMaximo.addEventListener("change", filtrarPorPrecio);

inputPrecioMaximo.addEventListener("keyup", filtrarPorPrecio); 


// OFERTAS



const slider = document.querySelector(".slider-contenedor");

function mostrarOfertas() {
	
	for (let i = 0; i < ofertas.length; i++) {
		let oferta = ofertas[i];

		let otroDiv = document.createElement("div");
		otroDiv.classList.add("contenido-slider");
		otroDiv.innerHTML = "";

		let divContent = document.createElement("div");
		divContent.classList.add("divContent")
		divContent.innerHTML = "";
		otroDiv.append(divContent)		

		let h2Oferta = document.createElement("h2");
		h2Oferta.innerHTML = oferta.titulo;
		divContent.append(h2Oferta);

		let pOferta = document.createElement("p");
		pOferta.innerHTML = oferta.descripcion;
		divContent.append(pOferta);

		let precioOferta = document.createElement("a");
		precioOferta.innerHTML = "$" + oferta.precio;
		precioOferta.setAttribute("href", `paginas/detalle.html?id=${oferta.id}`);
		divContent.append(precioOferta);

		let miFigureOferta = document.createElement("figure");
		let miImagenOferta = document.createElement("img");
		miImagenOferta.setAttribute("src", oferta.img);
		miFigureOferta.append(miImagenOferta);
		otroDiv.append(miFigureOferta);


		slider.append(otroDiv);

	}
}


mostrarOfertas();	



// animacion


let contador = 1;
let preDiv = document.querySelector(".slider-contenedor");
let miDiv = preDiv.children;
let width = miDiv[0].clientWidth;
let intervalo = 4000;


setInterval(function(){

    slides();
	} ,intervalo);



function slides(){
    slider.style.transform = "translate("+(-width*contador)+"px)";
    slider.style.transition = "transform 1s";
    contador++;

    if(contador == miDiv.length){
        setTimeout(function(){
            slider.style.transform = "translate(0px)";
            slider.style.transition = "transform 0s";
            contador=1;
        },1500)
    }
}


// TIMER

const contadorOfertas = document.getElementById("contador")
let finBlackFriday = new Date('12/19/2021 9:30 AM');

    let segundos = 1000;
    let minutos = segundos * 60;
    let horas = minutos * 60;
    let dias = horas * 24;
    let tiempo;

    function cuantoFalta() {
        let ahora = new Date();
        let distancia = finBlackFriday - ahora;
        if (distancia < 0) {

            clearInterval(tiempo);
            contadorOfertas.innerHTML = 'Se han agotado las ofertas';

            return;
        }
        let days = Math.floor(distancia / dias);
        let hours = Math.floor((distancia % dias) / horas);
        let minutes = Math.floor((distancia % horas) / minutos);
        let seconds = Math.floor((distancia % minutos) / segundos);

        contadorOfertas.innerHTML = days + ' dias, ';
        contadorOfertas.innerHTML += hours + ' horas, ';
        contadorOfertas.innerHTML += minutes + ' minutos y ';
        contadorOfertas.innerHTML += seconds + ' segundos';
    }

    tiempo = setInterval(cuantoFalta, 0);
let ruta = window.location.href;
let partesRuta = ruta.split("=");

let id = partesRuta[1];
id = parseInt(id);

let producto;

for (let i = 0; i < productos.length; i++) {
	if (productos[i].id === id) {
		producto = productos[i];
		break;
	}
}

function mostrarProducto() {
	document.querySelector("h1").innerHTML = producto.nombre;
	document.querySelector("h2").innerHTML = `$${producto.precio}`;

	let imagen = document.getElementById("imgDetalle");
	imagen.setAttribute("src", `../img/${producto.imagenes[1]}`);
	document.querySelector("h6").innerHTML = producto.descripcion;
}

mostrarProducto();

function mostrarSugerencias(){

	let cajaSugeridos = document.getElementById("sugeridos");

	for (let i = 0; i < productos.length; i++) {
		if(productos[i].categoria === producto.categoria && productos[i].id !== producto.id){

			let divSugeridos = document.createElement("div");
			divSugeridos.classList.add("divSugeridos");
			cajaSugeridos.append(divSugeridos);

			let parrafo = document.createElement("p");
			parrafo.innerHTML = productos[i].nombre;
			divSugeridos.append(parrafo);

			let miLink = document.createElement("a");
			miLink.setAttribute("href", `detalle.html?id=${productos[i].id}`);

			let figure = document.createElement("figure");
			let imagen = document.createElement("img");
			imagen.setAttribute("src", `../img/${productos[i].imagenes[0]}`);
			figure.append(imagen);
			miLink.append(figure);
			divSugeridos.append(miLink);


		}
	}
}

mostrarSugerencias();
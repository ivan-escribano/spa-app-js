//!GENERAL VARIABLES
const links = document.querySelectorAll("#menu a");
//!CONSTANT BASE URL
//TODO Need to delete this or comment when upload to server, server already have the right location no need this path, only in live server
const BASE_URL = "http://127.0.0.1:5500/JS/practicas/TUTORIAL_SPA/practica-1";
//!ADD ROUTE FUNCTION TO LINK
links.forEach((link) => {
  link.addEventListener("click", (e) => {
    route(e);
  });
});

//!CAMBIAR DIRECCION URL DEL NAVEGADOR
function route(e) {
  //window.history contien el historial del navegador
  //window.history.state añade una entrada al historial del navegador
  //En pocas palabras lo que hacemos es actualizar la url sin recargar la pagina
  //Le pasamaos el "href" que contiene la ruta a donde queremos ir
  e.preventDefault();
  const updatedURl = window.history.pushState({}, "", e.target.href);
  handleLocation();
  return updatedURl;
}

//!SPECIFY ROUTES WHERE THE CONTENT IS , ASOCIATE "A LINKS" WITH "HTML CONTENT"
//Objeto donde la key hara referencia al path del navegador actual
//Y el value hara referencia al contenido html
//TODO delete base url because in web server we can access directly to the html pages without baseurl
const routes = {
  404: `${BASE_URL}/pages/404.html`,
  "/": `${BASE_URL}/pages/home.html`,
  "/about": `${BASE_URL}/pages/about.html`,
  "/lorem": `${BASE_URL}/pages/lorem.html`,
};

//!AÑADIR CONTENIDO DINAMICAMENTE A NUETSRO "INDEX HTML"
async function handleLocation() {
  //devuelve la url actual -- / , /about , /lorem , /404
  const path = window.location.pathname;
  //Verificamos si existe la ruta y la guardamos
  const route = routes[path] || routes[404];
  //get the content of the url provided via fetch to the file
  const content = await fetch(route).then((data) => data.text());
  //get the root container an add the content of file
  document.getElementById("containerRoot").innerHTML = content;
}
//Onpopstate -> retrieve information on history object in browser and get last pushState value push it in to history, when event bac/forward/refresh btn is fired
window.onpopstate = handleLocation();

window.onload = () => {
  handleLocation();
};

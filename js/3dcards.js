console.log("Buscador Marvel");
const apikey = "29d5c35f6659e38f56be597a5a502ddf";
const ts = "01/10/2022, 00:11:08";
const hash = "8d800c99e7e9b0f153ed642706300c28";
const search = document.getElementById("search");
const content = document.getElementById("content");
const btnSearch = document.getElementById("btnSearch");
const tipoDeBusqueda = document.getElementById("tipoDeBusqueda");
const urlBase = "https://gateway.marvel.com:443/v1/public/";
const characters = "characters";
const comics = "comics";
let selecTipoBusqueda = document.querySelector("select");
let selectTipo = document.getElementById("selectTipo");
console.log(selecTipoBusqueda.value);

const getCharacter = (tipo) => {
  const url = `${urlBase}${tipo}?apikey=${apikey}&ts=${ts}&hash=${hash}`;
  fetch(url)
    .then((response) => response.json())
    .then((response) => {
      //console.log(response);

      response.data.results.forEach((e) => {
        drawHero(e);
      });
    })
    .catch((err) => console.log("Se ha producido un error: ", err));
};

const drawHero = (e) => {
  const image = `${e.thumbnail.path}/portrait_uncanny.${e.thumbnail.extension}`;
  const hero = `
    <div class="comic">
      <div class="face front">
        <img src="${image}" alt="" />
        <h3>${e.name}</h3>
      </div>
      <div class="face back">
        <h3>${e.name}</h3>
        <p>
          ${e.description}
        </p>
        <div class="link">
          <a href="#">details</a>
        </div>

        <div></div>
      </div>
    </div>
    `;
  content.insertAdjacentHTML("beforeend", hero);
};

const searchHeroe = (name) => {
  const hero = encodeURIComponent(name);
  const urlSearch = `https://gateway.marvel.com:443/v1/public/characters?name=${hero}&apikey=${apikey}&ts=${ts}&hash=${hash}`;

  fetch(urlSearch)
    .then((response) => response.json())
    .then((response) => {
      if (response.data.total <= 0) {
        const hero = `
            <div class="col-md-4">
            <h5>No existe información para este heroe</h5>
            </div>
            `;
        content.insertAdjacentHTML("beforeend", hero);
      }

      response.data.results.forEach((e) => {
        drawHero(e);
      });
    })
    .catch((err) => console.log("Se ha producido un error: ", err));
};

/* search.addEventListener("keyup", (e) => {
  console.log(e);
  if (e.keyCode === 13) {
    searchHeroe(e.target.value.trim());
  }
}); */

selectTipo.addEventListener("change", () => {
  content.innerHTML = "";
  getCharacter(selectTipo.value);
});

const ejecutar = () => {
  btnSearch.addEventListener("click", enviarBusqueda);
};

const enviarBusqueda = (e) => {
  e.preventDefault();
  const inputBuscar = document.getElementById("buscar").value;
  if (inputBuscar == "") {
    content.innerHTML = "";
    getCharacter(selecTipoBusqueda.value);
  }
  if (inputBuscar !== "") {
    content.innerHTML = "";
    searchHeroe(inputBuscar);
  }
};

ejecutar();

getCharacter(selecTipoBusqueda.value);

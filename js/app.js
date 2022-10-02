//PRIVATEKEY = '965a3dfe23d5c584f7c6bb5653df75088a536c0a'
//PUBLICKEY = '29d5c35f6659e38f56be597a5a502ddf'
console.log("Marvel");
const apikey = "29d5c35f6659e38f56be597a5a502ddf";
const ts = "01/10/2022, 00:11:08";
const hash = "8d800c99e7e9b0f153ed642706300c28";
const url = `https://gateway.marvel.com:443/v1/public/characters?apikey=${apikey}&ts=${ts}&hash=${hash}`;
const main = document.getElementById("main");

fetch(url)
  .then((response) => response.json())
  .then((response) => printData(response.data.results))
  .catch((err) => console.log("Se ha producido un error: ", err));

const printData = (personajes) => {
  console.log(personajes);
  let str = '<div class="row">';
  let i = 0;
  let name = [];
  let img = [];
  let bio = [];

  for (i = 0; i < personajes.length; i++) {
    //console.log(personajes[i].name);
    name = personajes[i].name;
    img =
      personajes[i].thumbnail.path + "." + personajes[i].thumbnail.extension;
    bio = personajes[i].description;

    if (!name) {
      name = "Lo siento, pero este heroe no tiene nombre";
    }
    if (!img) {
      img = "Lo siento, pero este heroe no tiene imagen";
    }
    if (!bio) {
      bio = "Lo siento, pero este heroe no tiene descripción";
    }

    str =
      str +
      `
        <div class="col-md-4">
              <div class="card" style="width: 18rem;">
                  <img src="${img}" class="card-img-top" alt="...">
                  <div class="card-body">
                      <h5 class="card-title">${name}</h5>
                      <p class="card-text">${bio}</p>
                      
                  </div>
              </div>
          </div>
    `;
  }
  str = str + "</div>";

  main.innerHTML = str;
};

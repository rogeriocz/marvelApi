console.log("Marvel App");

const marvel = {
  render: () => {
    const apikey = "29d5c35f6659e38f56be597a5a502ddf";
    const ts = "01/10/2022, 00:11:08";
    const hash = "8d800c99e7e9b0f153ed642706300c28";
    const urlAPI = `https://gateway.marvel.com:443/v1/public/characters?apikey=${apikey}&ts=${ts}&hash=${hash}`;
    const container = document.querySelector("#marvel-row");
    let contentHTML = "";

    fetch(urlAPI)
      .then((res) => res.json())
      .then((json) => {
        for (const hero of json.data.results) {
          let urlHero = hero.urls[0].url;
          contentHTML += `
            <div class="col-md-4">
                <a href="${urlHero}" target="_blank">
                  <img src="${hero.thumbnail.path}.${hero.thumbnail.extension}" alt="${hero.name}" class="img-thumbnail">
                </a>
                <h3 class="title">${hero.name}</h3>
            </div>`;
        }
        container.innerHTML = contentHTML;
      });
  },
};
marvel.render();

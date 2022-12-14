import axios from "axios";

const http = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? "https://quiet-zuccutto-43d0fc.netlify.app/"
      : "http://localhost:8080",
});

var img = "";
var imageUrlGeneration =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/";

export default {
  async getAllGeneration() {
    const res = await http.get("https://pokeapi.co/api/v2/generation");
    const generation = res.data.results.map((subdata) => {
      const id = subdata.url.split("/")[subdata.url.split("/").length - 2];
      const img = imageUrlGeneration + id + ".png";
      return {
        id,
        ...subdata,
        imageUrl: img,
      };
    });
    return generation;
  },
  async getAllByGeneration(id) {
    const res = await http.get("https://pokeapi.co/api/v2/generation/" + id);
    const generation = res.data.pokemon_species.map((subdata) => {
      const id = subdata.url.split("/")[subdata.url.split("/").length - 2];
      img = imageUrlGeneration;
      return {
        id,
        ...subdata,
        imageUrl: `${img}${id}.png`,
      };
    });
    return generation;
  },
  async getAllPokemon() {
    const { data } = await http.get("https://pokeapi.co/api/v2/pokemon");
    return data;
  },
  async getAllPokemonByLimit(limit) {
    const res = await http.get(
      "https://pokeapi.co/api/v2/pokemon?limit=" + limit
    );
    const pokemons = res.data.results.map((subdata) => {
      const id = subdata.url.split("/")[subdata.url.split("/").length - 2];
      img = imageUrlGeneration;
      return {
        id,
        ...subdata,
        imageUrl: `${img}${id}.png`,
      };
    });
    return pokemons;
  },
  async getByPokemon(id) {
    const res = await http.get("https://pokeapi.co/api/v2/pokemon/" + id);
    const types = res.data.types.map((item) => {
      const typename = item.type.name;
      const typeclass = "bg-" + item.type.name;
      const colorclass = "bg-light-" + item.type.name;
      return {
        typename,
        typeclass,
        colorclass,
      };
    });
    const results = { ...res.data, types };
    return results;
  },
  async getAllSpecies() {
    const { data } = await http.get(
      "https://pokeapi.co/api/v2/pokemon-species/"
    );
    return data;
  },
  async getBySpecies(id) {
    const { data } = await http.get(
      "https://pokeapi.co/api/v2/pokemon-species/" + id
    );
    const dataSpecies = data.flavor_text_entries;
    const desc = dataSpecies.map((item) => {
      const lang = item.language.name == "en" ? item.flavor_text : "";
      return {
        lang,
      };
    });

    const distinct = [
      ...new Map(desc.map((item) => [item.lang, item])).values(),
    ];
    var txt = "",
      d;
    for (d in distinct) {
      txt += distinct[d].lang + " ";
    }
    let pokeDescription = txt;
    return pokeDescription;
  },
  async getAllEvolution() {
    const { data } = await http.get(
      "https://pokeapi.co/api/v2/evolution-chain/"
    );
    return data;
  },
  async getByEvolution(id) {
    const { data } = await http.get(
      "https://pokeapi.co/api/v2/evolution-chain/" + id
    );
    const dataEvolves = data.flavor_text_entries;
    const desc = dataEvolves.map((item) => {
      const lang = item.language.name == "en" ? item.flavor_text : "";
      return {
        lang,
      };
    });

    const distinct = [
      ...new Map(desc.map((item) => [item.lang, item])).values(),
    ];
    var txt = "",
      d;
    for (d in distinct) {
      txt += distinct[d].lang + " ";
    }
    let pokeDescription = txt;
    return pokeDescription;
  },
};

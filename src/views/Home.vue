<template>
  <div class="homepage mx-auto" >
    <Topwrapper :head="title" :sub="subtitle" @GET_GENERATION="getGenerations" @RELOAD="getPokemonList" @VIEW_ABOUT="viewAbout"/>
    <v-col cols="12" sm="6" class="mx-auto">
        <v-text-field
            outlined
            label="Enter your Pokémon name"
            prepend-inner-icon="mdi-magnify"
            class="txt-search"
            v-model="search" 
          ></v-text-field>
        </v-col>
    <v-row
      class="fill-height"
      align-content="center"
      justify="center"
      v-if="initialLoading"
    >
      <v-col class="subtitle-1 text-center" cols="12">
        Initializing...
      </v-col>
      <v-col cols="6">
        <v-progress-linear
          color="blue-grey lighten-1"
          indeterminate
          rounded
          height="6"
        ></v-progress-linear>
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col
        v-for="poke in filteredPokemons"
        :key="poke.id"
        cols="12"
        md="4"
        lg="4"
      >
        <PokeCard :data="poke" @VIEW_POKEMON="viewPokemon"/>
      </v-col>
    </v-row>
      <PokeInfo ref="pokemonInfo" />
      <GenInfo ref="generationInfo" @VIEW_GENERATION="viewGeneration"/>
      <PokeAbout ref="pokedexAbout" />
  </div>
</template>

<script>
import api from "@/Api";
import Topwrapper from "@/components/Topwrapper.vue";
import PokeCard from "@/components/PokeCard.vue";
import PokeInfo from "@/components/PokeInfo.vue";
import GenInfo from "@/components/GenInfo.vue";
import PokeAbout from "@/components/PokeAbout.vue";

export default {
  name: "Home",
  data: () => ({
    title: "Pokédex Copybase",
    subtitle: "Search your Pokémon",
    search: "",
    pokemons: [],
    initialLoading: true,
    loadMoreloading: false,
  }),
  created() {
    this.getPokemonList();
  },
  methods: {
    /** Get all Generation */
    async getPokemonList() {
      let limit = 600;
      this.initialLoading = true;
      this.pokemons = await api.getAllPokemonByLimit(limit);
      this.initialLoading = false;
    },
    /** View Specific Pokemon */
    async viewPokemon(id) {
      const data  = await api.getByPokemon(id);
      this.$refs.pokemonInfo.viewPokemon(data);
    },
    /** Get All Generation */
    async getGenerations() {
      const data  = await api.getAllGeneration();
      this.$refs.generationInfo.listGenerations(data);
    },
    /** View Generation and View it */
    async viewGeneration(gendata) {
      this.initialLoading = true;
      await api.getAllByGeneration(gendata.id);
      const data  = await api.getAllByGeneration(gendata.id);
      this.pokemons = {};
      this.pokemons = data;
      this.initialLoading = false;
    },
    /** View About me */
    viewAbout() {
      this.$refs.pokedexAbout.about();
    }
  },
  computed: {
    filteredPokemons() {
      return this.pokemons.filter(data => {
          return data.name.toLowerCase().includes(this.search.toLowerCase());
      });
    }
  },
  mounted() {
    this.$ga.page("/home");
  },
  components: {
    Topwrapper,
    PokeCard,
    PokeInfo,
    GenInfo,
    PokeAbout
  }
};
</script>

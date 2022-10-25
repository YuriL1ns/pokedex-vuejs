<template>
  <v-dialog
    max-width="400"
    content-class="about__dialog"
    v-model="dialog"
    transition="fade-transition"
  >
    <v-card class="pokemon__card">
      <v-card-title>
        Sobre
        <v-spacer></v-spacer>
        <v-btn icon @click="dialog = false" class="mdl__close">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text class="about__container">
        <v-container>
            <div class="justify-center align-center">
                <p class="headline text-h5 text-capitalize font-weight-black">Pokédex Copybase</p>
                <div class="about__content">
                    <p>
                    Desafio Técnico solicitado pela Copybase para a vaga de Frontend Developer.
                    </p>
                    <p>
                    Construído coms as tecnologias <a :href="vuejs" target="_blank">Vue JS</a>,
                    <a :href="vuetify" target="_blank">Vuetify</a> e
                    <a :href="pokeapi" target="_blank">PokéAPI</a>.
                    </p>
                </div>
                <div class="about__footer">
                    <p class="text-caption text-center"><strong> Coded by <a :href="website" target="_blank">Yuri Lins</a>.</strong></p>
                </div>
            </div>
        </v-container>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "PokédexAbout",
  data: () => ({
      dialog: false,
      vuejs: "https://vuejs.org/",
      vuetify: "https://vuetifyjs.com",
      pokeapi: "https://pokeapi.co/",
      pokemon: "https://www.pokemon.com/us/",
      github: "https://github.com/YuriL1ns",
      instagram: "https://www.instagram.com/yurilins_/",
  }),
  methods: {
    about() {
        this.dialog = true;
    }
  }
};
</script>
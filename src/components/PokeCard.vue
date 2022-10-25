<template>
  <v-lazy
    v-model="isActive"
    :options="{
      threshold: .5
    }"
    min-height="50"
    transition="fade-transition"
  >
    <v-hover v-slot:default="{ hover }">
      <v-card hover class="poke__card rounded-lg" @click="$emit('VIEW_POKEMON', data.id)" :elevation="hover ? 12 : 2" :class="{ 'on-hover': hover }">
        <v-card-text class="d-flex flex-column">
          <span class="poke__card-id text-capitalize">#{{ data.id }}</span>
          <v-img
            class="poke__card-img"
            :alt="data.name"
            contain
            :src="data.imageUrl"
            transition="scale-transition"
            width="120"
          />
          <span class="poke__card-text title text-capitalize">{{ data.name }}</span>
              <span v-if="evolves" class="poke__card-text">Evolution of: {{ data.evolves }}</span>
        </v-card-text>
      </v-card>
    </v-hover>
  </v-lazy>
</template>
<script>
export default {
  name: "PokeCard",
  props: ["data"],
  url: {
    type: String,
    default: '',
  },
  data: () => ({
    isActive: false,
    evolves: undefined,
  }),
  async fetch() {
    await this.evolution()
  },
  computed: {
    displayedSprites() {
      if (this.open) {
        return this.sprites.slice(0, 3)
      } else {
        return this.sprites.slice(0, 1)
      }
    },
  },
  watch: {
    url() {
      this.evolution()
    },
  },
  methods: {
    async evolution() {
      const pokemon = await this.$axios.get(this.url)
      this.id = pokemon.data.id
      const species = await this.$axios.get(pokemon.data.species?.url)
      this.evolves = species.data.evolves_from_species?.name
    },
  }

};
</script>
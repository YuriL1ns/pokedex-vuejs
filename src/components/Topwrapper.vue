<template>
    <div class="pt-8 md:pt-10">
      <div class="intro flex text-center pt-16">
      <div class="top-wrapper">
        <h1>{{head}}</h1>
        <h2 class="subtitle-1 text-center">{{sub}}</h2>
      </div>
    </div>
      <v-spacer class="text-end">
      <v-btn icon @click="$emit('RELOAD', data)" class="__reload">
        <v-icon>mdi-reload</v-icon>
      </v-btn>
      <v-btn icon @click="$emit('GET_GENERATION', data)" class="__generation">
        <v-icon>mdi-dots-horizontal</v-icon>
      </v-btn>
      <v-btn icon @click="$emit('VIEW_ABOUT')" class="__info">
        <v-icon>mdi-information-outline</v-icon>
      </v-btn>
    </v-spacer>
    </div>
</template>

<script>
  export default {
    name: "Topwrapper",
    props: ["head","sub","data"],
    data: () => ({
      title: "Pokédex Copybase",
    })
  }
</script>

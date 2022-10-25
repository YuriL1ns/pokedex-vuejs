<template>
  <v-app>
    <v-main>
      <v-container>
        <router-view />
      </v-container>
      <Scrolltotop />
    </v-main>
  </v-app>
</template>

<script>
import Scrolltotop from "@/components/Scrolltotop.vue";

export default {
  name: 'App',
  data: () => ({
    //
  }),
  components: {
    Scrolltotop
  },
  metaInfo() {
    return { 
        title: "Pokedex Project Copybase",
        meta: [
            { name: 'description', content:  'Desafio técnico solicitado pela Copybase. Coded by Yuri Lins'},
            { property: 'og:title', content: "Pokedex Project Copybase"},
            { property: 'og:site_name', content: 'Pokedex Project Copybase'},
            { property: 'og:type', content: 'website'},    
            { name: 'robots', content: 'index,follow'} 
        ]
    }
  }
};
</script>

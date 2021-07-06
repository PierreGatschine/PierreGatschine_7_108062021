<template>
  
  <div class="home">
    <div id="nav">
      <router-link to="/login">Connexion</router-link> |
      <router-link to="/" @click="logout">Déconnexion</router-link>
    </div>
    <Header msg="Messagerie" />
     <router-view/>
  </div>
   
</template>

<script>
// @ is an alias to /src

import Header from '../components/Header.vue'

export default {
  name: 'Home',
  components: {
    Header
  }
}
</script>

<style lang="scss" scoped>

</style>>


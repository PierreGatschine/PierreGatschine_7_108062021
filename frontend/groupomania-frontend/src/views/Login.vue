<template>
  <div class="card">
    <div class="row-toggle">
      <h1 class="card__title" v-if="mode == 'login'">Connexion</h1>
      <h1 class="card__title" v-else>Inscription</h1>
      <p class="card__subtitle" v-if="mode == 'login'">Tu n'as pas encore de compte ?  <span class="card__action" @click="switchToCreateAccount()">Créer un compte</span></p>
      <p class="card__subtitle" v-else>Tu as déjà un compte ? <span class="card__action" @click="switchToLogin()">Se connecter</span></p>
    </div>
    
    <login v-if="mode == 'login'"/>
    <signup v-else/>
  </div>
</template>

<script>
// @ is an alias to /src

import Signup from '../components/Signup.vue'
import Login from '../components/Login.vue'

export default {
  name: 'Home',
  components: {
    
    Signup,
    Login
  },
  data: function () {
    return {
      mode: 'login',
      firstname: "",
      lastname: "",
      email: "",
      password: "",
    }
  },
  methods: {
    switchToCreateAccount: function () {
      this.mode = 'create';
    },
    switchToLogin: function () {
      this.mode = 'login';
    },
  },
  
}
</script>

<style lang="scss" scoped>


</style>

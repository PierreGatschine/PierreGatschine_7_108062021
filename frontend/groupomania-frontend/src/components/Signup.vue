<template>
<div class="card-signup">
     <div class="form-row">
      <input v-model="email" class="form-row__input" type="text" placeholder="Adresse mail"/>

    </div>
    <div class="form-row">
      <input v-model="prenom" class="form-row__input" type="text" placeholder="Prénom"/>
      <input v-model="nom" class="form-row__input" type="text" placeholder="Nom"/>
    </div>
    <div class="form-row">
      <input v-model="password" class="form-row__input" type="password" placeholder="Mot de passe"/>
    </div>

    <!-- <div class="form-row">
      <button @click="login()" class="button" :class="{'button--disabled' : !validatedFields}" v-if="mode == 'login'">
        <span v-if="status == 'loading'">Connexion en cours...</span>
        <span v-else>Connexion</span>
      </button>
      <button @click="createAccount()" class="button" :class="{'button--disabled' : !validatedFields}" v-else>
        <span v-if="status == 'loading'">Création en cours...</span>
        <span v-else>Créer mon compte</span>
      </button>
    </div> -->
</div>
    
    <!-- <h1>S'inscrire</h1> -->
</template>

<script>
export default {
    setup() {
        
    },
}
</script>

<style lang="scss" scoped>
.form-row {
    display: flex;
    margin: 16px 0px;
    gap:16px;
    flex-wrap: wrap;
  }

  .form-row__input {
    padding:8px;
    border: none;
    border-radius: 8px;
    background:antiquewhite;
    font-weight: 500;
    font-size: 16px;
    flex:1;
    min-width: 100px;
    color: #333;
  }

  .form-row__input::placeholder {
    color:#979797;
  }


</style>

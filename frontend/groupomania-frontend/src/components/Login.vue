<template>
    <div class="card-signup">
        <div class="form-row">
        <input v-model="dataLogin.email" :rules="emailRules" class="form-row__input" type="text" placeholder="Adresse mail"/>
        </div>
        <div class="form-row">
        <input v-model="dataLogin.password" :rules="passRules" class="form-row__input" type="password" placeholder="Mot de passe"/>
        </div>
        <div class="form-row" v-if="mode == 'login' && status == 'error_login'">
            Adresse mail et/ou mot de passe invalide
        </div>
        <div class="form-row" v-if="mode == 'create' && status == 'error_create'">
            Adresse mail déjà utilisée
        </div>
        <div class="form-row">
        <button @click="sendLogin()" class="button" :class="{'button--disabled' : !validatedFields}">
            <span v-if="status == 'loading'">Connexion en cours...</span>
            <span v-else>Connexion</span>
        </button>
        </div>
    </div>   
</template>

<script>
import axios from "axios"

export default {
    name : "Login",
    data(){
        return{
            valid: true,
            emailRules: [
                v => !!v || 'Renseignez votre e-mail',
                v => /.+@.+\..+/.test(v) || "Votre e-mail n'est pas valide",
            ],
            passRules: [
                v => !!v || 'Renseignez votre mot de passe'
            ],
            dataLogin: {
                email: "",
                password: "",
            },
            dataLoginS: "",
            msg: false,
            message: ""
        }
    },
    computed: {
    validatedFields: function () {
      if (this.mode == 'create') {
        if (this.email != "" && this.firstname != "" && this.lastname != "" && this.password != "") {
          return true;
        } else {
          return false;
        }
      } else {
        if (this.email != "" && this.password != "") {
          return true;
        } else {
          return false;
        }
      }
    },
    },
    methods: {
        sendLogin(){
            this.dataLoginS = JSON.stringify(this.dataLogin);
            axios.post('http://localhost:3000/api/auth/login', this.dataLoginS, {headers: {'Content-Type': 'application/json'}})
                .then(response => {
                    let log = JSON.parse(response.data);
                    localStorage.userId = log.userId;
                    localStorage.token = log.token;
                    localStorage.moderation = log.moderation;
                    this.$router.push('/Publication');  
                })
                .catch(error => {
                    console.log(error);
                    this.message = error;
                    this.msg = true 
                }); 
        }
    }
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
    color: #165b9d;
  }

  .form-row__input::placeholder {
    color:#979797;
  }



</style>
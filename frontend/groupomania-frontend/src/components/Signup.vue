<template>
    <div class="card-signup">
        <div class="form-row">
        <input v-model="dataSignup.email" :rules="emailRules" class="form-row__input" type="text" placeholder="Adresse mail"/>
        </div>
        <div class="form-row">
        <input v-model="dataSignup.firstname" :rules="firstnameRules" class="form-row__input" type="text" placeholder="Prénom"/>
        <input v-model="dataSignup.lastname" :rules="lastnameRules" class="form-row__input" type="text" placeholder="Nom"/>
        </div>
        <div class="form-row">
        <input v-model="dataSignup.password" :rules="passRules" class="form-row__input" type="password" placeholder="Mot de passe"/>
        </div> 
        <div class="form-row" v-if="mode == 'login' && status == 'error_login'">
        Adresse mail et/ou mot de passe invalide
        </div>
        <div class="form-row" v-if="mode == 'create' && status == 'error_create'">
        Adresse mail déjà utilisée
        </div>
        <div class="form-row">
        <button @click="sendSignup()" class="button" :class="{'button--disabled' : !validatedFields}">
            <span v-if="status == 'loading'">Création en cours...</span>
            <span v-if="status == 'create'" class="success">Compte créé !</span>
            <span v-else>Créer mon compte</span>
        </button>
        </div>  
    </div>    
</template>

<script>
import axios from "axios"

export default {
    data(){
        return{
            valid: true,
            firstnameRules: [
                v => !!v || 'Renseignez votre prénom',
                v => /^[A-Za-z]+$/.test(v) || "Votre prénom n'est pas valide",
            ],
            lastnameRules: [
                v => !!v || 'Renseignez votre nom',
                v => /^[A-Za-z]+$/.test(v) || "Votre nom n'est pas valide",
            ],
            emailRules: [
                v => !!v || 'Renseignez votre e-mail',
                v => /.+@.+\..+/.test(v) || "Votre e-mail n'est pas valide",
            ],
            passRules: [
                v => !!v || 'Renseignez votre mot de passe',
                v => (v && v.length >= 5) || '5 caractères minimun',
                v => /(?=.*[A-Z])/.test(v) || 'Au moins une majuscule', 
                v => /(?=.*\d)/.test(v) || 'Au moins un chiffre',
            ],
            dataSignup:{
                firstname: "",
                lastname: "",
                email: "",
                password: "",
            },
            dataSignupS: "", 
            form: true,
            msg: false,
            message: ""
        }
    },
    methods: {
        sendSignup(){
            this.dataSignupS = JSON.stringify(this.dataSignup)
            axios.post('http://localhost:3000/api/auth/signup', this.dataSignupS, {headers: {'Content-Type': 'application/json'}})
            .then(response => {
                let sign = JSON.parse(response.data);
                this.message = sign.message;
                this.form = false;
                this.msg = true;
            })
            .then(response => {
                console.log(response);
                 this.$router.push('/Login')
            })
            .catch(error => {
                console.log(error);
                this.message = error;
                this.msg = true; 
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

  .success {
      background: green;
  }


</style>

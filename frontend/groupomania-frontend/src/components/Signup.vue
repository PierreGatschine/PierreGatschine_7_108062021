<template>
    <div class="card-signup">
        <div class="form-row">
            <input v-model="dataSignup.email"  class="form-row__input" type="text" placeholder="Adresse mail"/>
            <p class="signin__body__alert" v-if="errors.emptyEmail">
                * Merci de compléter ce champ
            </p>
            <p class="signin__body__alert" v-else-if="errors.badValueEmail">
                * Merci de renseigner une adresse mail valide
            </p>
        </div>
        <div class="form-row">
            <input v-model="dataSignup.firstname"  class="form-row__input" type="text" placeholder="Prénom"/>
            <p class="signin__body__alert" v-if="errors.emptyFirstname">
                * Merci de compléter ce champ
            </p>
            <p class="signin__body__alert" v-else-if="errors.badValueFirstname">
                * Merci de renseigner un prénom valide
            </p>
            <input v-model="dataSignup.lastname" class="form-row__input" type="text" placeholder="Nom"/>
            <p class="signin__body__alert" v-if="errors.emptyLastname">
                * Merci de compléter ce champ
            </p>
            <p class="signin__body__alert" v-else-if="errors.badValueLastname">
                * Merci de renseigner un nom valide
            </p>
        </div>
        <div class="form-row">
            <input v-model="dataSignup.password" class="form-row__input" type="password" placeholder="Mot de passe"/>
            <p class="signin__body__alert" v-if="errors.emptyPassword">
                * Merci de compléter ce champ
            </p>
            <p class="signin__body__alert" v-else-if="errors.badValuePassword">
                * Merci de renseigner un mot de passe valide
            </p>
        </div> 
        
        <div class="form-row">
            <button @click="sendSignup()" class="button button-success" v-if="msg">
               <!--  <span v-if="status == 'loading'">Création en cours...</span> -->
                <span class="span-success">{{ message }}</span>
                <p>* Pour rejoindre la messagerie vous devez<br> vous connectez à votre compte</p>
                
            </button>
            <button @click="sendSignup()" class="button" v-else>
               <!--  <span v-if="status == 'loading'">Création en cours...</span> -->
                <!-- <span v-if="msg" class="span-success">{{ message }}</span> -->
                <span>Créer mon compte</span>
            </button>
        </div>  
    </div>    
</template>

<script>
import axios from "axios"

export default {
    data(){
        return{
            errors: {
                emptyEmail: false,
                badValueEmail: false,
                emptyFirstname: false,
                badValueFirstname: false,
                emptyLastname: false,
                badValueLastname: false,
                emptyPassword: false,
                badValuePassword: false,
            },
            valid: true,
            
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
        checkEmail(email) {
            let re = /^(([^<>()[]\.,;:s@]+(.[^<>()[]\.,;:s@]+)*)|(.+))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        },
        checkOnlyLetters(value) {
            let re = /^[a-zA-ZáàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ]{2,70}$/;
            return re.test(value);
        },
        checkPassword(password) {
            let re = /[a-zA-Z0-9]{8}/;
            return re.test(password);
        },
        test(field, emptyValue, badValue) {
            if (!field) {
                emptyValue = true;
                console.log(emptyValue)
                return emptyValue;
            } else {
                emptyValue = false; //drop error message if user correct the answer
            }

            if (!this.checkOnlyLetters(field)) {
                badValue = true;
                return badValue
            } else {
                badValue = false; //drop error message if user correct the answer
            }
            console.log(field, emptyValue, badValue)
            
        },
        isFormError() {
            if (!this.dataSignup.email) {
                this.errors.emptyEmail = true;
            } else {
                this.errors.emptyEmail = false; //drop error message if user correct the answer
            }
            if (!this.checkEmail(this.dataSignup.email)) {
                this.errors.badValueEmail = true;
            } else {
                this.errors.badValueEmail = false; //drop error message if user correct the answer
            }
            if (!this.dataSignup.firstname) {
                this.errors.emptyFirstname = true;
            } else {
                this.errors.emptyFirstname = false; //drop error message if user correct the answer
            }
            if (!this.checkOnlyLetters(this.dataSignup.firstname)) {
                this.errors.badValueFirstname = true;
            } else {
                this.errors.badValueFirstname = false; //drop error message if user correct the answer
            }
            if (!this.dataSignup.lastname) {
                this.errors.emptyLastname = true;
            } else {
                this.errors.emptyLastname = false; //drop error message if user correct the answer
            }
            if (!this.checkOnlyLetters(this.dataSignup.lastname)) {
                this.errors.badValueLastname = true;
            } else {
                this.errors.badValueLastname = false; //drop error message if user correct the answer
            }
            if (!this.dataSignup.password) {
                this.errors.emptyPassword = true;
            } else {
                this.errors.emptyPassword = false; //drop error message if user correct the answer
            }
            if (!this.checkPassword(this.dataSignup.password)) {
                this.errors.badValuePassword = true;
            } else {
                this.errors.badValuePassword = false;
            }
            if (
                this.errors.emptyEmail ||
                this.errors.badValueEmail ||
                this.errors.emptyFirstname ||               
                this.errors.badValueFirstname ||
                this.errors.emptyLastname ||
                this.errors.badValueLastname ||
                this.errors.emptyPassword ||
                this.errors.badValuePassword 
            ) {
                console.log("erreur dans le login");
                return true;
            }
            return false;
        },
        sendSignup(){
            if (this.isFormError() === true) {
                return;
            }
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
                setTimeout(() => this.$router.push('/login'), 1500)  
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
    font-weight: 400;
    font-size: 16px;
    flex:1;
    min-width: 100px;
    color: #165b9d;
  }

  .form-row__input::placeholder {
    color:#979797;
  }


  .span-success {
    min-width: 100px;
    color: antiquewhite;
    border-radius: 8px;
    font-weight: 800;
    font-size: 16px;
    border: none;
    width: 100%;
    padding: 16px;
    transition: .4s background-color;
  }
  .button-success {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    gap: 1rem;
    background: rgb(15, 153, 15);
  }


</style>

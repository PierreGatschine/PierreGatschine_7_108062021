<template>
    <div class="card-profile">
        
        <div class="card">
            <h1 class="card__title">Profil utilisateur</h1>
            <div class="card-user">
                <div class="card-user__firstname">
                    {{ dataGet.firstname }}
                </div>
                <div class="card-user__lastname">
                    {{ dataGet.lastname }}
                </div>
                <div class="card-user__email">
                    {{ dataGet.email }}
                </div>
                <div class="form-row">
                    <div class="btn-group">
                        <button @click="showModalDelete = !showModalDelete" class="button btn-alert">
                            Supprimer
                        </button>
                        <button @click="showModalUpdate = !showModalUpdate" class="button btn-update">
                            Modifier
                        </button>    
                    </div> 
                </div>
            </div>    
        </div>  
        <div v-show="showModalUpdate" class="modal">
            <div class="card card-update">
                <h2 class="card__title">Modifier le profil</h2>
                <v-form ref="form" v-model="valid">
                    <div class="card-update__form-row">
                        <input class="card-update__form-row--input" v-model="dataUp.firstname" :rules="firstnameRules"  type="text" placeholder="Prénom">
                    </div>
                    <div class="card-update__form-row">
                        <input  class="card-update__form-row--input" v-model="dataUp.lastname" :rules="lastnameRules"  type="text" placeholder="Nom">
                    </div>
                    <div class="card-update__form-row">
                        <input class="card-update__form-row--input" v-model="dataUp.email" :rules="emailRules"  type="text" placeholder="Email">
                    </div>
                </v-form>
                <button @click="updateUser" class="button" >
                    <span>Modifier</span>
                </button>
            </div>
        </div> 
        <div v-show="showModalDelete" class="modal">
            <div class="card card-delete">
                <h2 class="card__title card-delete__title">Supprimer mon compte</h2>
                <div class="card-delete__text">
                    <p>Vous êtes sur le point de supprimer l'ensemble de vos contenus(profil, messages, commentaire) de la messagerie groupomania.</p>
                </div>
                <button @click="deleteUser" class="button card-delete__btn" >
                    <span>Supprimer</span>
                </button>
            </div>
        </div>     
    </div>
    
</template>

<script>

import axios from "axios"

export default {
    name: "User",
    data() {
        return{
            showModalDelete: false,
            showModalUpdate: false,
           
            dataGet: { 
                firstname: "",
                lastname: "",
                email: ""
            },
            dataUp: {
                firstname: "",
                lastname: "",
                email: "",
            },
            dataUpS: "",

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
        }
    },
    methods: {
        updateUser() {
            this.dataUpS = JSON.stringify(this.dataUp);
            axios.put("http://localhost:3000/api/auth/", this.dataUpS, {headers: {'Content-Type': 'application/json', Authorization: 'Bearer ' + localStorage.token}})
            .then(response => {
                let rep = JSON.parse(response.data);
                console.log(rep);
                window.location.assign('http://localhost:8081/Profile');
            })
            .catch(error => {
                console.log(error);
                this.msg = error  
            })
        },
        deleteUser() {
            
            axios.delete("http://localhost:3000/api/auth/", {headers: {Authorization: 'Bearer ' + localStorage.token}})
            .then(response => {
                let rep = JSON.parse(response.data);
                console.log(rep);
                localStorage.userId = "";
                localStorage.token = "";
                this.$router.push('/');  
            })
            .catch(error => {
                console.log(error);
                this.msg = error  
            })
        },
        
    },
    mounted() { 
        axios.get("http://localhost:3000/api/auth/", {headers: {Authorization: 'Bearer ' + localStorage.token}})
            .then(response => {
                let profil = JSON.parse(response.data);
                this.dataGet.email = profil[0].email;
                this.dataGet.firstname = profil[0].firstname;
                this.dataGet.lastname = profil[0].lastname;
                this.dataUp.email = profil[0].email;
                this.dataUp.firstname = profil[0].firstname;
                this.dataUp.lastname = profil[0].lastname;
            })
            .catch(error => {
                console.log(error);
            });    
    },
    
    
    
}
</script>

<style lang="scss" scoped>

.card-profile {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    gap: 2rem;
}

.card {
  max-width: 100%;
  width: 540px;
  background:#1768b3;
  border-radius: 16px;
  padding:32px;
}

.card__title {
  text-align:center;
  font-weight: 700;
}

.card-user {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    gap: 2rem;
    padding: 2rem;
    font-size: 24px;
    &__firstname, &__lastname {
        font-weight: 700;
        color: #2196f3;
    }
    &__email {
        color: #2196f3;
    }
}



.card__subtitle {
  text-align: center;
  color:antiquewhite;
  font-weight: 400;
}

  .button {
    color:antiquewhite;
    border-radius: 8px;
    font-weight: 700;
    font-size: 15px;
    border: none;
    width: 100%;
    padding: 16px;
    transition: .8s background-color;
  }

  

  .card__action {
    color:#0f4475;
    text-decoration: underline;
  }

  /* .card__action:hover {
    cursor:pointer;
  } */

  .btn-group {
        display: flex;
        gap: 1rem;
    }

    .btn-alert {
        background: #f14e4e;
    }
    
    .btn-alert:hover {
        background: red;
    }

    .btn-update {
        background: #2196f3;
    }

    .btn-update:hover {
        background: #1976cd;
    }

    .card-update {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        gap: 2rem;
        background: rgb(128, 128, 128, .3);

        &__form-row {
            display: flex;
            margin: 16px 0px;
            gap:16px;
            flex-wrap: wrap;
            &--input {
                padding:8px;
                border: none;
                border-radius: 8px;
                background:#1976cd;
                font-weight: 500;
                font-size: 16px;
                flex:1;
                min-width: 100px;
                color: antiquewhite;
               /*  font-size: 22px; */
            }
        }
    }

    .card-delete {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        gap: 2rem;
        padding: 2rem;
        font-size: 24px;
        background: rgb(241, 78, 78, .5);
        &__text {
            text-align: center;
        }
        &__btn {
            background: #f14e4e;
        }
        &__btn:hover {
            background: red;
        }
    }

</style>
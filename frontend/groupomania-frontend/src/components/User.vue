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
                
            </div>
            
            <div class="form-row">
                <div class="btn-group">
                    <button @click.stop="dialogDel=true" title="supprimer mon profil" class="button btn-alert">
                        Supprimer
                    </button>
                    <button @click.stop="dialogUp=true" title="modifier mes informations" class="button btn-update">
                    Modifier
                    </button>
                    
                </div> 
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
            dialogDel: false,
            dialogUp: false,
            msg: "",
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
        updateUser() {
            this.dataUpS = JSON.stringify(this.dataUp);
            axios.put("http://localhost:3000/api/auth/", this.dataUpS, {headers: {'Content-Type': 'application/json', Authorization: 'Bearer ' + localStorage.token}})
            .then(response => {
                let rep = JSON.parse(response.data);
                console.log(rep);
                this.dialogUp = false;
                window.location.assign('http://localhost:8081/Profile');
            })
            .catch(error => {
                console.log(error);
                this.msg = error  
            })
        }
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



.card {
  max-width: 100%;
  width: 540px;
  background:#32A2F9;
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

  .card__action:hover {
    cursor:pointer;
  }

  .btn-group {
        display: flex;
        gap: 1rem;
    }

    .btn-alert {
        background: rgb(241, 78, 78);
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



</style>
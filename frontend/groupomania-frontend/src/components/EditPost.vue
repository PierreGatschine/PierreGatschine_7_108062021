<template>
    <div class="card-editPost">
        <div class="card-editPost__title">
           <h3>Nouvelle publication</h3>
        </div>
        <div class="form-row">
            <input  v-model="dataPost.title" :rules="titleRules" :counter="50" class="form-row__input" type="text" placeholder="Titre"/>
        </div>
        <div class="form-row">
            <textarea v-model="dataPost.content" color="black" :rules="contentRules" class="form-row__textarea" name="content" rows="10" cols="55" placeholder="Contenu"></textarea>
        </div>
        <button @click="sendPost" class="button" >
            <span>Publier</span>
        </button>
    </div>
</template>

<script>
import axios from "axios"

export default {
    name: "EditPost",
    data(){
        return{
            valid: true,
            titleRules: [
                v => !!v || 'Titre de la publication',
                v => (v && v.length <= 50) || 'Le titre doit faire moins de 50 caractères',

            ],
            contentRules: [
                v => !!v || 'Ecrivez votre message',
            ],
            dataPost:{
                title: "",
                content:"",
                userId: localStorage.userId
            },
            dataPostS: "",
            msg: false,
            message: "",
        }
    },
    methods: {
        sendPost(){
            this.dataPostS = JSON.stringify(this.dataPost);
            axios.post("http://localhost:3000/api/posts/", this.dataPostS, {headers: {'Content-Type': 'application/json', Authorization: 'Bearer ' + localStorage.token}})
                .then(response => {
                    let rep = JSON.parse(response.data);
                    this.message = rep.message;
                    this.msg = true;
                    this.form = false;         
                })
                .catch(error => {
                    console.log(error); 
                    this.message = error;
                    this.msg = true
                });
        },
    },
}
</script>

<style lang="scss" scoped> 

    .card-editPost{
        max-width: 100%;
        width: 700px;
        background: #1976cd;
        border-radius: 16px;
        padding: 32px;
    }

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
        font-weight: 700;
        color: #323232;
    }

     .form-row__input::placeholder {
        color:#979797;
    } 

    .form-row__textarea {
        padding:8px;
        border: none;
        border-radius: 8px;
        background:antiquewhite;
        font-weight: 500;
        font-size: 16px;
        flex:1;
        min-width: 100px;
        font-weight: 500;
        color: #323232;
    }  

    .form-row__textarea::placeholder {
        color:#979797;
    }

    .button:hover {
        opacity: 1;
        cursor:pointer;
        background: #155da5;
  }


</style> 
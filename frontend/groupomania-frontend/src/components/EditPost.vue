<template>
    <div class="card-editPost">
        <div class="card-editPost__title">
           <h3>Nouvelle publication</h3>
        </div>
        <div class="form-row">
            <input  v-model="dataPost.title"  class="form-row__input" type="text" placeholder="Titre"/>
            <p class="form-row__input__alert" v-if="errors.emptyTitle">
                * Merci de compléter les champs
            </p>
        </div>

        <div class="form-row">
            <textarea v-model="dataPost.content" :rules="contentRules" class="form-row__textarea" name="content" rows="10" cols="55" placeholder="Contenu"></textarea>
            <p class="form-row__textarea__alert" v-if="errors.emptyContent">
                * Merci de compléter les champs
            </p>
        </div>
        <div class="btn-group">
            <input class="form-row__input--img" type="file"
                    accept="image/png, image/jpeg, image/jpg, video/mp4, video/mkv"
                    name="media" @change="handleFileUpload" />  
            <button :disabled="!valid" @click="sendPost" class="button" >
                <span>Publier</span>
            </button>
        </div>
    </div>
 
</template>

<script>
import axios from "axios"

export default {
    name: "EditPost",
    data(){
        return{
            contenu: null, 
            errors: {
                emptyTitle: false,
                emptyContent: false
            },
            valid: true,
            
            contentRules: [
                v => !!v || 'Ecrivez votre message',
            ],
            
            dataPost:{
                title: "",
                content: "",           
                media_url: "",
                file: "", 
                userId: localStorage.userId
            },
            dataPostS: "",
            msg: false,
            message: "",
        }
    },
    methods: {
        handleFileUpload(event) {
            console.log("Handling file", event.target.files[0]);
            this.file = event.target.files[0];
            console.log("file is ", this.file);
            
        },
        sendPost(){
            if (!this.dataPost.title || !this.dataPost.content) {
                this.errors.emptytitle = true;
                this.errors.emptyContent = true; 
                return console.log("content can't be empty");
      }
            /* this.handleFileUpload = this.dataPostS.media_url; */
            this.dataPostS = JSON.stringify(this.dataPost);
            console.log(this.dataPostS);
            axios.post("http://localhost:3000/api/posts/", this.dataPostS, {headers: {'Content-Type': 'application/json', Authorization: 'Bearer ' + localStorage.token}})
                .then(response => {
                    let rep = JSON.parse(response.data);
                    this.message = rep.message;
                    this.msg = true;
                    this.form = false;  
                    window.location.assign('http://localhost:8081/Publication');
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
        display: flex;
        flex-direction: column;
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
        font-size: 20px;
        flex:1;
        min-width: 100px;
        font-weight: 700;
        background:#1768b3;
        color: antiquewhite;
    }

    .form-row__input--img {
        padding:8px;
        border: none;
        border-radius: 8px;
        flex:1;
        min-width: 100px;
        font-weight: 300;
        font-size: 20px ;
        background:#1768b3;
        color: antiquewhite;
    }

     .form-row__input::placeholder {
        color:antiquewhite;
    } 

    .form-row__textarea {
        padding:8px;
        border: none;
        border-radius: 8px;
        background:#1768b3;
        font-weight: 500;
        font-size: 20px;
        flex:1;
        min-width: 100px;
        font-weight: 300;
        color: antiquewhite;
    }  

    .form-row__textarea::placeholder {
        color: antiquewhite;
    }

    .button:hover {
        opacity: 1;
        cursor:pointer;
        background: #155da5;
    }
    .btn-group {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
 


</style> 
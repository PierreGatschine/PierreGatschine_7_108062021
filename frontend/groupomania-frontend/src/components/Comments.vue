<template>
    
    <div class="card-comments">
        <div class="card-comments-allPosts" v-for="(post, index) in allPosts" v-bind:key="index">
            <h4 class="card-comments-allPosts__name"> {{ comment.firstname }} {{ comment.lastname }}</h4>
            <p class="card-comments-allPosts_content">{{ comment.comContent }}</p>

        </div>
        <div class="card-comments__addComments">
            <div class="card-comments__title">
            <h3>Commenter</h3>
            </div>
            <div class="form-row">
                <textarea v-model="dataCom.content" :rules="comContentRules" :counter="255" class="form-row__textarea" name="content" rows="3" cols="53" placeholder="Commentaire"></textarea>
            </div>
            <button :disabled="!valid" @click="sendCom(post.id)" class="button" >
                <span>Commenter</span>
            </button>
        </div>
    </div>
    
    
</template>

<script>
import axios from "axios"

export default {
    name: "Comments",
    data() {
        return{
            userId: "",
            admin: "",
            afficheFrmCm: false,
            allComments: [],
            postId: "",
            valid: true,
            titleRules: [
                v => !!v || 'Titre de la publication',
                v => (v && v.length <= 50) || 'Le titre doit faire moins de 50 caractères',
            ],
            contentRules: [
                v => !!v || 'Ecrivez votre message',
            ],
            comContentRules: [
                v => !!v || 'Ecrivez votre commentaire',
                v => (v && v.length <= 255) || 'Le commentaire doit faire moins de 255 caractères',
            ],
            dataCom:{
                id: "",
                content:"",
                userId: ""
            },
            dataComS: "",
        }
    },
    methods: {
        sendCom(pId){
            this.dataCom.userId = this.userId;
            this.dataComS = JSON.stringify(this.dataCom);
            axios.post("http://localhost:3000/api/posts/" + pId + "/comments", this.dataComS, {headers: {'Content-Type': 'application/json', Authorization: 'Bearer ' + localStorage.token}})
                .then(response => {
                    let rep = JSON.parse(response.data);
                    console.log(rep.message);
                    this.dataCom.content="";
                    this.dataCom.userId="";
                    this.afficheFrmCm=false;
                })
                .catch(error => {
                    console.log(error); 
                    this.message=error;
                    this.msg=true
                });
        },
         updateCom(){
            this.dataCom.userId = localStorage.userId;
            this.dataComS = JSON.stringify(this.dataComS);
            axios.put("http://localhost:3000/api/posts/comments/" + this.dataCom.id, this.dataComS, {headers: {'Content-Type': 'application/json', Authorization: 'Bearer ' + localStorage.token}})
                .then(response => {
                    let rep = JSON.parse(response.data);
                    console.log(rep.message);
                    this.dataCom.content = "";
                    this.dataCom.userId = "";
                    this.afficheFrmCm = false;
                    this.dialogUpCom = false;
                    window.location.assign('http://localhost:8081/Publication');
                })
                .catch(error => {
                    console.log(error);
                    
                })
        },
        afficheForm(){
            this.$router.push('/Publication')
        },
        afficheFormCom(){
            this.afficheFrmCm = true
        },
    }
    
}
</script>

<style lang="scss" scoped>

    .card-comments{
        max-width: 100%;
        width: 500px;
        background: transparent;
        /* background: #8c8c8c; */
        border-radius: 16px;
        padding: 20px;
    }
    
    .card-comments__title {
        text-align: start;
    }

    .form-row {
        display: flex;
        margin: 16px 0px;
        gap:16px;
        flex-wrap: wrap;
    }

    .form-row__textarea {
        padding:8px;
        border: none;
        border-radius: 8px;
        background: #1976cd;
       /*  background:antiquewhite; */
        font-weight: 500;
        font-size: 16px;
        flex:1;
        min-width: 100px;
        font-weight: 500;
        color: #323232;
    }  

</style>
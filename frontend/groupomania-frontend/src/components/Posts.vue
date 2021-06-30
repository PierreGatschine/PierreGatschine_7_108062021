<template>
    <div class="card-post" >
        <div class="card-post__allPosts" v-for="(post, index) in allPosts" v-bind:key="index">
            <div class="card-post-name">
                <h2 class="card-post-name__title">{{ post.firstname }} {{ post.lastname }}</h2>
                <p class="card-post-name__subtitle">{{ post.date }} à {{ post.time }}</p>
            </div>
            <div class="card-post-title">
                <h3 class="card-post-title__subtitle">{{ post.title }}</h3>
            </div>
            <div class="card-post-content">{{ post.content }}</div>
        </div>
    </div>
</template>

<script>
import axios from "axios"

export default {
    name : "Posts",
    data(){
        return{
            userId: "",
            admin: "",
            
            allPosts: [],
            
            
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
            dataPost: {
                id: "",
                title:"",
                content:"",
                userId:"",
            },
            dataPostS: "",
            dataCom:{
                id: "",
                content:"",
                userId: ""
            }
           
            
        }
    },
    mounted(){
        this.userId = localStorage.userId;
        axios.get("http://localhost:3000/api/posts", {headers: {Authorization: 'Bearer ' + localStorage.token}})
            .then(response => {
                let posts = JSON.parse(response.data);
                this.allPosts = posts;
            })
            .catch(error => {
            console.log(error); 
            });
        axios.get("http://localhost:3000/api/posts/likes", {headers: {Authorization: 'Bearer ' + localStorage.token}})
            .then(response =>{
                let likes = JSON.parse(response.data);
                this.allLikes = likes;
            })
            .catch(error => {
                console.log(error)
            }); 
    },
}
</script>

<style lang="scss" scoped>

</style>
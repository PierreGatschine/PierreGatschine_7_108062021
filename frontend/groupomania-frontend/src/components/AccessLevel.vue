<template>
    <div class="card-adminPost">
        <div class="card-adminPost__title">
           <h2>Toutes les publications</h2>
        </div>
        <div class="btn-group">
            <button text @click="showModalPosts = !showModalPosts" class="button " >
                <i class="far fa-envelope"></i>
            </button>
            <button  @click="showModalComments = !showModalComments" class="button " >
                <i class="far fa-comments"></i>
            </button>
        </div>
    
        <div v-show="showModalPosts" class="modal card card-admin">
            <div class="card-admin__title">
                <h2>Tous les messages publiés</h2>
            </div>
            <div class="card-posts-allPosts" v-for="(post, index) in allPosts" v-bind:key="index">
                <h3 class="card-posts-allPosts__title">{{ post.title }}</h3>
                <h4 class="card-posts-allPosts__name"> {{ post.firstName }} {{ post.lastName }}</h4>
                <p class="card-posts-allPosts__date">{{ post.date }}</p>
                <p class="card-posts-allPosts__content">{{ post.content }}</p>
                <button class="button" @click="deletePost(post.id)">
                    <i class="far fa-trash-alt"></i>
                </button>
            </div>     
        </div>
        <div v-show="showModalComments" class="modal card card-admin">
            <div class="card-admin__title">
                <h2>Tous les commentaires publiés</h2>
            </div>
            <div class="card-comments-allComments" v-for="(comment, index) in allComments" v-bind:key="index">
                <h4 class="card-comments-allComments__name"> {{ comment.firstname }} {{ comment.lastname }}</h4>
                <p class="card-comments-allComments__content">{{ comment.comContent }}</p>
                <button class="button" @click="deleteComment(comment.id)">
                    <i class="far fa-trash-alt"></i>
                </button>
            </div>
            
        </div>
    </div>
        
    

</template>

<script>
import axios from "axios"

export default {
    name: "AccessLevel",

    data(){
        return{
            allPosts: [],
            allComments: [],

            showModalPosts: false,
            showModalComments: false,
        }
    },
    methods: {
        clickPosts(){
            this.showPosts = true,
            this.showComments = false
        },
        clickComments(){
            this.showPosts = false,
            this.showComments = true
        },
        deletePost(pId){
            axios.delete("http://localhost:3000/api/admin/post/" + pId, {headers: {Authorization: 'Bearer ' + localStorage.token}})
                .then(response => {
                    let rep = JSON.parse(response.data);
                    console.log(rep.message);
                    window.location.assign('http://localhost:8081/admin');

                })
                .catch(error => {
                    console.log(error);    
                })
        },
        deleteComment(cId){
            axios.delete("http://localhost:3000/api/admin/comment/" + cId, {headers: {Authorization: 'Bearer ' + localStorage.token}})
                .then(response => {
                    let rep = JSON.parse(response.data);
                    console.log(rep.message);
                    window.location.assign('http://localhost:8081/admin');
                })
                .catch(error => {
                    console.log(error);
                })
        }
    },
    mounted(){
        axios.get("http://localhost:3000/api/admin/posts", {headers: {Authorization: 'Bearer ' + localStorage.token}})
            .then(response => {
                let posts = JSON.parse(response.data);
                this.allPosts = posts;
            })
            .catch(error => {
            console.log(error); 
            });
        axios.get("http://localhost:3000/api/admin/comments", {headers: {Authorization: 'Bearer ' + localStorage.token}})
                .then(response => {
                    let com = JSON.parse(response.data);
                    this.allComments = com;
                })
                .catch(error => {
                console.log(error);
                });
    }
    
}

</script>

<style lang="scss" scoped>

.card-adminPost {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    max-width: 100%;
    width: 540px;
    background: rgb(48,48,48);
    background: linear-gradient(63deg, rgba(48,48,48,1) 18%, rgba(80,80,80,1) 100%);
    border-radius: 16px;
    padding:32px;
}

.card {
    background: rgba(51, 51, 51, 0.1);
}

.card-admin {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    &__title {
        color: #2196f3;
    }
}

.card-posts-allPosts {
    display: flex;
    flex-direction: column;
    gap: .5rem;
    border-bottom: .5px solid antiquewhite;
}

.card-comments-allComments {
    display: flex;
    flex-direction: column;
    gap: .5rem;
    border-bottom: .5px solid antiquewhite;
    &__name {
        color: #2196f3;
        font-weight: 700;
        font-size: 20px;
    }
    &__content {
        font-weight: 300;
        font-size: 18px;
    }
}


button {
    text-decoration: none;
    border: none;
    background: transparent;
    color: #2196f3;
    transition: .8s color;
         
}

button:hover {
    cursor:pointer;
    text-decoration: none;
    border: none;
    background: transparent;
    color: #1976D2;
}

.btn-group {
    display: flex;
    gap: 1rem;
}

i {
    font-size: 25px;
    
}

</style>
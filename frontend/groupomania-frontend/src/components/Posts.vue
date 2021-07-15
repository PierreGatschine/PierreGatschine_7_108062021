<template>
    <div class="card-post" >
        <div class="card-post__allPosts" v-for="(post, index) in allPosts" v-bind:key="index">
            <div class="card-post-name">
                <h2 class="card-post-name__title">{{ post.firstname }} {{ post.lastname }}</h2>
                <p class="card-post-name__subtitle">{{ post.date }} à {{ post.time }}</p>
            </div>
            <div class="card-post-group-content-img">
                <div class="card-post-content">
                    <h3 class="card-post-content__title">{{ post.title }}</h3>
                    <div class="card-post-content__content">{{ post.content }}</div>
                </div>
                <div class="card-post-img" >
                   <!-- <div class="card-post-img__content">{{ post.media_url }}</div> -->
                   <img class="card-post-img__content--img" :src="require('../assets/toto.jpg')" alt="Groupomania logo"/>
                   <!--  <img class="post-img__content--img" aria-label="image partagée par l'utilisateur" :src="require(`../../../../backend/images/${getMediaName()}`)"/> -->
                </div>
            </div>
            <div class="btn-icon">
                <div class="btn-icon-heart">
                    <button class="btn-icon-heart--click" @click="likePost(post.id, post.likes)">
                    <i class=" btn-icon-heart--click__icon far fa-heart"></i>
                    </button>
                    <p class="btn-icon-heart--click__text">{{ post.likes }}</p>
                </div>
                <!-- <div class="btn-icon-comment" @click="showModalUpdate = !showModalUpdate" v-if="!afficheFrmCm" @click="afficheCom(post.id)"> -->
                <div class="btn-icon-comment" @click="showModalComments = !showModalComments"  @click.stop="afficheCom(post.id)">
                    <button class="btn-icon-comment--click">
                    <i class="btn-icon-comment--click__icon far fa-comments"></i>
                    </button>
                </div>

                <div class="btn-icon-update" @click="showModalUpdate = !showModalUpdate" @click.stop="goDialogUpPost(post.title, post.content, post.id)">
                    <button class="btn-icon-update--click">
                        <i class="btn-icon-update--click__icon far fa-edit"></i>
                    </button>
                </div>
                <div class="btn-icon-4" @click="deletePost(post.id)">
                    <button class="btn-icon-4__delete">
                        <i class=" btn-icon-4__delete__icon far fa-trash-alt"></i>
                    </button>
                </div>
            </div>
            <div v-show="showModalComments" class="modal display-comments" v-if="postId === post.id">
                <div class="card-comments">
                    <div class="card-comments-allPosts" v-for="(comment, index) in allComments" v-bind:key="index">
                        <h4 class="card-comments-allPosts__name"> {{ comment.firstname }} {{ comment.lastname }}</h4>
                        <p class="card-comments-allPosts__content">{{ comment.comContent }}</p>
                    </div>
                    <div class="card-comments__addComments">
                        <div class="card-comments__title">
                            <h3>Commenter</h3>
                        </div>
                        <div class="form-row">
                            <textarea v-model="dataCom.content" :counter="255" class="form-row__textarea" name="content" rows="3" cols="53" placeholder="Commentaire"></textarea>
                            <p class="form-row__textarea__alert" v-if="errors.emptyContent">
                                * Merci de compléter le champ
                            </p>
                        </div>
                        <button :disabled="!valid" @click="sendCom(post.id)" class="button btn-comment" >
                            <span>Commenter</span>
                        </button>
                    </div>
                </div>
                <!-- <comments />  -->
            </div>
            
                <div v-show="showModalUpdate" class="modal post-update" v-if="postId === post.id">
                    <div class="post-update-card">
                        <div class="post-update-card__title">
                            <h3>Modifier le post</h3>
                        </div>
                        <v-form class="post-update-card__form" ref="form" v-model="valid">
                            <div class="form-row">
                                <input v-model="dataPost.title" :counter="50" class="form-input form-input__title" type="text" placeholder="Titre"/>
                                <p class="form-row__title__alert" v-if="errors.emptyContent">
                                    * Merci de compléter le champ
                                </p>
                            </div>
                            <div class="form-row">
                                <textarea v-model="dataPost.content" class="form-input form-input__content" name="content" rows="6" cols="51" placeholder="Contenu"></textarea>
                                <p class="form-row__textarea__alert" v-if="errors.emptyContent">
                                    * Merci de compléter le champ
                                </p>
                            </div>
                        </v-form>
                        <button  @click="updatePost()" class="button btn-update" >
                            <span>Modifier</span>
                        </button>
                    </div>
                </div>
            
            
        </div>
    </div>
</template>

<script>
import axios from "axios"


export default {
    name : "Posts",
    components: {
      /*  Comments,  */
    },
    data(){
        return{
            userId: "",
            admin: "",
            afficheFrmCm: false,
            allPosts: [],
            allLikes: [],
            allComments: [],
            postId: "",

            thereIsImage: null,

            errors: {
                emptyContent: false
            },

            showModalComments: false,
            showModalUpdate: false,

            /* dialogUpCom: false,
            dialogUpPost: false, */

            valid: true,
            
            dataPost: {
                id: "",
                title:"",
                content:"",
                media_url:"",
                userId:"",
            },
            dataPostS: "",
            dataCom:{
                id: "",
                content:"",
                userId: ""
            },
            dataComS: "",
            dataLike:{
                userId: "",
                nbLikes: "",
                postId: "",
                liked: false,
            },
            dataLikeS: "",
            form: true
            
            
        }
    },
    methods: {
        /* isThereMedia() {
            if (this.postData.media_url) {
                let extension = this.postData.media_url.split(".").pop();
                if (
                extension === "jpg" ||
                extension === "jpeg" ||
                extension === "png"
                ) {
                    this.thereIsImage = true;
                }
            }
        }, */
       /*  getMediaName() {
            let mediaName = this.postData.media_url;
            let extension = mediaName.split(".").pop();
            if (mediaName === null) {
                this.thereIsImage = false;
            }
            if (extension === "jpg" || extension === "jpeg" || extension === "png") {
                return mediaName;
            }
        }, */
       /*  goDialogUpPost(postTitle, postContent, postId){
            this.dataPost.title = postTitle;
            this.dataPost.content = postContent;
            this.dataPost.id = postId;
           this.dialogUpPost = true; 
        }, */
        updatePost(){
            if (!this.dataPost.title || !this.dataPost.content ) {
                this.errors.emptyContent = true; 
                return console.log("content can't be empty"); 
            }
            this.dataPost.userId = localStorage.userId;
            this.dataPostS = JSON.stringify(this.dataPost);
            axios.put("http://localhost:3000/api/posts/" + this.dataPost.id, this.dataPostS, {headers: {'Content-Type': 'application/json', Authorization: 'Bearer ' + localStorage.token}})
                .then(response => {
                    let rep = JSON.parse(response.data);
                    console.log(rep.message);
                    this.dataPost.title = "";
                    this.dataPost.content = "";
                    this.dataPost.userId = "";
                    this.dataPost.id = "";
                  /*   this.dialogUpPost = false; */
                    window.location.assign('http://localhost:8081/Publication');
                })
                .catch(error => {
                    console.log(error);
                })
        },
        deletePost(pId){
            axios.delete("http://localhost:3000/api/posts/" + pId, {headers: {Authorization: 'Bearer ' + localStorage.token}})
                .then(response => {
                    let rep = JSON.parse(response.data);
                    console.log(rep.message);
                    window.location.assign('http://localhost:8081/Publication');
                })
                .catch(error => {
                    console.log(error);    
                })
        },
        afficheCom(pId){
            this.postId = pId;
            this.afficheFrmCm = false;
            axios.get("http://localhost:3000/api/posts/" + pId + "/comments", {headers: {Authorization: 'Bearer ' + localStorage.token}})
                .then(response => {
                    let com = JSON.parse(response.data);
                    this.allComments = com;
                })
                .catch(error => {
                console.log(error);
                });
        },
        afficheFormCom(){
            this.afficheFrmCm = true
        },
        sendCom(pId){
            if (!this.dataCom.content) {
                this.errors.emptyContent = true; 
                return console.log("content can't be empty"); 
            }
            this.dataCom.userId = this.userId;
            this.dataComS = JSON.stringify(this.dataCom);
            axios.post("http://localhost:3000/api/posts/" + pId + "/comments", this.dataComS, {headers: {'Content-Type': 'application/json', Authorization: 'Bearer ' + localStorage.token}})
                .then(response => {
                    let rep = JSON.parse(response.data);
                    console.log(rep.message);
                    this.dataCom.content="";
                    this.dataCom.userId="";
                    this.afficheFrmCm=false;
                    window.location.assign('http://localhost:8081/Publication');


                })
                .catch(error => {
                    console.log(error); 
                    this.message=error;
                    this.msg=true
                });
        },
        likePost(postId, nbLikes){
            this.allLikes.forEach(element => {
                if(element.postId == postId && element.userId == localStorage.userId){
                    this.dataLike.nbLikes = nbLikes+-1;
                    this.dataLike.liked = true;
                }
            });
            if(this.dataLike.liked == false){
                this.dataLike.nbLikes = nbLikes+1;
            }
            this.dataLike.userId = localStorage.userId;
            this.dataLike.postId = postId;
            this.dataLikeS = JSON.stringify(this.dataLike);
            axios.post("http://localhost:3000/api/posts/" + postId + "/like", this.dataLikeS, {headers: {'Content-Type': 'application/json', Authorization: 'Bearer ' + localStorage.token}})
                .then(response => {
                    let rep = JSON.parse(response.data);
                    console.log(rep.message);
                    this.dataLike.liked = false;
                    window.location.assign('http://localhost:8081/Publication');
                })
                .catch(error => {
                    console.log(error);
                    this.dataLike.liked = false;
                })
        },
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

       /*  this.isThereMedia();  */
    },
}
</script>

<style lang="scss" scoped>
    .card-post {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: space-around;
        gap: 3rem;
    } 

    .card-post__allPosts {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        gap: 1rem;
        width: 100%;
        padding: 1rem;
        text-shadow: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.3));
        border-bottom: 1px solid #0f4475;
    }

    .card-post-group-content-img {
        display: flex;
        justify-content: space-between;
        align-content: flex-end;
        flex-wrap: nowrap; 
        gap: 1rem;
        padding:16px;
    }

    .card-post-name {
        margin-bottom: .5rem; 
        border-radius: 16px;
        &__title {
            font-weight: 700;
            font-size: 22px;
            color: #2196f3;
        }
        &__subtitle {
            font-style: italic;
            font-weight: 400;
            font-size: 16px;
        }
    }

    .card-post-content {
        
        display: flex;
        flex-direction: column;
        gap: 1rem;
        width: 400px;

        &__title {
            font-weight: 700;
            font-size: 22px;
        }
        &__content {
            font-weight: 300;
            font-size: 20px;
        }
    }
    
    .card-post-img {
        display: flex;
        justify-content: space-between;
        align-content: center;
        max-width: 100%;
        width: 500px;
        border-radius: 16px;
        
        &__content {
            &--img {
                object-fit: cover;
                width: 100%;
                
                border-radius: 16px;               
            }
        }
    }

    button {
        text-decoration: none;
        border: none;
        background: transparent;
        color: antiquewhite;
        transition: .8s color;  
    }

    button:hover {
    cursor:pointer;
    color: #2196f3;
    
    
    }

    .btn-icon {
        display: flex;
        align-items: baseline;
        gap: 2.5rem;
        padding: 2rem 1rem 1rem .5rem;
    }

    .btn-icon-heart {
        display: flex;
        gap: .6rem;
        transition: .8s font-size;
        

        &--click {
            
            &__icon {
                font-size: 20px; 
            }          

            &__text {
                font-size: 20px; 
            }
           
        }
    }

    .btn-icon-comment {
        &--click {

            &__icon {
                font-size: 20px; 
            }
        }
    }

    .btn-icon-update {
        &--click {

            &__icon {
                font-size: 20px; 
            }
        }
    }

    .btn-icon-4 {
        &__delete {

            &__icon {
                font-size: 20px; 
            }
        }
    }

    .display-comments {
        display: flex;
        justify-content: end;
    }

    .post-update-card{
        max-width: 100%;
        width: 500px;
        background: transparent;
        /* background: #8c8c8c; */
        border-radius: 16px;
        padding: 20px;
    }

    .post-update-card__title {
        text-align: start;
        width: 100%;
    }

    .form-row {
        display: flex;
        margin: 16px 0px;
        gap:1rem;
        flex-wrap: wrap;
    }

    .form-input {
        padding:8px;
        border: none;
        border-radius: 8px;
        background:antiquewhite;
        font-weight: 500;
        font-size: 16px;
        flex:1;
        /* min-width: 100px; */
        font-weight: 700;
        color: antiquewhite;
        &__title {
            background: #1976cd;
        }
        &__content {
            background: #1976cd;
        }
        &::placeholder {
        color:antiquewhite;
        } 
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

    .btn-comment, .btn-update {
        background: #2196f3;
    }

    .btn-comment:hover, .btn-update:hover {
        background: #1976cd;
    }

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
        font-weight: 500;
        font-size: 16px;
        flex:1; 
        min-width: 100px;
        font-weight: 500;
        color:antiquewhite;
            &::placeholder {
                color:antiquewhite;
            } 
    }

    .card-comments-allPosts {
        width: 100%;
        padding: 1rem;
        text-shadow: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.3));
        border-bottom: 1px solid #0f4475;
        &__name {
            font-size: 20px;
            color: #2196f3;
        }
        &__content {
            font-style: italic;
            font-weight: 700;
            font-size: 20px;
        }
    }  

    .card-comments__addComments {
        padding: 1.5rem 0;
        border-bottom: 1px solid #0f4475;
    }

    @media screen and (max-width: 394px) {
        .card-post-name {
            text-align: center;
        }

        .btn-icon {
            align-self: center;
        }


    }
    @media screen and (max-width: 375px) {
        .card-post-name {
            text-align: center;
        }

        .btn-icon {
            align-self: center;
        }

        .form-input__content {
            max-width: 100%;
        }
    }
</style>
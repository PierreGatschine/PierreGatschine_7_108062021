<template>

   <div class="card-publication">
        <div id="nav">
            <router-link to="/" @click="logout"><i class=" icon icon-deconnexion fas fa-power-off"></i></router-link> |
            <router-link to="/profile"><i class="icon icon-profil far fa-user-circle"></i></router-link> |  
            <button @click="access"><i class="icon icon-admin fas fa-user-cog"></i></button>
           <!--  <p v-if="msg">{{ message }}</p> -->
        </div>

      <h1>Messages</h1>
        
        <edit-post /> 
        <posts />

        <router-view />
    </div>

</template>


<script>

import EditPost from '../components/EditPost.vue';
import Posts from '../components/Posts.vue';


export default {
    name: "Publication",
    components: {
        EditPost,
        Posts, 
    },
    data(){
        return {
            role: "", 
            msg:"",
        }
    },
    methods: {
        logout(){
            localStorage.userId = "";
            localStorage.token = "";
            localStorage.role = "";
            localStorage.removeItem();
    },
        access(){
            if(this.role==1) {
                this.$router.push('/admin');
                return
            }/*  else {

            } */
            
        }
    },
    mounted(){
        this.role = localStorage.role;
    },
}
</script>

<style lang="scss" scoped>
    #nav {
        font-size: 25px;
        padding-bottom: 0;
    }

    .icon-deconnexion, .icon-profil, .icon-admin {
         transition: .8s color;
    }

    .icon-deconnexion:hover {
        color: #32a2f9;
    }  

    .icon-profil:hover, .icon-admin:hover {
        color: #0f4475; 
    }



    .fas, .far {
        padding: 1rem;
        font-size: 25px;
    }

    .fa-power-off {  
        color: #0f4475;
    }

    button {
        text-decoration: none;
        border: none;
        background: transparent;
        color: #32a2f9;
    }


    .card-publication {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: space-around;
        gap: 1.5rem;
    }

    h1 {  
        align-self: center;
        font-weight: 700;
        margin-bottom: 16px;
    }



</style>
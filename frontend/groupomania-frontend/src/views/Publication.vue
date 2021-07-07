<template>

   <div class="card-publication">
        <div id="nav">
            <router-link to="/" @click="logout"><i class="icon__deconnexion fas fa-power-off"></i></router-link> |
            <router-link to="/profile"><i class="icon__profil far fa-user-circle"></i></router-link>
        </div>

        <h1 class="card__title">Messages</h1>
        
        <edit-post /> 
        <posts />
 
    </div>

</template>


<script>
/*  */
import EditPost from '../components/EditPost.vue';
import Posts from '../components/Posts.vue';



export default {
    name: "Publication",
    components: {
        EditPost,
        Posts,
        
    } 
    
    

}
</script>

<style lang="scss" scoped>
    #nav {
        font-size: 25px;
        padding-bottom: 0;
    }

    .fas, .far {
        padding: 1rem;
        font-size: 25px;
    }

    .fa-power-off {  
        color: #0f4475;
    }



    .card-publication {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: space-around;
        gap: 1.5rem;
    }

    .card__title {
        text-align: center;
        margin-bottom: 16px;
    }



</style>
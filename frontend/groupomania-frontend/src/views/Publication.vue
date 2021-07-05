<template>

   <div class="card-publication">
        <h1 class="card__title">Messages</h1>
        <edit-post /> 
        <posts />
        <!-- <comments /> -->  
    </div>

</template>


<script>
/*  */
import EditPost from '../components/EditPost.vue';
import Posts from '../components/Posts.vue';
/* import Comments from "../components/Comments.vue" */


export default {
    name: "Publication",
    components: {
        EditPost,
        Posts,
        /* Comments */
    } 
    
    

}
</script>

<style lang="scss" scoped>
    #nav a.router-link-exact-active {
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
        text-align: start;
        margin-bottom: 16px;
    }



</style>
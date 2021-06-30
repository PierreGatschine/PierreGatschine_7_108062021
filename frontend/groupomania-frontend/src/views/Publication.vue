<template>

   <div class="card-publication">
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
        Posts
    } 
    
    

}
</script>

<style lang="scss" scoped>

    .card__title {
        text-align: start;
        margin-bottom: 16px;
    }



</style>
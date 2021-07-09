<template>
<div class="card-Admin-view">
        <div id="nav">
            <router-link to="/publication"><i class="far fa-envelope-open"></i></router-link>
        </div>
        <h1 >Administration messagerie</h1>
        <access-level />
        <router-view />

</div>
    
</template>


<script>
import AccessLevel from '../components/AccessLevel.vue';

export default {
    name: "Admin",
    components: {
        AccessLevel
    },
    
}
</script>

<style lang="scss" scoped>

/* .card {
     background: transparent;
} */
.card-Admin-view {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-around;
    gap: 1.5rem;
}

.fa-envelope-open {
    padding: 1rem;
    font-size: 25px;
    color: #32a2f9;
}

h1 {  
    align-self: center;
    font-weight: 700;
    margin-bottom: 16px;
}

</style>
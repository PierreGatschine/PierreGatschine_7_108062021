<template>
    <div class="card-profile-view">
        <div id="nav">
            <router-link to="/publication"><i class="far fa-envelope-open"></i></router-link>
        </div>

        <user />
        <router-view/>
    </div>
    
</template>

<script>

import User from "../components/User.vue"


export default {
    name: "Profile",
    components: {
        User
    }
}

</script>

<style lang="scss" scoped>

.fa-envelope-open {
    padding: 1rem;
    font-size: 25px;
    color: #32a2f9;
}
</style>
<template>
    <div class="card-img">
        <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
        <img :src="require('../assets/logo_gpa.svg')" alt="Groupomania logo"/>
        <h1>{{ msg }}</h1>
    </div>
</template>

<script>

export default {
    name: 'Header',
    props: {
        msg: String
    }
}
</script>

<style lang="scss" scoped>
.card-img{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

h1 {
    color: antiquewhite;
    font-size: 2rem;
    font-weight: 700;
}

@media screen and (max-width: 500px) {
    img {
      width: 350px;
       
    }
  } 

@media screen and (max-width: 394px) {
    img {
      width: 200px;
       
    }
  } 

</style>




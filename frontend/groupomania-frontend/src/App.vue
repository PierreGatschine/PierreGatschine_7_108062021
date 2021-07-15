<template>
  <div id="app">
   <!--  <div id="nav">
      <router-link to="/login">Connexion</router-link> |
      <router-link to="/" @click="logout">Déconnexion</router-link>
    </div> -->
    <router-view/>
  </div>
</template>

<script>
export default {
  name : 'App',
  methods: {
   logout(){
            localStorage.userId = "";
            localStorage.token = "";
            localStorage.moderation = "";
            localStorage.removeItem();
  },
}
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;1,100&display=swap');
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  
  font-family: "Lato", sans-serif;
}

#app {
  max-width: 640px;
}

body {
  background: rgb(22,91,157);
  background: linear-gradient(63deg, #165b9d 18%, #1976cd 100%);
  color: #faebd7;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}

#nav {
  padding: 30px;

  a {
    text-decoration: none;
    font-weight: bold;
    color: #32A2F9;

    &.router-link-exact-active {
      color: #0f4475;
    }
  }
}
.card {
  max-width: 100%;
  width: 540px;
  background:#32A2F9;
  border-radius: 16px;
  padding:32px;
}

.card__title {
  text-align:center;
  font-weight: 700;
}

.card__subtitle {
  text-align: center;
  color:antiquewhite;
  font-weight: 400;
}

  .button {
    background: #2196F3;
    color:antiquewhite;
    border-radius: 8px;
    font-weight: 700;
    font-size: 15px;
    border: none;
    width: 100%;
    padding: 16px;
    transition: .8s background-color;
  }

  

  .card__action {
    color:#0f4475;
    text-decoration: underline;
  }

  .card__action:hover {
    cursor:pointer;
  }

  .button:hover {
    cursor:pointer;
    background: #1976D2;
  }

  .button--disabled {
    background:#1976D2;
    color:#ececec
  }
  .button--disabled:hover {
    cursor:not-allowed;
    background:#165b9d;
  }

  @media screen and (max-width: 500px) {
    
    .card {
      width: 100%;
      border-radius: 0px;
    }


  } 

  @media screen and (max-width: 394px) {
    
    #nav {
      text-align: center;
      align-self: center;
    }
    .card {
      width: 100%;
      border-radius: 0px; 
    }


  } 
</style>

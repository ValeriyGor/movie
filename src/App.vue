<template>
  <div id="app" class="container">
    <router-view/>
  </div>
</template>

<style lang="scss">
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Open Sans", sans-serif;
  }
  
  body{
    background: #111;
  }

  .container{
    width: 100%;
    margin: 0 auto;
    max-width: 1200px;
    padding: 0 15px;
  }
</style>

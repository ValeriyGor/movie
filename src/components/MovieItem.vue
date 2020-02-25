<template>
  <div class="movie">
    <img :src="img_url + movie.poster_path" class="movie__poster" alt="">
    <p class="movie__title">{{movie.title}}</p>
    <span class="movie__raiting">&#10026; {{movie.vote_average}}</span>
    <router-link :to="'/movie/' + movie.id" class="movie__details-link">Details</router-link>
  </div>
</template>

<script>
    export default {
        name: 'MovieItem',
        props: {
            movie: Object
        },
        computed: {
            img_url(){
                return this.$store.getters.img_url
            }
        }
    }
</script>

<style lang="scss" scoped>
  .movie{
    flex: 0 0 18%;
    max-width: 18%;
    margin-bottom: 20px;
    border-radius: 10px;
    overflow: hidden;
    margin-left: 1%;
    margin-right: 1%;
    background: #333;
    position: relative;

    &__poster{
      width: 100%;
    }

    &__title{
      font-size: 14px;
      line-height: 1.4;
      padding: 10px;
      text-align: center;
      color: #ddd;
    }

    &__details-link{
      background: rgba(0, 0, 0, 0.9);
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      display: flex; /*возможно излишне, но выровнять по вертикали можно быстро :)*/
      align-items: center;
      justify-content: center;
      color: #ddd;
      text-decoration: none;
      text-transform: uppercase;
      opacity: 0;
      transition: all 0.3s;
      font-weight: bold;
      font-style: italic;
      z-index: 2;
      &:hover{
        opacity: 1;
      }
    }

    &__raiting{
      position: absolute;
      top: 0px;
      left: 0;
      padding: 2px 25px;
      background: #333;
      color: #ff0;
      font-size: 12px;
      font-weight: bold;
      z-index: 1;
      border-bottom-right-radius: 15px;
    }
  }

  @media screen and (max-width: 767px){
    .movie{
      flex: 0 0 48%;
      max-width: 48%;
    }
  }
</style>
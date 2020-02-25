<template>
    <div class="movie-details" v-if="filmData">
        <div class="movie-details__head">
            <router-link to="/">&#11013; Back to films list</router-link>
        </div>
        <div class="movie-details__body">
            <div class="movie-details__img">
                <img
                    :src="img_url + filmData.poster_path"
                    alt=""
                >
            </div>
            <div class="movie-details__info">
                <h1>{{filmData.title}}</h1>
                <span v-if="filmData.release_date">Release date: {{filmData.release_date}}</span>
                <div>
                    Homepage: <a :href="filmData.homepage" v-if="filmData.homepage" target="_blank">{{filmData.homepage}}</a>
                </div>

                <p>{{filmData.overview}}</p>
                <div class="production-companies">
                    <div
                        class="production-companies__item"
                        v-for="pc_item in filmData.production_companies"
                        :key="pc_item.id"
                    >
                        <img
                            v-if="pc_item.logo_path !== null"
                            :src="img_url + pc_item.logo_path"
                            alt=""
                        >
                        <span>{{pc_item.name}}</span>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import {showMovie} from "@/services/movies";

    export default {
        name: 'MovieDetails',
        data () {
            return {
                filmData: null
            }
        },
        computed: {
            movieId() {
                return this.$route.params.id;
            },
            img_url(){
                return this.$store.getters.img_url
            }
        },
        created() {
            showMovie(this.movieId).then(response => {
                this.filmData = response.data;
            }).catch(error => {
                alert(error);
            });
        }

    }
</script>

<style lang="scss" scoped>
    .movie-details {
        color: #ddd;

        h1{
            margin-bottom: 10px;
        }

        &__head {
            padding: 25px 0;

            a {
                color: #ddd;
                text-decoration: none;
                font-size: 16px;
            }
        }

        &__body{
            display: flex;
        }

        &__img{
            flex: 0 0 22%;
            max-width: 22%;
            img{
                max-width: 100%;
            }
        }

        &__info{
            flex: 0 0 78%;
            max-width: 78%;
            padding-left: 15px;

            span{
                display: block;
                font-size: 18px;
            }

            a{
                color: #666;
                font-size: 16px;
                display: inline-block;
                margin: 10px 0;
            }

            p{
                font-size: 14px;
                line-height: 1.4;
                margin-bottom: 15px;
                text-align: justify;
            }
        }

    }

    .production-companies{
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;

        &__item{
            flex: 0 0 200px;
            text-align: center;
            padding: 15px 10px;
            margin: 0 10px 10px 0;
            background: #666;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            align-items: center;
            img{
                max-width: 50%;
            }
        }
    }

    @media screen and (max-width: 767px){
        .movie-details{
            &__body {
                flex-direction: column;

            }
            &__img, &__info{
                flex: 0 0 100%;
                max-width: 100%;

            }
            &__img{
                text-align: center;
                margin-bottom: 15px;
            }

            &__info{
                padding-left: 0;
            }

            .production-companies{
                justify-content: space-between;

                &__item{
                    flex: 0 0 48%;
                    max-width: 48%;
                    margin: 0 0 15px 0;
                }
            }
        }
    }
</style>

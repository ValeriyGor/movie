<template>
    <div>
        <SearchMovies/>
        <div class="moviesList">
            <template v-for="movie in moviesList">
                <MovieItem :movie="movie" :key="movie.id"/>
            </template>
        </div>
        <p v-if="moviesList.length === 0" class="not-found-error">No such films found</p>
        <paginate
            :page-count="totalPages"
            :click-handler="changePage"
            :prev-text="'Prev'"
            :next-text="'Next'"
            :container-class="'paginate'"
            :page-class="'page-item'"
            v-if="!searchUsed"
            v-model = "pageMovieList">
        </paginate>
    </div>
</template>

<script>
import MovieItem from '@/components/MovieItem.vue'
import SearchMovies from '@/components/SearchMovies.vue'
import Paginate from 'vuejs-paginate'
import {getAllMovies} from "@/services/movies";

export default {
    name: 'Home',
    components: {
        MovieItem, SearchMovies,
        'paginate': Paginate
    },
    computed: {
        moviesList() {
            return this.$store.getters.movies;
        },
        pageMovieList() {
            return this.$store.getters.pageMovieList
        },
        totalPages() {
            return this.$store.getters.totalPagesMovieList
        },
        searchUsed() {
            return this.$store.getters.searchUsed
        }

    },
    created() {
        if(this.moviesList.length == 0){
            getAllMovies(this.page).then(response => {
                this.$store.dispatch('setMovies', response.data.results);
                this.$store.dispatch('setAllMovies', response.data.results);
                this.$store.dispatch('setTotalPage', response.data.total_pages);
            }).catch(error => {
                alert(error);
            });
        }
    },
    methods: {
        changePage: function(pageNum) {
            getAllMovies(pageNum).then(response => {
                this.$store.dispatch('setPage', pageNum);
                this.$store.dispatch('setMovies', response.data.results);
                this.$store.dispatch('setAllMovies', response.data.results);
                this.$store.dispatch('setTotalPage', response.data.total_pages);
            }).catch(error => {
                alert(error);
            });
        }
    }
}
</script>

<style lang="scss" scoped>
    .moviesList{
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
        padding-top: 40px;
        margin: 0 -1%;
        }

    .not-found-error{
        color: #ffffff;
        text-align: center;
        font-size: 18px;
        margin-bottom: 25px;
    }
</style>

<style lang="scss">
    .paginate {
        list-style: none;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 10px 0 50px;
        li {
            text-align: center;
            border-radius: 2px;
            background: #333;
            color: #eee;
            margin: 3px;
            transition: all 0.3s;
            a{
                font-size: 13px;
                outline: none;
                padding: 5px;
                min-width: 28px;
                display: block;
            }
            &.active{
                background: #666;
            }
            &:not(.disabled):hover{
                background: #666666;
            }
        }
    }
</style>
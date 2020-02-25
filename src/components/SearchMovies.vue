<template>
    <div class="search-movies">
        <label class="search-movies__item">
            <span>Popularity (min: 1, max: 1000)</span>
            <div class="input-group">
                <input class="prepend" type="number" placeholder="Min" min="1" max="999" v-model="popularity.min" @change="setPopularityMin">
                <input class="append" type="number" placeholder="Max" min="2" max="1000" v-model="popularity.max" @change="setPopularityMax">
            </div>
        </label>
        <div class="search-movies__item">
            <span>Search by languages</span>
            <select name="" id="" class="" v-model="language" @change="setLanguage">
                <option v-for="(lang, index) in languages" :key="index" :value="lang.iso_639_1" >{{lang.english_name}}</option>
            </select>
        </div>
        <label class="search-movies__item">
            <span>Search by title</span>
            <input type="text" placeholder="Title" v-model="title" @change="setTitle" >
        </label>
        <label class="search-movies__item">
            <span>Search by description</span>
            <input type="text" placeholder="Description" v-model="description" @change="setDescription">
        </label>
        <div class="search-movies__item">
            <span>Search by release date</span>
            <date-time-picker
                v-model="releaseDates"
                id="registration_end"
                :format="'YYYY-MM-DD'"
                :formatted="'YYYY-MM-DD'"
                label="Select release date"
                range
                dark
                no-label
                @input="setNewDate"
            />
        </div>
        <div class="search-movies__item">
            <button type="button" class="search-button" @click="search">Search</button>
        </div>
    </div>
</template>

<script>
    import VueCtkDateTimePicker from 'vue-ctk-date-time-picker'
    import {getAllLanguages} from "@/services/movies";


    export default {
        name: 'SearchMovies',
        components: {
            'date-time-picker': VueCtkDateTimePicker
        },
        data() {
            return {
                title: "",
                description: "",
                releaseDates: {
                    start: null,
                    end: null
                },
                popularity: {
                    min: null,
                    max: null
                },
                language: "xx"
            }
        },
        computed: {
            languages() {
                return this.$store.getters.languages
            },
            searchData() {
                return this.$store.getters.searchData
            }
        },
        mounted() {
            getAllLanguages().then(response => {
                this.$store.dispatch('setLanguages', response.data);
            }).catch(error => {
                alert(error);
            });

            this.releaseDates.start = this.searchData.dateRangePickerData.start !== null ? this.searchData.dateRangePickerData.start : null;
            this.releaseDates.end = this.searchData.dateRangePickerData.end !== null ? this.searchData.dateRangePickerData.end : null;
            this.title = this.searchData.title;
            this.description = this.searchData.description;
            this.language = this.searchData.language;
            this.popularity.min = this.searchData.popularity.min;
            this.popularity.max = this.searchData.popularity.max;

        },
        methods: {
            setNewDate(){
                if(this.filteredMovies == null){
                    this.filteredMovies = {
                        start: null,
                        end: null
                    }
                }
                this.$store.dispatch('setDateRangePicker', this.releaseDates);
            },
            setTitle(){
                this.$store.dispatch('setTitleSearch', this.title);
            },
            setDescription(){
                this.$store.dispatch('setDescriptionSearch', this.description);
            },
            setLanguage(){
                this.$store.dispatch('setLanguageSearch', this.language);
            },
            setPopularityMin(){
                this.$store.dispatch('setPopularityMinSearch', this.popularity.min);
            },
            setPopularityMax(){
                this.$store.dispatch('setPopularityMaxSearch', this.popularity.max);
            },
            search() {
                let filteredMovies = this.$store.getters.filteredMovies;
                this.$store.dispatch('setMovies', filteredMovies);
            }
        }
    }

</script>

<style lang="scss" scoped>
    .search-movies{
        padding-top: 30px;
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        flex-wrap: wrap;

        &__item{
            flex: 0 0 32%;
            margin-bottom: 10px;
            span{
                display: block;
                color: #ddd;
                padding: 8px 0;
            }

            input, select, button{
                width: 100%;
                height: 42px;
                min-height: 42px;
                padding-left: 12px;
                padding-right: 12px;
                font-weight: 400;
                background-color: #424242;
                border: 1px solid hsla(0,0%,100%,.7);
                color: hsla(0,0%,100%,.7);
                border-radius: 5px;
            }

            .input-group{
                display: flex;

                input{
                    flex: 0 0 50%;
                    max-width: 50%;

                    &.prepend{
                        border-bottom-right-radius: 0;
                        border-top-right-radius: 0;
                        border-right: 0;
                    }
                    &.append{
                        border-bottom-left-radius: 0;
                        border-top-left-radius: 0;
                    }
                }
            }

        }

        .search-button{
            font-size: 16px;
            background-color: #111;
            cursor: pointer;
            transition: all 0.3s;
            &:hover{
                background-color: #333;
            }
        }

        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
        }

        input[type=number] {
            -moz-appearance:textfield;
        }
    }

    @media screen and (max-width: 767px){
        .search-movies{
            padding-top: 20px;
            &__item{
                flex: 0 0 48%;
                max-width: 48%;

                span{
                    font-size: 12px;
                }
            }
        }

    }

</style>
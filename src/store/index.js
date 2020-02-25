import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    api_key: "ec0fa36909faf25674eb0a03053afb02",
    api_url: "https://api.themoviedb.org",
    img_url: "https://image.tmdb.org/t/p/w200/",
    pageMovieList: 1,
    totalPagesMovieList: 1,
    allMoviesList: [],
    movies: [],
    languages: [],
    searchData: {
      popularity: {
        min: '',
        max: '',
      },
      language: "xx",
      title: '',
      description: '',
      dateRangePickerData: {
        start: null,
        end: null
      }
    },
    searchUsed: false
  },
  getters: {
    movies(state) {
      return state.movies
    },
    pageMovieList(state) {
      return state.pageMovieList
    },
    totalPagesMovieList(state) {
      return state.totalPagesMovieList
    },
    img_url(state){
      return state.img_url
    },
    languages(state){
      return state.languages
    },
    searchData(state){
      return state.searchData
    },
    searchUsed(state){
      return state.searchUsed
    },
    filteredMovies(state){
      let filtered = state.allMoviesList
        .filter(movie => {
          return state.searchData.title == '' || movie.title.toLowerCase().indexOf(state.searchData.title.toLowerCase()) !== -1;
        })

        .filter(movie => {
          return state.searchData.description == '' || movie.overview.toLowerCase().indexOf(state.searchData.description.toLowerCase()) !== -1;
        })

        .filter(movie => {
          return state.searchData.language !== 'xx' ? movie.original_language === state.searchData.language : movie
        })

        .filter(movie => {
          return (state.searchData.popularity.min != '' ? parseFloat(movie.popularity) >= parseFloat(state.searchData.popularity.min) : true) && (state.searchData.popularity.max != '' ? parseFloat(movie.popularity) <= parseFloat(state.searchData.popularity.max): true);
        })

        .filter(movie => {
          return (state.searchData.dateRangePickerData.start != null ? new Date(movie.release_date) >= new Date(state.searchData.dateRangePickerData.start) : true) && (state.searchData.dateRangePickerData.end != null ? new Date(movie.release_date) <= new Date(state.searchData.dateRangePickerData.end) : true);
        });
      return filtered;
    }
  },
  mutations: {
    SET_MOVIES: (state, payload) => {
      state.movies = payload;
    },
    SET_ALL_MOVIES: (state, payload) => {
      payload.forEach((movie) => {
        if(!state.allMoviesList.find(everyMovie => everyMovie.id === movie.id)){
          state.allMoviesList.push(movie);
        }
      });
    },
    SET_PAGE: (state, payload) => {
      state.pageMovieList = payload
    },
    SET_TOTAL_PAGE: (state, payload) => {
      state.totalPagesMovieList = payload
    },
    SET_LANGUAGES: (state, payload) => {
      state.languages = payload
    },
    SET_DATE_RANGE_PICKER: (state, payload) => {
      state.searchData.dateRangePickerData = payload
    },
    SET_TITLE_SEARCH: (state, payload) => {
      state.searchData.title = payload
    },
    SET_DESCRIPTION_SEARCH: (state, payload) => {
      state.searchData.description = payload
    },
    SET_LANGUAGE_SEARCH: (state, payload) => {
      state.searchData.language = payload
    },
    SET_POPULARITY_MIN_SEARCH: (state, payload) => {
      state.searchData.popularity.min = payload
    },
    SET_POPULARITY_MAX_SEARCH: (state, payload) => {
      state.searchData.popularity.max = payload
    }
  },
  actions: {
    setMovies: ({commit, state}, payload) => {
      commit('SET_MOVIES', payload)
      return state.movies
    },
    setAllMovies: ({commit, state}, payload) => {
      commit('SET_ALL_MOVIES', payload)
      return state.allMoviesList
    },
    setPage: ({commit, state}, payload) => {
      commit('SET_PAGE', payload)
      return state.pageMovieList
    },
    setTotalPage: ({commit, state}, payload) => {
      commit('SET_TOTAL_PAGE', payload)
      return state.totalPagesMovieList
    },
    setLanguages: ({commit, state}, payload) => {
      commit('SET_LANGUAGES', payload)
      return state.languages
    },
    setDateRangePicker: ({commit, state}, payload) => {
      commit('SET_DATE_RANGE_PICKER', payload)
      return state.searchData.dateRangePickerData
    },
    setTitleSearch: ({commit, state}, payload) => {
      commit('SET_TITLE_SEARCH', payload)
      return state.searchData.title
    },
    setDescriptionSearch: ({commit, state}, payload) => {
      commit('SET_DESCRIPTION_SEARCH', payload)
      return state.searchData.description
    },
    setLanguageSearch: ({commit, state}, payload) => {
      commit('SET_LANGUAGE_SEARCH', payload)
      return state.searchData.language
    },
    setPopularityMinSearch: ({commit, state}, payload) => {
      commit('SET_POPULARITY_MIN_SEARCH', payload)
      return state.searchData.popularity.min
    },
    setPopularityMaxSearch: ({commit, state}, payload) => {
      commit('SET_POPULARITY_MAX_SEARCH', payload)
      return state.searchData.popularity.max
    }
  }
})

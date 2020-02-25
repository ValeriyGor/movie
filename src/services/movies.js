import axios from 'axios'
import store from '../store';


export function getAllMovies(page) {
    let params = {
        api_key: store.state.api_key,
        language: "en-US",
        page: page !== undefined ? page : '1'
    }
    return new Promise((res, rej) => {
        axios.get(store.state.api_url + '/3/movie/popular', {params})
            .then(function (response) {
                res({
                    data: response.data
                })
            })
            .catch(function (error) {
                rej(error.response);
            });
    });
}

export function showMovie(movieId) {
    let params = {
        api_key: store.state.api_key,
        language: "en-US"
    }
    return new Promise((res, rej) => {
        axios.get(store.state.api_url + '/3/movie/' + movieId, {params})
            .then(function (response) {
                res({
                    data: response.data
                })
            })
            .catch(function (error) {
                rej(error.response);
            });
    });
}


export function getAllLanguages() {
    let params = {
        api_key: store.state.api_key
    }
    return new Promise((res, rej) => {
        axios.get(store.state.api_url + '/3/configuration/languages', {params})
            .then(function (response) {
                res({
                    data: response.data
                })
            })
            .catch(function (error) {
                rej(error.response);
            });
    });
}

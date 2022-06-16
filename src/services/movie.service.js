
const http = require('http');
const https = require('https');
const axios = require('axios');
const leatherboard = require('./assets/leatherboard.json')

const fetchPopularMovies = async () => {
    const response = await axios.get('https://api.themoviedb.org/3/movie/popular?api_key=dee17c7fa847c4e845721f113414b74c&language=en-US&page=1')
        .catch(function (error) {
            // handle error
            console.log(error);
        })
    return response.data;
}

const fetchPopularTV = async () => {
    const response = await axios.get('https://api.themoviedb.org/3/tv/popular?api_key=dee17c7fa847c4e845721f113414b74c&language=en-US&page=1')
        .catch(function (error) {
            // handle error
            console.log(error);
        })
    return response.data;
}

const fetchTopRatedMovies = async () => {
    const response = await axios.get('https://api.themoviedb.org/3/movie/top_rated?api_key=dee17c7fa847c4e845721f113414b74c&language=en-US&page=1')
        .catch(function (error) {
            // handle error
            console.log(error);
        })
    return response.data;
}

const fetchTopRatedTV = async () => {
    const response = await axios.get('https://api.themoviedb.org/3/tv/top_rated?api_key=dee17c7fa847c4e845721f113414b74c&language=en-US&page=1')
        .catch(function (error) {
            // handle error
            console.log(error);
        })
    return response.data;
}

const fetchTranding = async (filter) => {
    const response = await axios.get(`https://api.themoviedb.org/3/trending/all/${filter}?api_key=dee17c7fa847c4e845721f113414b74c`)
        .catch(function (error) {
            // handle error
            console.log(error);
        })
    return response.data;
}

const fetchLeaterBoard = async () => {
    return leatherboard;
}

const fetchMovieDetails = async (type, movieId) => {

    console.log("MovieId => ", movieId);


    const response = await axios.get(`https://api.themoviedb.org/3/${type}/${movieId}?api_key=dee17c7fa847c4e845721f113414b74c&language=en-US`)
        .catch(function (error) {
            // handle error
            // console.log(error);
        })

    const watchProvider = await axios.get(`https://api.themoviedb.org/3/${type}/${movieId}/watch/providers?api_key=dee17c7fa847c4e845721f113414b74c`)
        .catch(function (error) {
            // handle error
            // console.log(error);
        })

    var data = response.data;
    if (watchProvider.data.results.IN == null) {
        data.providers = watchProvider.data.results.US;

    } else {
        data.providers = watchProvider.data.results.IN;

    }


    return data;
}


const fetchPopularMoviesByPages = async (type, filter, totalPages) => {

    const finalResponse = {
        results: []
    };

    for (var i = 1; i <= totalPages; i++) {
        const response = await axios.get(`https://api.themoviedb.org/3/${type}/${filter}?api_key=dee17c7fa847c4e845721f113414b74c&language=en-US&page=${i}`)
            .catch(function (error) {
                // handle error
                // console.log(error);
            })

        finalResponse.results = [
            ...finalResponse.results,
            ...response.data.results
        ]
        console.log(response);
    }

    console.log(finalResponse);
    return finalResponse;
}


const fetchByQuery = async (query) => {
    const response = await axios.get(`https://api.themoviedb.org/3/search/multi?api_key=dee17c7fa847c4e845721f113414b74c&language=en-US&query=${query}&page=1&include_adult=false`)
        .catch(function (error) {
            // handle error
            // console.log(error);
        })
    return response.data;
}

const createSession = async (username, password) => {
    const tokenResponse = await axios.get(`https://api.themoviedb.org/3/authentication/token/new?api_key=dee17c7fa847c4e845721f113414b74c`)
        .catch(function (error) {
            // handle error
            console.log(error);
        })

    const sessionResponse = await axios.post(`https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=dee17c7fa847c4e845721f113414b74c
        `,
        {
            "username": "rohitlok12",
            "password": "Science@123",
            "request_token": tokenResponse.data.request_token

        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })




    return sessionResponse.data;
}


module.exports = {
    fetchPopularMovies,
    fetchPopularTV,
    fetchTopRatedMovies,
    fetchTopRatedTV,
    fetchTranding,
    fetchLeaterBoard,
    fetchMovieDetails,
    fetchPopularMoviesByPages,
    fetchByQuery,
    createSession
}
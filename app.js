var express = require('express');
const cors = require('cors');
const { fetchPopularMovies, fetchPopularTV, fetchTopRatedMovies, fetchTopRatedTV, fetchTranding, fetchLeaterBoard, fetchMovieDetails, fetchPopularMoviesByPages, fetchByQuery, createSession } = require('./src/services/movie.service');

var app = express();


app.use(express.json());
// enable cors
app.use(cors());
app.options('*', cors());


app.get('/', function (req, res) {
    res.send('Welcome kljlkjlkjlkto JavaTpoint');
})

app.get('/movies/popular', async function (req, res) {
    const data = await fetchPopularMovies();
    res.send(data);
})

app.get('/media/:type/:filter/:pages', async function (req, res) {
    const page = req.params['pages']
    const filter = req.params['filter']
    const type = req.params['type']

    const data = await fetchPopularMoviesByPages(type, filter, page);
    res.send(data);
})

app.get('/tv/popular', async function (req, res) {
    const data = await fetchPopularTV();
    res.send(data);
})

app.get('/movies/top-rated', async function (req, res) {
    const data = await fetchTopRatedMovies();
    res.send(data);
})

app.get('/tv/top-rated', async function (req, res) {
    const data = await fetchTopRatedTV();
    res.send(data);
})

app.get('/trending/:filter', async function (req, res) {
    const filter = req.params['filter']
    const data = await fetchTranding(filter);
    res.send(data);
})

app.get('/leatherboard', async function (req, res) {
    const data = await fetchLeaterBoard();
    res.send(data);
})

app.get('/media-details/:type/:movieId', async function (req, res) {
    const movieId = req.params['movieId']
    const type = req.params['type']


    console.log('movideid route => ', movieId)

    const data = await fetchMovieDetails(type, movieId);
    res.send(data);
})


app.get('/search/:query', async function (req, res) {
    const query = req.params['query']
    const data = await fetchByQuery(query);
    res.send(data);
})

app.post('/login', async function (req, res) {
    const username = req.body['username']
    const password = req.body['password']
    const data = await createSession(username, password);
    res.send(data);
})



var server = app.listen(8000, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
})  
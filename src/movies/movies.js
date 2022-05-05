/******************  SERVER  ******************/
const Router = require('express')
const express = require('express');
const moviesInput = new Router();

const Container = require('../models/container');
const movieContainer = new Container('./src/data/movies.json')


/* DATA STORAGE */
const data = require('../data/movies.json');

/* HABILITA EL USO DEL JSON */
moviesInput.use(express.json());
moviesInput.use(express.urlencoded({extended: true}))

const userAuthorization = require('../auth/auth');

moviesInput.get('/movie', userAuthorization, (req, res) => {
    res.json(data)
})

moviesInput.post('/movie', userAuthorization, async (req, res) => {
    const newMovie = req.body;
    console.log(req.body)
    const idProductoNuevo = await movieContainer.save(newMovie);
    res.send('The movie was successfully uploaded to our database')
}) 

module.exports = moviesInput
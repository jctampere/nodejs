'use strict;'
//Include crypto to generate the movie id
var crypto = require('crypto');
var movieList = [];

module.exports = {
    movieList : movieList,
    save: save,
    find: find,
    remove: remove,
    update: update
};


        /*
         * Save the movie inside the "db".
         */
       function save(movie) {
            movie.id = crypto.randomBytes(20).toString('hex'); // fast enough for our purpose
           movieList.push(movie);
            return 1;
        }
        /*
         * Retrieve a movie with a given id or return all the movies if the id is undefined.
         */
        function find(id) {
            if(id) {
                return movieList.find(function(element) {
                        return element.id === id;
            });
            }else {
                return movieList;
            }
        }
        /*
         * Delete a movie with the given id.
         */
        function remove(id) {
            var found = 0;
            movieList = movieList.filter(function(element) {
                    if(element.id === id) {
                found = 1;
            }else {
                return element.id !== id;
            }
        });
            return found;
        }
        /*
         * Update a movie with the given id
         */
        function update(id, movie) {
            var movieIndex = movieList.findIndex(function(element) {
                    return element.id === id;
        });
            if(movieIndex !== -1) {
                movieList[movieIndex].title = movie.title;
                movieList[movieIndex].year = movie.year;
                return 1;
            }else {
                return 0;
            }
        }


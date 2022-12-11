const Movie = require("../models/Movie");

// Display All Movies Data
const getMovies = (req, res) => {
	Movie.find(function (err, movies) {
		res.json(movies);
	});
};

// Create New Movie
const createMovie = (req, res) => {
	let movie = new Movie(req.body);
	movie
		.save()
		.then((movie) => {
			res.send(movie);
		})
		.catch(function (err) {
            console.log(err)
			res.status(422).send("Movie add failed");
		});
};

// Show a particular Movie Detail by Name
const getMovie = (req, res) => {
	Movie.find(req.params, function (err, movie) {

		if (movie.length ==0) {
			res.status(404).send("No result found");
		} else {
			res.json(movie);
		}
	});
};

// Update Movie Detail by Name
const updateMovie = (req, res) => {
	Movie.findOneAndUpdate(req.params, req.body)
		.then(function () {
			res.json("Movie updated");
		})
		.catch(function (err) {
			res.status(422).send("Movie update failed.");
		});
};

// Delete Movie Detail by Name
const deleteMovie = (req, res) => {
    console.log(req.params)
	Movie.findOne(req.params, function (err, movie) {
        console.log(movie)
		if (!movie) {
			res.status(404).send("Movie not found");
		} else {
			Movie.findOneAndDelete(req.params)
				.then(function () {
					res.status(200).json("Movie deleted");
				})
				.catch(function (err) {
					res.status(400).send("Movie delete failed.");
				});
		}
	});
};

//search movies 
const searchMovies =(req, res) =>{
	Movie.find((err, movies) => {
		if(err){
			res.status(500).send(err)
		}
		
		const searchedMovies = movies.filter((item) => {
            return item.Title.toLowerCase().includes(req.body.searchBody)
        })
		if(req.body.searchBody == ""){
			currentPage = movies.slice(req.body.page * 5, req.body.page * 5 + 5)
			res.send({"currentPage": currentPage, "pages": Math.ceil(movies.length/5), "movies": searchedMovies})
			return;
		}
		console.log(searchedMovies)
		currentPage = searchedMovies.slice(req.body.page * 5, req.body.page * 5 + 5);
		res.send({"currentPage": currentPage, "pages": Math.ceil(searchedMovies.length/5), "movies": searchedMovies})
		return;
	})
}

module.exports = {
	getMovies,
	getMovie,
	createMovie,
	updateMovie,
	deleteMovie,
	searchMovies
};
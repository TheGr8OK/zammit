const express = require("express");
const router = express.Router();
const movieController = require('../controllers/movieController');
const { authenticateRole, authenticateToken } = require("../middlewares/authentication");
const Roles = require("../Roles");

router.get("/movie", movieController.getMovies);
router.post("/movie", authenticateToken, authenticateRole(Roles.MODERATOR), movieController.createMovie);
router.get("/movie/:Title", movieController.getMovie);
router.put("/movie/:Title", authenticateToken, authenticateRole(Roles.MODERATOR), movieController.updateMovie);
router.delete("/movie/:Title", authenticateToken, authenticateRole(Roles.MODERATOR), movieController.deleteMovie);

module.exports = router;
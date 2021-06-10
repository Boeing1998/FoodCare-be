const express = require("express");
const router = express.Router();

const checkAdmin = require('../helper/check-admin');

const FavoriteController = require('../controllers/favorite.controllers');

const checkAuth = require('../helper/check-auth');

router.get("/:id",checkAuth, FavoriteController.createFav);

router.get("/user/show",checkAuth, FavoriteController.findFav);

module.exports = router;

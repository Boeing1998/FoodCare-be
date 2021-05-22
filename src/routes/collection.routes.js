const express = require("express");
const router = express.Router();

const checkAdmin = require('../helper/check-admin');

const CollectionController = require('../controllers/collection.controllers');

const checkAuth = require('../helper/check-auth');

router.post("/create",checkAuth, CollectionController.createColection);

router.get("/show",checkAuth, CollectionController.showColection);

router.get("/:collectionID",checkAuth, CollectionController.detailColection);

router.patch("/add", checkAuth, CollectionController.addFood);

router.patch("/del", checkAuth, CollectionController.delFood);

module.exports = router;

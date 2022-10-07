const { Router } = require("express");
const { Genre } = require("../db.js");
const { getGenres } = require('../middlewares/all.js')

const router = Router();

router.get('/', async (req, res) => {
 await getGenres()
   let genres = await Genre.findAll({order:['name']})
    return res.status(200).send(genres)
})

module.exports = router;
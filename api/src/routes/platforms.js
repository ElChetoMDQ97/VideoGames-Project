const { Router } = require("express");
const { Platform } = require("../db.js");
const { getPlatforms } = require('../middlewares/all.js')

const router = Router();

router.get('/', async (req, res) => {
 await getPlatforms()
   let platforms = await Platform.findAll({order:['name']})
    return res.status(200).send(platforms)
})

module.exports = router;
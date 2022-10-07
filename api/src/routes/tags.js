const { Router } = require("express");
const { Tag } = require("../db.js");
const { getTags } = require('../middlewares/all.js')

const router = Router();

router.get('/', async (req, res) => {
 await getTags()
   let tags = await Tag.findAll({order:['name']})
    return res.status(200).send(tags)
})

module.exports = router;
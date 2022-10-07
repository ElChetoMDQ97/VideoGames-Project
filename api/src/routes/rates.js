const { Router } = require("express");
const { Rate } = require("../db.js");
const { getRates } = require('../middlewares/all.js')

const router = Router();

router.get('/', async (req, res) => {
 await getRates()
   let rates = await Rate.findAll({order:['name']})
    return res.status(200).send(rates)
})

module.exports = router;
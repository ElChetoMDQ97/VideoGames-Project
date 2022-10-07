const { Router } = require("express");
const { Store } = require("../db.js");
const { getStores } = require('../middlewares/all.js')

const router = Router();

router.get('/', async (req, res) => {
 await getStores()
   let stores = await Store.findAll({order:['name']})
    return res.status(200).send(stores)
})

module.exports = router;
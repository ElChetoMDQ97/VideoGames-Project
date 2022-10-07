const { Router } = require('express');

const genre = require('./genres.js');
const platform = require('./platforms.js');
const rate = require('./rates.js');
const store = require('./stores.js');
const tag = require('./tags.js');
const videogame = require('./videogames.js');
const deleted = require('./deleted.js');

const router = Router();

router.use('/genres', genre);
router.use('/platforms', platform);
router.use('/rates', rate);
router.use('/stores', store);
router.use('/tags', tag);
router.use('/videogames', videogame);
router.use('/deleted', deleted);

module.exports = router;
const { Router } = require('express');
const { getVideogames } = require('../middlewares/all.js');
const { Videogame, Tag, Store, Rate, Platform, Genre } = require('../db.js');

const router = Router();

router.get('/', async (req, res) => {
let exist = await Videogame.findOne({where: {id: 1}})
if(!exist){
    await getVideogames()
}
const { name } = req.query;

if(name){
    let videogame = await Videogame.findAll({
        order: ['id'],
        where: {name: name},
        include: [{
            model: Tag,
            attributes: ['name'],
            through:{
                attributes: [],
            },
        },
        {
            model: Store,
            attributes: ['name'],
            through:{
                attributes: [],
            },
        },
        {
            model: Rate,
            attributes: ['name'],
            through:{
                attributes: [],
            },
        },
        {
            model: Genre,
            attributes: ['name'],
            through:{
                attributes: [],
            },
        },
        {
            model: Platform,
            attributes: ['name'],
            through:{
                attributes: [],
            },
        },
    ]
    })
    
    return res.status(200).send(videogame)

} else {
    res.status(200).send(await Videogame.findAll({
        order: ['id'],
        include: [{
            model: Tag,
            attributes: ['name'],
            through:{
                attributes: [],
            },
        },
        {
            model: Store,
            attributes: ['name'],
            through:{
                attributes: [],
            },
        },
        {
            model: Rate,
            attributes: ['name'],
            through:{
                attributes: [],
            },
        },
        {
            model: Genre,
            attributes: ['name'],
            through:{
                attributes: [],
            },
        },
        {
            model: Platform,
            attributes: ['name'],
            through:{
                attributes: [],
            },
        },
    ]
    }))
}
})

router.get('/:id', async (req, res) => {
const { id } = req.params;
let videogame = await Videogame.findOne({
    where: {id: id},
    include: [{
        model: Tag,
        attributes: ['name'],
        through:{
            attributes: [],
        },
    },
    {
        model: Store,
        attributes: ['name'],
        through:{
            attributes: [],
        },
    },
    {
        model: Rate,
        attributes: ['name'],
        through:{
            attributes: [],
        },
    },
    {
        model: Genre,
        attributes: ['name'],
        through:{
            attributes: [],
        },
    },
    {
        model: Platform,
        attributes: ['name'],
        through:{
            attributes: [],
        },
    },
]
})
if(videogame){
    res.status(200).send(videogame)
}else{
    res.status(404).send(`Error 404: Cant found dog with id: ${id}`)
}
})

router.post('/', async (req, res) => {
let {
name,
backImg,
released,
rating,
ratings_count,
lastUpdate,
playTime,
Genre,
Platform,
Rate,
screenshot,
Store,
Tag,
} = req.body;

if(!name){return res.status(409).send('Name is required')}
const exist = await Videogame.findOne({where: {name: name}})
if(exist) return res.status(410).send('Error 410: videogame already exist');

const newVideoGame = await Videogame.create({
    name,
    backImg,
    released,
    rating,
    ratings_count,
    lastUpdate,
    screenshot,
    playTime,
})

await newVideoGame.addGenres(Genre);
await newVideoGame.addPlatforms(Platform);
await newVideoGame.addRates(Rate);
await newVideoGame.addStores(Store);
await newVideoGame.addTags(Tag);

res.status(200).send('Videogame created successfully')
})

module.exports = router;
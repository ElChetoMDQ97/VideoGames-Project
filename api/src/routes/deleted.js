const { Router } = require('express');
const { Videogame } = require('../db.js');

const router = Router();

router.delete('/:id', async(req,res) => {
    const id = req.params.id;
    let deleteVideogame = await Videogame.findOne({where: {id: id}});
    if(deleteVideogame){
        await Videogame.destroy({
            where:{id: id},
        });
       return res.status(200).send({message: `Deleted videogame with id: ${id}`})
    }
    return res.status(412).send({message: 'Error 412: cant delete videogame'})
});

module.exports = router;
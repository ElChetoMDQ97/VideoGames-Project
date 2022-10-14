const { Videogame, Tag, Store, Rate, Platform, Genre } = require('../db.js')
const dotenv = require('dotenv');
const  axios  = require('axios');
dotenv.config({ path: '../../.env'});


const api = process.env.API_KEY

const pages = [];
for(let i = 0; i < 25; i++){
    pages.push(i+1)
}

const getGenres = async () => {
    try{
        var urlGet = pages.map(async (e) => await axios.get(`https://api.rawg.io/api/games?key=${api}&page=${e}&page_size=40`))
        let allUrlGet = await Promise.all(urlGet)
        let apiUrls = allUrlGet.reduce( (prev, curr) => {
            return prev.concat(curr.data.results);
        }, [ ]);
        apiUrls.map(e => {
            let gen = e.genres ? e.genres : ['Not defined']
            gen?.map((g)=>{
                Genre.findOrCreate({
                    where:{name: g.name}
                })
            })
        })
    }
    catch(e){console.log(e)}

}

const getPlatforms = async () => {
    try{
        var urlGet = pages.map(async (e) => await axios.get(`https://api.rawg.io/api/games?key=${api}&page=${e}&page_size=40`))
        let allUrlGet = await Promise.all(urlGet)
        let apiUrls = allUrlGet.reduce( (prev, curr) => {
            return prev.concat(curr.data.results);
        }, [ ]);
        apiUrls.map(e => {
            let plat = e.platforms ? e.platforms : ['Unkown']
            plat?.map((p)=>{
                Platform.findOrCreate({
                    where:{name: p.platform.name}
                })
            })
        })
    }
    catch(e){console.log(e)}
}


const getRates = async () => {
    try{
        var urlGet = pages.map(async (e) => await axios.get(`https://api.rawg.io/api/games?key=${api}&page=${e}&page_size=40`))
        let allUrlGet = await Promise.all(urlGet)
        let apiUrls = allUrlGet.reduce( (prev, curr) => {
            return prev.concat(curr.data.results);
        }, [ ]);
        apiUrls.map(e => {
            let rate = e.esrb_rating ? e.esrb_rating.name : 'Rating Pending'
                Rate.findOrCreate({
                    where:{name: rate}
                })
        })
    }
    catch(e){console.log(e)}
}

const getStores = async () => {
    try{
        var urlGet = pages.map(async (e) => await axios.get(`https://api.rawg.io/api/games?key=${api}&page=${e}&page_size=40`))
        let allUrlGet = await Promise.all(urlGet)
        let apiUrls = allUrlGet.reduce( (prev, curr) => {
            return prev.concat(curr.data.results);
        }, [ ]);
        apiUrls.map(e => {
            let stores = e.stores ? e.stores : ['Unkown']
            stores?.map((e)=>{
                Store.findOrCreate({
                    where:{name: e.store.name}
                })
            })
        })
    }
    catch(e){console.log(e)}
}

const getTags = async () => {
    try{
        var urlGet = pages.map(async (e) => await axios.get(`https://api.rawg.io/api/games?key=${api}&page=${e}&page_size=40`))
        let allUrlGet = await Promise.all(urlGet)
        let apiUrls = allUrlGet.reduce( (prev, curr) => {
            return prev.concat(curr.data.results);
        }, [ ]);
        apiUrls.map(e => {
            let tags = e.tags ? e.tags : ['Untagged']
            tags?.map(async (t)=>{
               await Tag.findOrCreate({
                    where:{name: t.name}
                })
            })
        })}
        catch(e){
            console.log(e)
        }
}

const getVideogames = async () => {
try{

let found = Genre.findOne({where: {id: 1}})

    if(!found){
    await getGenres()
    await getPlatforms()
    await getRates()
    await getStores()
    await getTags()
     }

    let exist = await Videogame.findOne({
        where: {id: 1}
    })
    
    if(!exist){
        var urlGet = pages.map(async (e) => await axios.get(`https://api.rawg.io/api/games?key=${api}&page=${e}&page_size=40`))
        let allUrlGet = await Promise.all(urlGet)
        let apiUrls = allUrlGet.reduce( (prev, curr) => {
            return prev.concat(curr.data.results);
        }, [ ]);
apiUrls.map(async videogame => 
    {
            let idsG = [];
            let idsP = [];
            let idsR = [];
            let idsSt = [];
            let idsT = [];


                        for(let i = 0; i < videogame.genres.length; i++){
              let genres = await Genre.findOne({where:{name: [videogame.genres[i].name]}})
              let id = genres.id
              idsG.push(id)
            }        
            for(let i = 0; i < videogame.platforms.length; i++){
                let platforms = await Platform.findOne({where:{name: [videogame.platforms[i].platform.name]}})
                let check = idsP.includes(videogame.platforms[i].platform.name)
                if(!check){                
                let id = platforms.id
                idsP.push(id)
            }
              }
            for(let i = 0; i < 1; i++){
                let rate = videogame.esrb_rating ? videogame.esrb_rating.name : 'Rating Pending'
                let rates = await Rate.findOne({where:{name: [rate]}})
                let id = rates.id
                idsR.push(id)
              }
            for(let i = 0; i < videogame.stores.length; i++){
                let stores = await Store.findOne({where:{name: [videogame.stores[i].store.name]}})
                let id = stores.id
                idsSt.push(id)
              }
            for(let i = 0; i < videogame.tags.length; i++){
                let tags = await Tag.findOne({where:{name: [videogame.tags[i].name]}})
                let id = tags.id
                idsT.push(id)
              }

        
            let newVideoGame = await Videogame.create({
                name: videogame.name,
                backImg: videogame.background_image,
                released: videogame.released,
                rating: videogame.rating,
                ratings_count: videogame.ratings_count,
                lastUpdate: videogame.updated,
                playTime: videogame.playtime,
                screenshot: videogame.short_screenshots?.map(e => e.image),
                fromApi: true,
           })
   
           if(idsR.length === 0){idsR.push(9)}
           await newVideoGame.addGenres(idsG);
           await newVideoGame.addPlatforms(idsP);
           await newVideoGame.addRates(idsR);
           await newVideoGame.addStores(idsSt);
           await newVideoGame.addTags(idsT);
        
    })
    return console.log('Creation process done successfully')
}
return console.log('Verification process done successfully')
}
catch(e){console.log(e)}
}

module.exports = {
    getVideogames,
    getTags,
    getStores,
    getRates,
    getPlatforms,
    getGenres,
  }

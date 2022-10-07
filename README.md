#### Applied technologies:

- React
- Redux
- Express
- NodeJS
- CSS
- Sequelize - Postgres

## Frontend

__LandPage__: A little description of the project page 

__Home__: It contains:

- Searchbar
- Navbar
- All video-games cards
- filters

__Video-game Card Detail__: 

- Name, image
- Description 
- Rating
- Platforms
- Genres

__Video-game creation page__: debe contener

- Form __controlled with JavaScript__ with:
  - Name
  - Description
  - Platforms
  - Rating

## Base de datos

Models:

- [ ] Videogame properties:
  - ID
  - Name
  - Description
  - Fecha de lanzamiento
  - Rating

- Genre:
  - ID
  - Name

- Platforms:
  - ID
  - Name

- Store:
  - ID
  - Name

- Tag:
  - ID
  - Name

- Rate:
  - ID
  - Name

## Backend

Node/Express server with rutes:


- [ ] __GET /videogames__: list of all videogames
 
- [ ] __GET /videogames?name="..."__: list of all videogames that match with the name passed by query

- [ ] __GET /videogame/{idVideogame}__: detail of the Video-Game with id that match id passed by params

- [ ] __POST /videogames__: route used to post data from create form

- [ ] __GET /genres__: list of all genres

- [ ] __GET /stores__: list of all stores

- [ ] __GET /platforms__: list of all platforms
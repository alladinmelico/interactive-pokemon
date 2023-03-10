import express, { Request } from 'express'
import cors from 'cors'
import database from './config/database.config'
import UserRoute from './user/UserRoute'
import ItemRoute from './item/ItemRoute'
import PokemonRoute from './pokemon/PokemonRoute'

database.sync()

const PORT = process.env.PORT || 9000
export const app = express()

app.use(express.json())
app.use(cors<Request>())

app.use('/api', UserRoute)
app.use('/api', PokemonRoute)
app.use('/api', ItemRoute)

export const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

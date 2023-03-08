import express from 'express'
import database from './config/database.config'
import UserRouter from './user/route'
import PostRouter from './post/route'

database.sync()

const PORT = process.env.PORT || 9000
export const app = express()

app.use(express.json())

app.use('/api', UserRouter)
app.use('/api', PostRouter)

export const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

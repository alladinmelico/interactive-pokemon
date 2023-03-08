import { Sequelize } from 'sequelize'

const database = new Sequelize('app', '', '', {
  storage: './database.sqlite',
  dialect: 'sqlite',
  logging: false,
})

export default database

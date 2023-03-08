import { DataTypes, Model } from 'sequelize'
import database from '../config/database.config'

interface IPokemon {
  id: string
  name: string
  UserId: string
}

export class PokemonModel extends Model<IPokemon> {}

PokemonModel.init(
  {
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    UserId: {
      type: DataTypes.UUIDV4,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
  },
  {
    sequelize: database,
    tableName: 'pokemons',
    modelName: 'Pokemon',
  }
)

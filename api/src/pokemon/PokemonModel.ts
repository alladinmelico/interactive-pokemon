import { DataTypes, Model } from 'sequelize'
import database from '../config/database.config'

export interface IPokemon {
  id: string
  pokemonId: number
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
    pokemonId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    UserId: {
      type: DataTypes.UUIDV4,
      allowNull: false,
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

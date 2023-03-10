import Items, { Item } from '../item/Items.constant'
import { DataTypes, Model } from 'sequelize'
import database from '../config/database.config'
import { PokemonModel } from '../pokemon/PokemonModel'

interface IUser {
  id: string
  name: string
  email: string
  password?: string
  items?: string
  Pokemons?: Array<PokemonModel>
}

export class UserModel extends Model<IUser> {}

UserModel.init(
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
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    items: {
      type: DataTypes.STRING,
      get: function () {
        const itemsArr = this.getDataValue('items')?.split(',')
        return itemsArr
          ?.filter((item) => !!item)
          .map((item) => ({ ...Items.get(item), name: item }))
      },
    },
  },
  {
    sequelize: database,
    tableName: 'users',
    modelName: 'User',
    defaultScope: {
      attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
    },
    scopes: {
      auth: {},
    },
  }
)

UserModel.hasMany(PokemonModel)

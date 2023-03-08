import { DataTypes, Model } from 'sequelize'
import database from '../../config/database.config'

interface IUser {
  id: string
  name: string
  email: string
  password?: string
}

export class UserInstance extends Model<IUser> {}

UserInstance.init(
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

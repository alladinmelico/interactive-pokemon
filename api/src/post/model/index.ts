import { DataTypes, Model } from 'sequelize'
import database from '../../config/database.config'
import { UserModel } from '../../user/UserModel'

interface IPost {
  id: string
  title: string
  description: string
  UserId?: string
}

export class PostInstance extends Model<IPost> {}

PostInstance.init(
  {
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
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
    tableName: 'posts',
    modelName: 'Post',
  }
)

PostInstance.belongsTo(UserModel)

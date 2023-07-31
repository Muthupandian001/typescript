import { Sequelize, Model, DataTypes, ForeignKey, CreationOptional } from 'sequelize';
import { sequelize } from '../config/sequelize';
// import { Attribute, PrimaryKey, AutoIncrement, NotNull } from '@sequelize/core/decorators-legacy';



export class User extends Model {
    declare id: CreationOptional<number>;
    declare user_name: string;
    declare first_name:string;
    declare last_name:number;
    declare password: string;
    declare status: CreationOptional<number>;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
  }

  User.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
      },
      user_name: {
        type: new DataTypes.STRING(128),
        allowNull: true
      },
      first_name: {
        type: new DataTypes.STRING(128),
        allowNull: true
      },
      last_name: {
        type: new DataTypes.STRING(128),
        allowNull: false
      },
      password: {
        type: new DataTypes.STRING(128),
        allowNull: true
      },
      status: {
        type: DataTypes.TINYINT,
        defaultValue: 1,
        allowNull: false
      },
    //   createdAt: DataTypes.DATE,
    //   updatedAt: DataTypes.DATE,
    },
    {
      timestamps: true,
      tableName: 'user',
      sequelize // passing the `sequelize` instance is required
      
    }
  );


  User.sync()
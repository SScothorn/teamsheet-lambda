// import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes } from 'sequelize';
// import { Model } from 'sequelize-typescript';
// import { getSequelizeInstance } from '../db';

// class Player extends Model<InferAttributes<Player>, InferCreationAttributes<Player>> {
// 	// id can be undefined during creation when using `autoIncrement`
// 	declare id: CreationOptional<number>;
// 	declare name: string;

// 	// createdAt can be undefined during creation
// 	declare createdAt: CreationOptional<Date>;
// 	// updatedAt can be undefined during creation
// 	declare updatedAt: CreationOptional<Date>;
// }

// Player.init(
// 	{
// 		id: {
// 			type: DataTypes.INTEGER.UNSIGNED,
// 			autoIncrement: true,
// 			primaryKey: true,
// 		},
// 		name: {
// 			type: new DataTypes.STRING(128),
// 			allowNull: false,
// 		},
// 		createdAt: DataTypes.DATE,
// 		updatedAt: DataTypes.DATE,
// 	},
// 	{
// 		tableName: 'users',
// 		sequelize: getSequelizeInstance(), // passing the `sequelize` instance is required
// 	},
// );

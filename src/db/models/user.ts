import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, InitOptions } from 'sequelize';
import { Base } from './base';

export class User extends Base<InferAttributes<User>, InferCreationAttributes<User>> {
	// id can be undefined during creation when using `autoIncrement`
	declare id: CreationOptional<number>;
	declare firstName: string;
	declare lastName: string;

	static get modelFields() {
		return {
			id: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true,
			},
			firstName: {
				type: new DataTypes.STRING(128),
				allowNull: false,
			},
			lastName: {
				type: new DataTypes.STRING(128),
				allowNull: false,
			},
			...super.modelFields,
		};
	}

	static get modelOptions(): Partial<InitOptions> {
		return {
			...super.modelOptions,
		};
	}
}

// import { Model, InferAttributes, InferCreationAttributes, DataTypes, ForeignKey } from 'sequelize';

// class Project extends Model<InferAttributes<Project>, InferCreationAttributes<Project>> {
//   id: number;
//   userId: ForeignKey<number>;
// }

// // this configures the `userId` attribute.
// Project.belongsTo(User);

// // therefore, `userId` doesn't need to be specified here.
// Project.init({
//   id: {
//     type: DataTypes.INTEGER,
//     primaryKey: true,
//     autoIncrement: true,
//   },
// }, { sequelize });

import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, InitOptions } from 'sequelize';
import { Base } from './base';
import { User } from './user';

export class Matches extends Base<InferAttributes<Matches>, InferCreationAttributes<Matches>> {
	// id can be undefined during creation when using `autoIncrement`
	declare id: CreationOptional<number>;
	declare name: string;

	static get modelFields() {
		return {
			id: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true,
			},
			name: {
				type: new DataTypes.STRING(128),
				allowNull: false,
			},
			date: {
				type: DataTypes.DATE,
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

// // this configures the `user_id` attribute.
Matches.belongsTo(User);

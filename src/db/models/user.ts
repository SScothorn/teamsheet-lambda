import { Association, CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, InitOptions, NonAttribute } from 'sequelize';
import { Base } from './base';
import { Match } from './match';

export class User extends Base<InferAttributes<User>, InferCreationAttributes<User>> {
	// id can be undefined during creation when using `autoIncrement`
	declare id: CreationOptional<number>;
	declare firstName: string;
	declare lastName: string;
	declare matches?: NonAttribute<Match[]>;

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

	static associate(): void {
		User.hasMany(Match, {
			sourceKey: 'id',
			foreignKey: 'user_id',
			as: 'matches', // this determines the name in `associations`!
		});
	}

	declare static associations: {
		matches: Association<User, Match>;
	};
}

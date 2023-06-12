import { Association, CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, InitOptions, NonAttribute } from 'sequelize';
import { BaseModel } from './base.model';
import { MatchModel } from './match.model';

export class UserModel extends BaseModel<InferAttributes<UserModel>, InferCreationAttributes<UserModel>> {
	// id can be undefined during creation when using `autoIncrement`
	declare id: CreationOptional<number>;
	declare firstName: string;
	declare lastName: string;
	declare matches?: NonAttribute<MatchModel[]>;

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
		UserModel.hasMany(MatchModel, {
			sourceKey: 'id',
			foreignKey: 'user_id',
			as: 'matches', // this determines the name in `associations`!
		});
	}

	declare static associations: {
		matches: Association<UserModel, MatchModel>;
	};
}

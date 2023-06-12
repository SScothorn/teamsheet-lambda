import { CreationOptional, DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, InitOptions } from 'sequelize';
import { BaseModel } from './base.model';
import { UserModel } from './user.model';

export class MatchModel extends BaseModel<InferAttributes<MatchModel>, InferCreationAttributes<MatchModel>> {
	// id can be undefined during creation when using `autoIncrement`
	declare id: CreationOptional<number>;
	declare name: string;
	declare date: Date;
	declare userId: ForeignKey<UserModel['id']>;

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

	static associate(): void {
		MatchModel.belongsTo(UserModel, { targetKey: 'id' });
	}
}

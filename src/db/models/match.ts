import { CreationOptional, DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, InitOptions } from 'sequelize';
import { Base } from './base';
import { User } from './user';

export class Match extends Base<InferAttributes<Match>, InferCreationAttributes<Match>> {
	// id can be undefined during creation when using `autoIncrement`
	declare id: CreationOptional<number>;
	declare name: string;
	declare date: Date;
	declare userId: ForeignKey<User['id']>;

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
		Match.belongsTo(User, { targetKey: 'id' });
	}
}

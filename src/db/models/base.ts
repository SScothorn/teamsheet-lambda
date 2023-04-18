import { InitOptions } from 'sequelize';
import { CreationOptional, DataTypes } from 'sequelize';
import { Model, Sequelize } from 'sequelize';

export abstract class Base<TModelAttributes extends {} = any, TCreationAttributes extends {} = TModelAttributes> extends Model<TModelAttributes, TCreationAttributes> {
	// createdAt can be undefined during creation
	declare createdAt: CreationOptional<Date>;
	// updatedAt can be undefined during creation
	declare updatedAt: CreationOptional<Date>;

	static get modelFields() {
		return {
			createdAt: {
				type: DataTypes.DATE,
			},
			updatedAt: {
				type: DataTypes.DATE,
			},
		};
	}

	static get modelOptions(): Partial<InitOptions> {
		return {
			underscored: true,
		};
	}

	static initModel(sequelize: Sequelize) {
		const options = { ...this.modelOptions, sequelize };
		return super.init(this.modelFields, options);
	}
}

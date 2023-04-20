import { QueryInterface } from 'sequelize';
import { DataType } from 'sequelize-typescript';

module.exports = {
	up: (queryInterface: QueryInterface): Promise<void> =>
		queryInterface.sequelize.transaction(async (transaction) => {
			// here go all migration changes
			await queryInterface.createTable(
				'users',
				{
					id: {
						allowNull: false,
						autoIncrement: true,
						primaryKey: true,
						type: DataType.INTEGER,
					},
					first_name: {
						type: DataType.STRING,
					},
					last_name: {
						type: DataType.STRING,
					},
					created_at: {
						allowNull: false,
						type: DataType.DATE,
					},
					updated_at: {
						allowNull: false,
						type: DataType.DATE,
					},
				},
				{ transaction },
			);
		}),

	down: (queryInterface: QueryInterface): Promise<void> =>
		queryInterface.sequelize.transaction(async (transaction) => {
			// here go all migration undo changes
			await queryInterface.dropTable('users', { transaction });
		}),
};

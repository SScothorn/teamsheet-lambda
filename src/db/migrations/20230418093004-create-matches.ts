import { DataTypes, QueryInterface } from 'sequelize';

module.exports = {
	up: (queryInterface: QueryInterface): Promise<void> =>
		queryInterface.sequelize.transaction(async (transaction) => {
			// here go all migration changes
			await queryInterface.createTable(
				'matches',
				{
					id: {
						allowNull: false,
						autoIncrement: true,
						primaryKey: true,
						type: DataTypes.INTEGER,
					},
					name: {
						allowNull: false,
						type: DataTypes.STRING,
					},
					date: {
						allowNull: false,
						type: DataTypes.DATE,
					},
					user_id: {
						type: DataTypes.INTEGER,
						references: {
							model: {
								tableName: 'users',
							},
							key: 'id',
						},
						allowNull: false,
					},
					created_at: {
						allowNull: false,
						type: DataTypes.DATE,
					},
					updated_at: {
						allowNull: false,
						type: DataTypes.DATE,
					},
				},
				{ transaction },
			);
		}),

	down: (queryInterface: QueryInterface): Promise<void> =>
		queryInterface.sequelize.transaction(async (transaction) => {
			// here go all migration undo changes
			await queryInterface.dropTable('matches', { transaction });
		}),
};

'use strict';

import { QueryInterface } from 'sequelize';

module.exports = {
	up: (queryInterface: QueryInterface): Promise<void> =>
		queryInterface.sequelize.transaction(async (transaction) => {
			// here go all seed changes
			await queryInterface.bulkInsert(
				'users',
				[
					{
						first_name: 'John',
						last_name: 'Smith',
						created_at: new Date(),
						updated_at: new Date(),
					},
					{
						first_name: 'Peter',
						last_name: 'Smith',
						created_at: new Date(),
						updated_at: new Date(),
					},
					{
						first_name: 'Garry',
						last_name: 'Smith',
						created_at: new Date(),
						updated_at: new Date(),
					},
				],
				{ transaction },
			);
		}),

	down: (queryInterface: QueryInterface): Promise<void> =>
		queryInterface.sequelize.transaction(async (transaction) => {
			// here go all seed undo changes
			await queryInterface.bulkDelete('users', {}, { transaction });
		}),
};

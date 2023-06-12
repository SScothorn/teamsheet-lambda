'use strict';

import { QueryInterface } from 'sequelize';
import { User } from '../../types';
import { generateUsers } from '../../faker/user.faker';

module.exports = {
	up: (queryInterface: QueryInterface): Promise<void> =>
		queryInterface.sequelize.transaction(async (transaction) => {
			const users: User[] = generateUsers(10, true);
			// here go all seed changes
			await queryInterface.bulkInsert(
				'users',
				users,
				// [
				// 	{
				// 		first_name: 'John',
				// 		last_name: 'Smith',
				// 		created_at: new Date(),
				// 		updated_at: new Date(),
				// 	},
				// 	{
				// 		first_name: 'Peter',
				// 		last_name: 'Smith',
				// 		created_at: new Date(),
				// 		updated_at: new Date(),
				// 	},
				// 	{
				// 		first_name: 'Garry',
				// 		last_name: 'Smith',
				// 		created_at: new Date(),
				// 		updated_at: new Date(),
				// 	},
				// ],
				{ transaction },
			);
		}),

	down: (queryInterface: QueryInterface): Promise<void> =>
		queryInterface.sequelize.transaction(async (transaction) => {
			// here go all seed undo changes
			await queryInterface.bulkDelete('users', {}, { transaction });
		}),
};

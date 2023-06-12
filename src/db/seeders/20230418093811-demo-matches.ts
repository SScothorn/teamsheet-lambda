'use strict';
import { UserModel } from 'db/models/user.model';
import { QueryInterface } from 'sequelize';

module.exports = {
	up: (queryInterface: QueryInterface): Promise<void> =>
		queryInterface.sequelize.transaction(async (transaction) => {
			// here go all seed changes
			const users: Partial<UserModel>[] = (await queryInterface.sequelize.query(`SELECT id from users;`))[0] as Partial<UserModel>[];
			console.log(users);

			const matches = users.map((user, i) => {
				console.log(user.id);
				const match = {
					name: `Generated match ${i}`,
					date: new Date(),
					user_id: user.id,
					created_at: new Date(),
					updated_at: new Date(),
				};
				return match;
			});

			await queryInterface.bulkInsert('matches', matches, { transaction });
		}),

	down: (queryInterface: QueryInterface): Promise<void> =>
		queryInterface.sequelize.transaction(async (transaction) => {
			// here go all seed undo changes
			await queryInterface.bulkDelete('matches', {}, { transaction });
		}),
};

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		/**
		 * Add seed commands here.
		 *
		 * Example:
		 * await queryInterface.bulkInsert('People', [{
		 *   name: 'John Doe',
		 *   isBetaMember: false
		 * }], {});
		 */
		const users = (await queryInterface.sequelize.query(`SELECT id from users;`))[0];
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

		await queryInterface.bulkInsert('matches', matches, {});
	},

	async down(queryInterface, Sequelize) {
		/**
		 * Add commands to revert seed here.
		 *
		 * Example:
		 * await queryInterface.bulkDelete('People', null, {});
		 */
		await queryInterface.bulkDelete('matches', {});
	},
};

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
			{},
		);
	},

	async down(queryInterface, Sequelize) {
		/**
		 * Add commands to revert seed here.
		 *
		 * Example:
		 * await queryInterface.bulkDelete('People', null, {});
		 */
		await queryInterface.bulkDelete('users', {});
	},
};

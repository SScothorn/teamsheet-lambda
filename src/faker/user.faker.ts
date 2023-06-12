import { faker } from '@faker-js/faker';
import { User } from '../types';
import { generateBase } from './base.faker';

export function generateUsers(numberOfUsers: number, includeBase = false): User[] {
	const uewUsers: User[] = [];
	for (let i = 0; i < numberOfUsers; i++) {
		uewUsers.push(generateUser(includeBase));
	}
	return uewUsers;
}

export function generateUser(includeBase = false, overrides: Partial<User> = {}): User {
	const sex = faker.name.sexType();
	const firstName = faker.name.firstName(sex);
	const lastName = faker.name.lastName();
	// const email = faker.helpers.unique(faker.internet.email, [firstName, lastName]);

	const newUser: User = {
		id: Number.parseInt(faker.datatype.uuid()),
		firstName,
		lastName,
		...(includeBase && generateBase()),
		...overrides,
	};
	return newUser;
}

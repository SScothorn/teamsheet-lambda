import { faker } from '@faker-js/faker';
import { Base } from '../types';

export function generateBase(overrides: Partial<Base> = {}): Base {
	const createdAt = faker.date.past(1);
	// Creates an updatedAt value, with a chance of being the same as createdAt, or sooner if different
	const updatedChance = 0.1;
	const updatedAt = Math.random() < updatedChance ? faker.date.between(createdAt, new Date()) : createdAt;
	const newBase: Base = {
		created_at: createdAt,
		updated_at: updatedAt,
		...overrides,
	};
	return newBase;
}

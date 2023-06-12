import { faker } from '@faker-js/faker';
import { Match } from '../types';
import { generateBase } from './base.faker';

export function generateMatch(userId: number, includeBase = false, overrides: Partial<Match> = {}): Match {
	const id = Number.parseInt(faker.datatype.uuid());
	const newMatch: Match = {
		id,
		name: `Match ${id}`,
		userId,
		date: faker.date.recent(90),
		...(includeBase && generateBase()),
		...overrides,
	};
	return newMatch;
}

import { CreationAttributes } from 'sequelize';
import { MatchModel } from './db/models/match.model';
import { UserModel } from './db/models/user.model';
import { BaseModel } from './db/models/base.model';
import { InputType } from 'zlib';
import { generateUser } from './faker/user.faker';

export type Base = CreationAttributes<BaseModel>;
export type User = CreationAttributes<UserModel>;
export type Match = CreationAttributes<MatchModel>;
// export type SnakeCase<T, Res extends string = ''> = T extends `${infer F}${infer R}`
// 	? Uppercase<F> extends F
// 		? SnakeCase<R, `${Res}_${Lowercase<F>}`>
// 		: SnakeCase<R, `${Res}${F}`>
// 	: Res;
type CamelToSnakeCase<S extends string> = S extends `${infer T}${infer U}` ? `${T extends Capitalize<T> ? '_' : ''}${Lowercase<T>}${CamelToSnakeCase<U>}` : S;
type SnakeCaseify<InputType extends Record<string, unknown>> = { [K in keyof InputType as CamelToSnakeCase<K & string>]: InputType[K] };

const test: User = generateUser();
const test2: SnakeCaseify<User> = test;
git;

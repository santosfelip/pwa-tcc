export interface IUser {
	uid: string;
	password?: string;
	name: string;
	email: string;
	city: string;
	stateCode: string;
	points: number | string;
	plan: string;
};

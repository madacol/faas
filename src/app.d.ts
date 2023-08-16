// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		interface Locals {
			user: UserInfo;
		}
		interface UserInfo {
			user_id: number;
			name: string;
			lastname: string;
			email: string;
			expired: Date;
			is_verified: boolean;
			verification_status: string;
			roles: number[];
			permissions: string[];
			image_data_url: string;
		}
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};

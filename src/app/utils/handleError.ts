
export class HandleError {
	public static getMessageError(err): string {
		let message = 'Sistema indisponível!';
		if(typeof err?.error?.data === 'string' || typeof err?.message === 'string') {
			message =  err?.error?.data || err?.message;
		};

		return message;
	}
}

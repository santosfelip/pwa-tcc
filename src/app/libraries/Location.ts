export class Location {
	private static OPEN_KEY = '772e0baf4b084ff1857abf8d25c3769b';
	private static IPAPI_KEY = '13629a8252287dce2e6f300a0539f8fa';

	public static async getLocationInfo(): Promise<ILocation | null> {
		try {
			//const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${this.OPEN_KEY}`);
			const response = await fetch(`http://api.ipstack.com/check?access_key=${this.IPAPI_KEY}&format=1`);
			const responseJSON = await response.json();

			if(!responseJSON) {
				throw new Error('Não foi possível salvar a sua localização!');
			};

			return {
				city: responseJSON.city,
				stateCode: responseJSON.region_code,
				latitude: responseJSON.latitude,
				longitude: responseJSON.longitude
			};

		} catch (error) {
			throw new Error('Não foi possível salvar a sua localização!');
		}
	}
}

export interface ILocation {
	city: string;
	stateCode: string;
	latitude: number;
	longitude: number;
};

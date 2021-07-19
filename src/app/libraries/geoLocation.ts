import { Geolocation } from '@capacitor/geolocation';

interface ILocation {
	latitude: number;
	longitude: number;
}

export class GeoLocation {
	public static async getCurrentLocation(): Promise<ILocation | undefined> {
		const { coords } = await Geolocation.getCurrentPosition();

		return {
			latitude: coords.latitude,
			longitude: coords.longitude
		};
	}
}

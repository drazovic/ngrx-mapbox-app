import { LngLat, LngLatLike } from 'mapbox-gl';
import { Geocode, ListItem, PropertyItem } from '.';

export class Marker {
	coords: LngLatLike;
	propertyID: number;
	order: number;

	constructor(item: ListItem | PropertyItem) {
		this.coords = Marker.getGeocodeCoords(item.geocode);
		this.propertyID = item.propertyID;
		this.order = 'order' in item ? item.order : null;
	}

	static getGeocodeCoords(geocode: Geocode) {
		const coords = new LngLat(
			Number(geocode.Longitude),
			Number(geocode.Latitude)
		);
		return coords;
	}
}

export enum MarkerTypes {
	BLUE = 'https://my.smartapartmentdata.com/assets/images/pin/pin-blue.svg',
	RED = 'https://my.smartapartmentdata.com/assets/images/pin/pin-red.svg',
}

import { LngLat } from 'mapbox-gl';

import { Geocode, ListItem } from './ListItems.model';
import { PropertyItem } from './PropertyItem.model';

export class GeoJSONFeature {
	type: 'Feature';
	geometry: {
		type: 'Point';
		coordinates: number[];
	};
	properties: {
		[name: string]: any;
	};

	constructor(item: PropertyItem | ListItem) {
		this.type = 'Feature';
		this.geometry = {
			type: 'Point',
			coordinates: GeoJSONFeature.getGeocodeCoords(item.geocode),
		};
		this.properties = {
			propertyID: item.propertyID,
			order: 'order' in item ? item.order : null,
		};
	}

	static getGeocodeCoords(geocode: Geocode) {
		const coords = [Number(geocode.Longitude), Number(geocode.Latitude)];
		return coords;
	}

	static convertGeocodeToLngLat(geocode: Geocode) {
		const lngLat = new LngLat(
			Number(geocode.Longitude),
			Number(geocode.Latitude)
		);
		return lngLat;
	}

	static convertCoordsToLngLat(coords: number[]) {
		const lngLat = new LngLat(coords[0], coords[1]);
		return lngLat;
	}
}

export enum MarkerTypes {
	PointMarker = 'https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-32.png',
}

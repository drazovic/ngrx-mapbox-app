import { Injectable } from '@angular/core';

import { Map, LngLatLike, LngLat } from 'mapbox-gl';
import { Geocode } from '../../list/models/list-items';

@Injectable({
	providedIn: 'root',
})
export class MapService {
	public map: Map;

	constructor() {}

	setMap(map: Map) {
		this.map = map;
	}

	flyTo(center: LngLatLike, zoom: number) {
		this.map.flyTo({
			center,
			zoom,
		});
	}

	getGeocodeCoords(geocode: Geocode) {
		const coords = new LngLat(
			Number(geocode.Longitude),
			Number(geocode.Latitude)
		);
		return coords;
	}
}

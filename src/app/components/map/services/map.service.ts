import { Injectable } from '@angular/core';

import { Map, LngLatLike } from 'mapbox-gl';

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
}

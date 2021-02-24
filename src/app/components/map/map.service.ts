import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import * as mapboxgl from 'mapbox-gl';
import { GeoJSONFeature } from 'src/app/models/GeoJSONFeature.model';

@Injectable({
	providedIn: 'root',
})
export class MapService {
	map: mapboxgl.Map;
	style = environment.map.style;
	initialCenter = {
		lat: 29.701546276233813,
		lng: -95.41682110099543,
	};
	initialZoom = 11;
	maxZoom = 14;

	constructor() {
		(mapboxgl.accessToken as any) = environment.map.accessToken;
	}

	buildMap(divElement: HTMLElement) {
		this.map = new mapboxgl.Map({
			container: divElement,
			style: this.style,
			zoom: this.initialZoom,
			center: this.initialCenter,
		});

		this.addNavigationControl();

		this.loadPinImages();

		return this.map;
	}

	setFeatureMarker(feature: GeoJSONFeature) {
		this.map.addSource('point', {
			type: 'geojson',
			data: feature,
		});

		// Add a symbol layer
		this.map.addLayer({
			id: 'point',
			type: 'symbol',
			source: 'point',
			layout: {
				'icon-image': 'point-marker',
			},
		});

		this.map.flyTo({
			center: GeoJSONFeature.convertCoordsToLngLat(
				feature.geometry.coordinates
			),
			zoom: 13,
		});
	}

	setFeatureCollection(features: GeoJSONFeature[]) {
		this.map.addSource('points', {
			type: 'geojson',
			data: {
				type: 'FeatureCollection',
				features: features,
			},
		});

		// Add a symbol layer
		this.map.addLayer({
			id: 'points',
			type: 'symbol',
			source: 'points',
			layout: {
				'icon-image': 'points-marker',
				// get the title name from the source's "title" property
				'text-field': ['get', 'order'],
				'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
				'text-offset': [-1, 0],
				'text-anchor': 'bottom',
			},
		});

		const bounds = features.reduce((accumulator, feature) => {
			const lngLat = GeoJSONFeature.convertCoordsToLngLat(
				feature.geometry.coordinates
			);
			accumulator.extend(lngLat);
			return accumulator;
		}, new mapboxgl.LngLatBounds());

		this.map.fitBounds(bounds, { padding: 60 });
	}

	private addNavigationControl() {
		this.map.addControl(new mapboxgl.NavigationControl());
	}

	private loadPinImages() {
		this.map.loadImage(
			'https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-32.png',
			(error, image) => {
				if (error) throw error;
				this.map.addImage('points-marker', image);
			}
		);

		this.map.loadImage(
			'https://cdn2.iconfinder.com/data/icons/bitsies/128/Location-32.png',
			(error, image) => {
				if (error) throw error;
				this.map.addImage('point-marker', image);
			}
		);
	}
}

import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

import * as mapboxgl from 'mapbox-gl';

import { GeoJSONFeature, MarkerTypes } from '../../models/GeoJSONFeature.model';

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

	constructor() {
		(mapboxgl.accessToken as any) = environment.map.accessToken;
	}

	buildMap(divElement: HTMLElement) {
		this.map = this.initializeMap(divElement);
		this.addNavigationControl();
		this.loadPinImages();
		return this.map;
	}

	private initializeMap(divElement: HTMLElement) {
		return new mapboxgl.Map({
			container: divElement,
			style: this.style,
			zoom: this.initialZoom,
			center: this.initialCenter,
		});
	}

	private addNavigationControl() {
		this.map.addControl(new mapboxgl.NavigationControl());
	}

	private loadPinImages() {
		this.map.loadImage(MarkerTypes.PointMarker, (error, image) => {
			if (error) throw error;
			this.map.addImage('point-marker', image);
		});
	}

	setFeature(feature: GeoJSONFeature) {
		this.prepareMap();

		this.addSource('property', {
			type: 'geojson',
			data: feature,
		});

		this.addLayer({
			id: 'property',
			type: 'symbol',
			source: 'property',
			layout: {
				'icon-image': 'property-pin-2',
			},
		});

		this.flyTo(feature.geometry.coordinates);
	}

	setFeatureCollection(features: GeoJSONFeature[]) {
		this.prepareMap();

		this.addSource('listItems', {
			type: 'geojson',
			data: {
				type: 'FeatureCollection',
				features: features,
			},
		});

		this.addLayer({
			id: 'listItems',
			type: 'symbol',
			source: 'listItems',
			layout: {
				'icon-image': 'point-marker',
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

	private addLayer(layer: mapboxgl.AnyLayer) {
		this.map.addLayer(layer);
	}

	private addSource(id: string, source: mapboxgl.AnySourceData) {
		this.map.addSource(id, source);
	}

	private flyTo(coords: number[]) {
		this.map.flyTo({
			center: GeoJSONFeature.convertCoordsToLngLat(coords),
			zoom: 13,
		});
	}

	private prepareMap() {
		if (this.map.getLayer('listItems')) {
			this.map.removeLayer('listItems');
			this.map.removeSource('listItems');
		}

		if (this.map.getLayer('property')) {
			this.map.removeLayer('property');
			this.map.removeSource('property');
		}
	}
}

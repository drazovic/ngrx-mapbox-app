import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import * as mapboxgl from 'mapbox-gl';
import { Marker } from 'src/app/models/Marker.model';

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

	setFeatureMarker(marker: Marker) {
		this.map.addSource('point', {
			type: 'geojson',
			data: {
				type: 'Feature',
				geometry: {
					type: 'Point',
					coordinates: [-95.608796, 29.719188],
				},
				properties: {
					title: 'Mapbox SF',
				},
			},
		});

		// Add a symbol layer
		this.map.addLayer({
			id: 'point',
			type: 'symbol',
			source: 'point',
			layout: {
				'icon-image': 'point-marker',
				// get the title name from the source's "title" property
				'text-field': ['get', 'title'],
				'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
				'text-offset': [0, 1.25],
				'text-anchor': 'top',
			},
		});

        this.map.flyTo({
            center: marker.coords,
            zoom: 13,
        });
	}

	setFeatureCollectionMarkers(markers: Marker[]) {
		const features = markers.map<any>((marker) => {
			console.log(marker);

			return {
				type: 'Feature',
				geometry: {
					type: 'Point',
					coordinates: [Number(marker.coords['lng']), Number(marker.coords['lat'])],
				},
				properties: {
					title: marker.order,
				},
			};
		});

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
				'text-field': ['get', 'title'],
				'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
				'text-offset': [0, 1.25],
				'text-anchor': 'top',
			},
		});

		const bounds = markers.reduce((accumulator, marker) => {
			accumulator.extend(marker.coords);
			return accumulator;
		}, new mapboxgl.LngLatBounds());

		this.map.fitBounds(bounds, { padding: 60 });
	}

	buildMap(divElement: HTMLElement) {
		console.log(12);

		this.map = new mapboxgl.Map({
			container: divElement,
			style: this.style,
			zoom: this.initialZoom,
			center: this.initialCenter,
		});

		this.map.addControl(new mapboxgl.NavigationControl());

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

		this.map.on('load', (event) => {
			this.map.on('click', 'points', (e) => {
				console.log(e.features);

				this.setFeatureMarker(e.features[0].geometry['coordinates'])

				this.map.setLayoutProperty('points', 'visibility', 'none');
			});
		});
	}
}

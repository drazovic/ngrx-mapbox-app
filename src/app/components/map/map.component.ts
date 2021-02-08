import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { LngLatBoundsLike, LngLatLike, Map } from 'mapbox-gl';

import { MapService } from './services/map.service';
import * as fromApp from '../../store/app.reducer';
import * as MapActions from './store/map.actions';
import * as mapSelectors from './store/map.selectors';

@Component({
	selector: 'app-map',
	templateUrl: './map.component.html',
	styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit {
	initialCenter = {
		lat: 29.701546276233813,
		lng: -95.41682110099543,
	};
	initialZoom = 11;
    bounds: LngLatBoundsLike;
	style =
		'https://api.maptiler.com/maps/eef16200-c4cc-4285-9370-c71ca24bb42d/style.json?key=SoL71Zyf7SmLrVYWC7fQ';
	markers$: Observable<LngLatLike[]>;

	constructor(
		private mapService: MapService,
		private store: Store<fromApp.AppState>
	) {}

	ngOnInit(): void {
		this.markers$ = this.store.select(mapSelectors.getMarkers);
	}

	onMapLoad(map: Map) {
		this.mapService.setMap(map);
		this.updateMap(map);
	}

	onMoveEnd(event: { target: Map }) {
		const { target } = event;
		this.updateMap(target);
	}

	updateMap(map: Map) {
		this.store.dispatch(
			MapActions.updateMap({
				bounds: map.getBounds(),
				center: map.getCenter(),
				zoom: map.getZoom(),
			})
		);
	}

	onMarkerClicked(marker: LngLatLike) {
		this.store.dispatch(MapActions.markerClicked(marker));
	}
}

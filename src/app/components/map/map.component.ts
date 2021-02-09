import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { FitBoundsOptions, LngLatBoundsLike, Map } from 'mapbox-gl';

import * as fromApp from '../../store/app.reducer';
import * as MapActions from '../../store/app.actions';
import * as mapSelectors from '../../store/app.selectors';
import { Marker } from '../../models';

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
	maxZoom = 14;
	bounds$: Observable<LngLatBoundsLike>;
	fitBoundsOptions: FitBoundsOptions = { padding: 60 };
	style =
		'https://api.maptiler.com/maps/eef16200-c4cc-4285-9370-c71ca24bb42d/style.json?key=SoL71Zyf7SmLrVYWC7fQ';
	markers$: Observable<Marker[]>;
	markerType$: Observable<string>;

	constructor(
		private store: Store<fromApp.AppState>,
		private router: Router
	) {
		this.markers$ = this.store.select(mapSelectors.getMarkers);
		this.bounds$ = this.store.select(mapSelectors.getBounds);
		this.markerType$ = this.store.select(mapSelectors.getMarkerType);
	}

	ngOnInit(): void {}

	onMapLoad(map: Map) {
		this.store.dispatch(
			MapActions.updateMap({
				center: map.getCenter(),
				zoom: map.getZoom(),
			})
		);
	}

	onMarkerClicked(propertyID: number) {
		this.router.navigate([propertyID]);
	}
}

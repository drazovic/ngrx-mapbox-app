import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { FitBoundsOptions, LngLatBoundsLike, Map } from 'mapbox-gl';

import * as fromApp from '../../store/app.reducer';
import * as MapActions from '../../store/app.actions';
import * as mapSelectors from '../../store/app.selectors';
import { environment } from 'src/environments/environment';
import { Marker } from 'src/app/models/Marker.model';

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
	style = environment.map.style;
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
			new MapActions.UpdateMap({
				center: map.getCenter(),
				zoom: map.getZoom(),
			})
		);
	}

	onMarkerClicked(propertyID: number) {
		this.router.navigate([propertyID]);
	}
}

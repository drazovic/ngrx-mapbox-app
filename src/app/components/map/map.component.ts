import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, pipe } from 'rxjs';

import { FitBoundsOptions, LngLatBoundsLike, Map } from 'mapbox-gl';

import { MapService } from './services/map.service';
import * as fromApp from '../../store/app.reducer';
import * as MapActions from './store/map.actions';
import * as mapSelectors from './store/map.selectors';
import { Router } from '@angular/router';
import { Geocode, ListItem } from '../list/models/list-items';
import { first } from 'rxjs/operators';

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
	bounds$: Observable<LngLatBoundsLike>;
	fitBoundsOptions: FitBoundsOptions = { padding: 60 };
	style =
		'https://api.maptiler.com/maps/eef16200-c4cc-4285-9370-c71ca24bb42d/style.json?key=SoL71Zyf7SmLrVYWC7fQ';
	listItems$: Observable<ListItem[]>;

	constructor(
		private mapService: MapService,
		private store: Store<fromApp.AppState>,
		private router: Router
	) {
		this.listItems$ = this.store.select(mapSelectors.getListItems);
		this.bounds$ = this.store.select(mapSelectors.getBounds);
	}

	ngOnInit(): void {}

	onMapLoad(map: Map) {
		this.mapService.setMap(map);
		this.store.dispatch(
			MapActions.updateMap({
				center: map.getCenter(),
				zoom: map.getZoom(),
			})
		);
	}

	onMarkerClicked(listItem: ListItem) {
		this.router.navigate([listItem.propertyID]);
	}

	getCoords(geocode: Geocode) {
		return this.mapService.getGeocodeCoords(geocode);
	}
}

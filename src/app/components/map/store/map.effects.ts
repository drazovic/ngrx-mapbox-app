import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { debounceTime, map, switchMap, tap } from 'rxjs/operators';

import { LngLat, LngLatBounds } from 'mapbox-gl';
import * as MapActions from './map.actions';
import { MapService } from '../services/map.service';
import { DataService } from 'src/app/services/data.service';

@Injectable()
export class MapEffects {
	fetchDataEffect$ = createEffect(() =>
		this.actions$.pipe(
			ofType(MapActions.fetchData),
			switchMap(() => this.dataService.listItems),
			map((listItems) => {
				const initialBounds: LngLatBounds = new LngLatBounds();
				const bounds = listItems.records.reduce((bounds, listItem) => {
					const coords = this.mapService.getGeocodeCoords(
						listItem.geocode
					);
					bounds.extend(coords);
					return bounds;
				}, initialBounds);

				return { listItems: listItems.records, bounds: bounds };
			}),
			map((data) => MapActions.loadData(data))
		)
	);

	clickedMarkerEffect$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(MapActions.markerClicked),
				tap((coordinates) => {
					this.mapService.flyTo(coordinates, 18);
				})
			),
		{ dispatch: false }
	);

	constructor(
		private actions$: Actions,
		private dataService: DataService,
		private mapService: MapService
	) {}
}

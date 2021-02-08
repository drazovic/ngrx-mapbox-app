import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { concatMap, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';

import { LngLatBounds } from 'mapbox-gl';
import * as MapActions from './map.actions';
import * as MapSelectors from './map.selectors';
import { MapService } from '../services/map.service';
import { DataService } from 'src/app/services/data.service';
import * as fromApp from '../../../store/app.reducer';

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
		private mapService: MapService,
		private store: Store<fromApp.AppState>
	) {}
}

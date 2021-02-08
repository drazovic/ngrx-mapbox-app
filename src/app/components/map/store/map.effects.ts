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
				const initialMarkers: LngLat[] = [];
				const markers = listItems.records.reduce(
					(markers, listItem) => {
						markers.push(
							new LngLat(
								Number(listItem.geocode.Longitude),
								Number(listItem.geocode.Latitude)
							)
						);
						return markers;
					},
					initialMarkers
				);
				const initialBounds: LngLatBounds = new LngLatBounds();
				const bounds = markers.reduce((bounds, marker) => {
					bounds.extend(marker);
					return bounds;
				}, initialBounds);
				console.log(bounds);

				return { markers: markers, bounds: bounds };
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

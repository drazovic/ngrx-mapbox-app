import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { debounceTime, map, switchMap, tap } from 'rxjs/operators';

import { LngLat } from 'mapbox-gl';
import { ListItems } from 'src/app/models/list-items';
import * as MapActions from './map.actions';
import { MapService } from '../services/map.service';

@Injectable()
export class MapEffects {
	fetchDataEffect$ = createEffect(() =>
		this.actions$.pipe(
			ofType(MapActions.fetchData),
			switchMap(() => {
				return this.http.get<ListItems>(
					`https://app.smartapartmentdata.com/List/json/listItems.aspx?listID=5638557&token=A0E2523B25B805CBB6F8EC9D98AF56457EE7A255&receipt=undefined`
				);
			}),
			map((listItems) => {
				const initialMarkersArray: LngLat[] = [];
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
					initialMarkersArray
				);
				return markers;
			}),
			map((markers) => MapActions.setMarkers({ markers: markers }))
		)
	);

	// TODO just load data once not on every map udpate / move
	triggerfetchDataEffect$ = createEffect(() =>
		this.actions$.pipe(
			ofType(MapActions.updateMap),
			debounceTime(200),
			map(() => MapActions.fetchData())
		)
	);

	clickedMarkerEffect$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(MapActions.markerClicked),
				tap((coordinates) => {
					console.log(coordinates);

					this.mapService.flyTo(coordinates, 18);
				})
			),
		{ dispatch: false }
	);

	constructor(
		private actions$: Actions,
		private http: HttpClient,
		private mapService: MapService
	) {}
}

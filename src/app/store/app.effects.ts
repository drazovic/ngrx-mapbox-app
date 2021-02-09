import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';

import { LngLatBounds } from 'mapbox-gl';
import * as AppActions from './app.actions';
import { DataService } from 'src/app/services/data.service';
import { Marker } from '../models/Marker';

@Injectable()
export class AppEffects {
	fetchListItemsEffect$ = createEffect(() =>
		this.actions$.pipe(
			ofType(AppActions.fetchListItems),
			switchMap(() => this.dataService.listItems),
			map((listItems) => {
				const initialBounds: LngLatBounds = new LngLatBounds();
				const bounds = listItems.records.reduce((bounds, listItem) => {
					const coords = Marker.getGeocodeCoords(listItem.geocode);
					bounds.extend(coords);
					return bounds;
				}, initialBounds);

				const markers = listItems.records.reduce(
					(markers, listItem) => {
						const marker = new Marker(listItem);
						markers.push(marker);
						return markers;
					},
					[]
				);

				return {
					listItems: listItems,
					bounds: bounds,
					markers: markers,
				};
			}),
			map(({ listItems, bounds, markers }) =>
				AppActions.setListItems({ listItems, bounds, markers })
			)
		)
	);

	fetchPropertyItemEffect$ = createEffect(() =>
		this.actions$.pipe(
			ofType(AppActions.fetchPropertyItem),
			switchMap(({ propertyID }) =>
				this.dataService.getPropertyItem(propertyID)
			),
			map((propertyItem) => {
				const marker = new Marker(propertyItem);
				return { propertyItem: propertyItem, markers: [marker] };
			}),
			map(({ propertyItem, markers }) =>
				AppActions.setPropertyItem({ propertyItem, markers })
			)
		)
	);

	constructor(private actions$: Actions, private dataService: DataService) {}
}

import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

import { LngLatBounds } from 'mapbox-gl';

import * as AppActions from './app.actions';
import { DataService } from '../services/data.service';
import { Marker } from '../models/Marker.model';

@Injectable()
export class AppEffects {
	fetchListItemsEffect$ = createEffect(() =>
		this.actions$.pipe(
			ofType(AppActions.AppActionTypes.FetchListItems),
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
			map(
				({ listItems, bounds, markers }) =>
					new AppActions.SetListItems({ listItems, bounds, markers })
			),
			catchError((errorResponse: HttpErrorResponse) =>
				of(new AppActions.FetchListItemsFail(errorResponse.message))
			)
		)
	);

	fetchPropertyItemEffect$ = createEffect(() =>
		this.actions$.pipe(
			ofType(AppActions.AppActionTypes.FetchPropertyItem),
			switchMap(({ propertyID }) =>
				this.dataService.getPropertyItem(propertyID)
			),
			map((propertyItem) => {
				const marker = new Marker(propertyItem);
				return { propertyItem: propertyItem, markers: [marker] };
			}),
			map(
				({ propertyItem, markers }) =>
					new AppActions.SetPropertyItem({ propertyItem, markers })
			),
			catchError((errorResponse: HttpErrorResponse) =>
				of(new AppActions.FetchPropertyItemFail(errorResponse.message))
			)
		)
	);

	constructor(private actions$: Actions, private dataService: DataService) {}
}

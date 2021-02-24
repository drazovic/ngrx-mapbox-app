import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

import { LngLatBounds } from 'mapbox-gl';

import * as AppActions from './app.actions';
import { DataService } from '../services/data.service';
import { GeoJSONFeature } from '../models/GeoJSONFeature.model';

@Injectable()
export class AppEffects {
	fetchListItemsEffect$ = createEffect(() =>
		this.actions$.pipe(
			ofType(AppActions.AppActionTypes.FetchListItems),
			switchMap(() => this.dataService.listItems),
			map((listItems) => {
				const initialBounds: LngLatBounds = new LngLatBounds();
				const bounds = listItems.records.reduce((bounds, listItem) => {
					const coords = GeoJSONFeature.convertGeocodeToLngLat(
						listItem.geocode
					);
					bounds.extend(coords);
					return bounds;
				}, initialBounds);

				const features = listItems.records.map<any>((item) => {
					return new GeoJSONFeature(item);
				});

				return {
					listItems: listItems,
					bounds: bounds,
					features: features,
				};
			}),
			map(
				({ listItems, bounds, features }) =>
					new AppActions.SetListItems({ listItems, bounds, features })
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
				const feature = new GeoJSONFeature(propertyItem);
				return { propertyItem: propertyItem, features: [feature] };
			}),
			map(
				({ propertyItem, features }) =>
					new AppActions.SetPropertyItem({ propertyItem, features })
			),
			catchError((errorResponse: HttpErrorResponse) =>
				of(new AppActions.FetchPropertyItemFail(errorResponse.message))
			)
		)
	);

	constructor(private actions$: Actions, private dataService: DataService) {}
}

import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';

import * as AppActions from './app.actions';
import { DataService } from '../services/data.service';
import { GeoJSONFeature } from '../models/GeoJSONFeature.model';

@Injectable()
export class AppEffects {
	fetchListItemsEffect$ = createEffect(() =>
		this.actions$.pipe(
			ofType(AppActions.AppActionTypes.FetchListItems),
			switchMap(() => this.dataService.getListItems()),
			map((listItems) => {
				const features = listItems.records.map<any>((item) => {
					return new GeoJSONFeature(item);
				});

				return {
					listItems: listItems,
					features: features,
				};
			}),
			map(({ listItems, features }) => {
				return new AppActions.SetListItems({ listItems, features });
			}),
			catchError((errorResponse: HttpErrorResponse) =>
				of(new AppActions.FetchListItemsFail(errorResponse.message))
			)
		)
	);

	fetchPropertyItemEffect$ = createEffect(() =>
		this.actions$.pipe(
			ofType(AppActions.AppActionTypes.FetchPropertyItem),
			switchMap(({ payload }) => {
				return this.dataService.getPropertyItem(payload['propertyID']);
			}),
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

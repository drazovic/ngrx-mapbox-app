import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';

import * as ListActions from '../../list/store/list.actions';
import { DataService } from 'src/app/services/data.service';

@Injectable()
export class ListEffects {
	fetchListItemsEffect$ = createEffect(() =>
		this.actions$.pipe(
			ofType(ListActions.fetchListItems),
			switchMap(() => this.dataService.listItems),
			map((listItems) => ListActions.setListItems(listItems))
		)
	);

	fetchPropertyItemEffect$ = createEffect(() =>
		this.actions$.pipe(
			ofType(ListActions.fetchPropertyItem),
			switchMap(({ propertyID }) =>
				this.dataService.getPropertyItem(propertyID)
			),
			map((propertyItem) => ListActions.setPropertyItem(propertyItem))
		)
	);

	constructor(private actions$: Actions, private dataService: DataService) {}
}

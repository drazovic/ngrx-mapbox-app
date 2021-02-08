import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { map, switchMap, tap } from 'rxjs/operators';

import * as ListActions from '../../list/store/list.actions';
import * as MapActions from '../../map/store/map.actions';
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
			switchMap(() => this.dataService.propertyItem),
			map((propertyItem) => ListActions.setPropertyItem(propertyItem))
		)
	);

	constructor(private actions$: Actions, private dataService: DataService) {}
}

import { Injectable } from '@angular/core';
import {
	ActivatedRouteSnapshot,
	Resolve,
	RouterStateSnapshot,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { take } from 'rxjs/operators';

import { LngLatBoundsLike } from 'mapbox-gl';

import * as fromApp from '../store/app.reducer';
import * as AppActions from '../store/app.actions';
import { ListItems } from '../models/ListItems.model';

@Injectable({
	providedIn: 'root',
})
export class ListItemsResolverService
	implements Resolve<{ listItems: ListItems; bounds: LngLatBoundsLike }> {
	constructor(
		private store: Store<fromApp.AppState>,
		private actions$: Actions
	) {}

	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		this.store.dispatch(AppActions.fetchListItems());
		return this.actions$.pipe(ofType(AppActions.setListItems), take(1));
	}
}

import { Injectable } from '@angular/core';
import {
	ActivatedRouteSnapshot,
	Resolve,
	RouterStateSnapshot,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { take } from 'rxjs/operators';

import * as fromApp from '../../../store/app.reducer';
import * as ListActions from '../store/list.actions';
import { PropertyItem } from '../models/list-items';

@Injectable({
	providedIn: 'root',
})
export class ListResolverService implements Resolve<PropertyItem> {
	constructor(
		private store: Store<fromApp.AppState>,
		private actions$: Actions
	) {}

	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		this.store.dispatch(ListActions.fetchPropertyItem());
		return this.actions$.pipe(ofType(ListActions.setPropertyItem), take(1));
	}
}

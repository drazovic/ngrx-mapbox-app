import { Injectable } from '@angular/core';
import {
	ActivatedRouteSnapshot,
	Resolve,
	RouterStateSnapshot,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { take } from 'rxjs/operators';

import * as fromApp from '../store/app.reducer';
import * as AppActions from '../store/app.actions';
import { PropertyItem } from '../models/PropertyItem.model';
import { Marker } from '../models/Marker.model';

@Injectable({
	providedIn: 'root',
})
export class PropertyResolverService
	implements Resolve<{ propertyItem: PropertyItem; markers: Marker[] }> {
	constructor(
		private store: Store<fromApp.AppState>,
		private actions$: Actions
	) {}

	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		this.store.dispatch(
			new AppActions.FetchPropertyItem({
				propertyID: +route.params['id'],
			})
		);
		return this.actions$.pipe(
			ofType(AppActions.AppActionTypes.SetPropertyItem),
			take(1)
		);
	}
}

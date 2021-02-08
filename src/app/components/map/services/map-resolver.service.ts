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
import * as MapActions from '../store/map.actions';
import { LngLatBoundsLike } from 'mapbox-gl';
import { ListItem } from '../../list/models/list-items';

@Injectable({
	providedIn: 'root',
})
export class MapResolverService
	implements Resolve<{ listItems: ListItem[]; bounds: LngLatBoundsLike }> {
	constructor(
		private store: Store<fromApp.AppState>,
		private actions$: Actions
	) {}

	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		this.store.dispatch(MapActions.fetchData());
		return this.actions$.pipe(ofType(MapActions.loadData), take(1));
	}
}

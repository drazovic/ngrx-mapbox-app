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
import { LngLatBoundsLike, LngLatLike } from 'mapbox-gl';

@Injectable({
	providedIn: 'root',
})
export class MapResolverService
	implements Resolve<{ markers: LngLatLike[]; bounds: LngLatBoundsLike }> {
	constructor(
		private store: Store<fromApp.AppState>,
		private actions$: Actions
	) {}

	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		this.store.dispatch(MapActions.fetchData());
		return this.actions$.pipe(ofType(MapActions.loadData), take(1));
	}
}

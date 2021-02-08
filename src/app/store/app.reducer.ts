import { ActionReducerMap } from '@ngrx/store';

import * as fromMap from '../components/map/store/map.reducer';

export interface AppState {
	map: fromMap.State;
}

export const appReducer: ActionReducerMap<AppState> = {
	map: fromMap.reducer,
};

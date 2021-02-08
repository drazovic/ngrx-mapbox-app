import { ActionReducerMap } from '@ngrx/store';

import * as fromMap from '../components/map/store/map.reducer';
import * as fromList from '../components/list/store/list.reducer';

export interface AppState {
	map: fromMap.State;
	list: fromList.State;
}

export const appReducer: ActionReducerMap<AppState> = {
	map: fromMap.reducer,
	list: fromList.reducer,
};

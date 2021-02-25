import { createFeatureSelector, createSelector } from '@ngrx/store';

import { AppState } from './app.reducer';
import * as fromApp from '../store/app.reducer';

export const getAppState = createFeatureSelector<AppState>('app');

export class ListItemsSelector {
	static get = createSelector(
		getAppState,
		(state: AppState) => state.listItems
	);
}

export class FeaturesSelector {
	static getAll = createSelector(getAppState, fromApp.selectAllFeatures);
}

export class PropertyItemSelector {
	static get = createSelector(
		getAppState,
		(state: AppState) => state.propertyItem
	);
}

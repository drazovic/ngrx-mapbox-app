import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './map.reducer';

export const getMapState = createFeatureSelector<State>('map');

export const getListItems = createSelector(
	getMapState,
	(state: State) => state.listItems
);

export const getBounds = createSelector(
	getMapState,
	(state: State) => state.bounds
);

export const getCenter = createSelector(
	getMapState,
	(state: State) => state.center
);

export const getZoom = createSelector(
	getMapState,
	(state: State) => state.zoom
);

export const getIsMapLoaded = createSelector(
	getMapState,
	(state: State) => state.isMapLoaded
);

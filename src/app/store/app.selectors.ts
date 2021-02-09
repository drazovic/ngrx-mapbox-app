import { createFeatureSelector, createSelector } from '@ngrx/store';

import { AppState } from './app.reducer';

export const getAppState = createFeatureSelector<AppState>('app');

export const getListItems = createSelector(
	getAppState,
	(state: AppState) => state.listItems
);

export const getBounds = createSelector(
	getAppState,
	(state: AppState) => state.bounds
);

export const getCenter = createSelector(
	getAppState,
	(state: AppState) => state.center
);

export const getZoom = createSelector(
	getAppState,
	(state: AppState) => state.zoom
);

export const getIsMapLoaded = createSelector(
	getAppState,
	(state: AppState) => state.isMapLoaded
);

export const getMarkers = createSelector(
	getAppState,
	(state: AppState) => state.markers
);

export const getMarkerType = createSelector(
	getAppState,
	(state: AppState) => state.markerType
);

export const getPropertyItem = createSelector(
	getAppState,
	(state: AppState) => state.propertyItem
);
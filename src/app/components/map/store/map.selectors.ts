import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './map.reducer';

export const getMapState = createFeatureSelector<State>('map');

export const getMarkers = createSelector(
	getMapState,
	(state: State) => state.markers
);

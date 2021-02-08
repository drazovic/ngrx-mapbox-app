import { Action, createReducer, on } from '@ngrx/store';

import * as MapActions from './map.actions';
import { LngLatLike, LngLatBoundsLike } from 'mapbox-gl';

export interface State {
	center: LngLatLike;
	zoom: number;
	bounds: LngLatBoundsLike;
	markers: LngLatLike[];
}

export const initialState: State = {
	center: {
		lat: 45.464211,
		lng: 9.191383,
	},
	zoom: 13,
	bounds: undefined,
	markers: [],
};

const mapReducer = createReducer(
	initialState,
	on(MapActions.updateMap, (state, { center, zoom, bounds }) => ({
		...state,
		center,
		zoom,
		bounds,
	})),
	on(MapActions.loadData, (state, { markers, bounds }) => ({
		...state,
		markers: [...markers],
		bounds: bounds,
	}))
);

export function reducer(state: State | undefined, action: Action) {
	return mapReducer(state, action);
}

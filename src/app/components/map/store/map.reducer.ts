import { createReducer, on } from '@ngrx/store';

import * as MapActions from './map.actions';
import { LngLatLike, LngLatBounds } from 'mapbox-gl';

export interface State {
	center: LngLatLike;
	zoom: number;
	bounds: LngLatBounds;
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
	on(MapActions.updateMap, (state, { center, zoom, bounds }) => {
		console.log(zoom);

		return {
			...state,
			center,
			zoom,
			bounds,
		};
	}),
	on(MapActions.setMarkers, (state, { markers }) => {
		console.log(markers);

		return {
			...state,
			markers: [...markers],
		};
	})
);

export function reducer(state, action) {
	return mapReducer(state, action);
}

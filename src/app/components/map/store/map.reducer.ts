import { Action, createReducer, on } from '@ngrx/store';

import * as MapActions from './map.actions';
import { LngLatLike, LngLatBoundsLike } from 'mapbox-gl';
import { ListItem } from '../../list/models/list-items';

export interface State {
	center: LngLatLike;
	zoom: number;
	bounds: LngLatBoundsLike;
	listItems: ListItem[];
	isMapLoaded: boolean;
}

export const initialState: State = {
	center: {
		lat: 45.464211,
		lng: 9.191383,
	},
	zoom: 13,
	bounds: undefined,
	listItems: [],
	isMapLoaded: false,
};

const mapReducer = createReducer(
	initialState,
	on(MapActions.updateMap, (state, { center, zoom }) => ({
		...state,
		center,
		zoom,
		isMapLoaded: true,
	})),
	on(MapActions.loadData, (state, { listItems, bounds }) => ({
		...state,
		listItems: [...listItems],
		bounds: bounds,
	}))
);

export function reducer(state: State | undefined, action: Action) {
	return mapReducer(state, action);
}

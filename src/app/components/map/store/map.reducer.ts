import { Action, createReducer, on } from '@ngrx/store';

import * as MapActions from './map.actions';
import { LngLatLike, LngLatBoundsLike } from 'mapbox-gl';
import { ListItem } from '../../list/models/list-items';
import { MarkerTypes } from '../models';

export interface State {
	center: LngLatLike;
	zoom: number;
	bounds: LngLatBoundsLike;
	listItems: ListItem[];
	isMapLoaded: boolean;
	markerType: string;
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
	markerType: MarkerTypes.RED,
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
		markerType: MarkerTypes.RED,
	})),
	on(MapActions.markerClicked, (state, coords) => ({
		...state,
		markerType: MarkerTypes.BLUE,
	}))
);

export function reducer(state: State | undefined, action: Action) {
	return mapReducer(state, action);
}

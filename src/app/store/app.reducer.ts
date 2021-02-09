import { Action, createReducer, on } from '@ngrx/store';

import * as AppActions from './app.actions';
import { LngLatLike, LngLatBoundsLike, LngLatBounds } from 'mapbox-gl';
import { ListItems, PropertyItem } from '../models';
import { Marker, MarkerTypes } from '../models/Marker';

export interface AppState {
	center: LngLatLike;
	zoom: number;
	bounds: LngLatBoundsLike;
	listItems: ListItems;
	propertyItem: PropertyItem;
	isMapLoaded: boolean;
	markers: Marker[];
	markerType: string;
}

export const initialState: AppState = {
	center: {
		lat: 45.464211,
		lng: 9.191383,
	},
	zoom: 13,
	bounds: undefined,
	listItems: null,
	propertyItem: null,
	isMapLoaded: false,
	markers: [],
	markerType: MarkerTypes.RED,
};

const mapReducer = createReducer(
	initialState,
	on(AppActions.updateMap, (state, { center, zoom }) => ({
		...state,
		center,
		zoom,
		isMapLoaded: true,
	})),
	on(AppActions.setListItems, (state, { listItems, bounds, markers }) => ({
		...state,
		listItems: { ...listItems },
		bounds: bounds,
		markerType: MarkerTypes.RED,
		markers: [...markers],
		propertyItem: null,
	})),
	on(AppActions.markerClicked, (state, marker) => ({
		...state,
		markerType: MarkerTypes.BLUE,
		markers: [...[marker]],
		bounds: new LngLatBounds(marker.coords, marker.coords),
	})),
	on(AppActions.setPropertyItem, (state, { propertyItem, markers }) => ({
		...state,
		markerType: MarkerTypes.BLUE,
		propertyItem: { ...propertyItem },
		markers: [...markers],
		listItems: null,
	}))
);

export function reducer(state: AppState | undefined, action: Action) {
	return mapReducer(state, action);
}

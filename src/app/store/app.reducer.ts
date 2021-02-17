import { LngLatLike, LngLatBoundsLike, LngLatBounds } from 'mapbox-gl';

import { AppActions, AppActionTypes } from './app.actions';
import { ListItems } from '../models/ListItems.model';
import { MarkerTypes, Marker } from '../models/Marker.model';
import { PropertyItem } from '../models/PropertyItem.model';

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
	listItems: undefined,
	propertyItem: null,
	isMapLoaded: false,
	markers: [],
	markerType: MarkerTypes.RED,
};

export function reducer(state = initialState, action: AppActions): AppState {
	switch (action.type) {
		case AppActionTypes.UpdateMap: {
			return {
				...state,
				center: action.payload.center,
				zoom: action.payload.zoom,
				isMapLoaded: true,
			};
		}

		case AppActionTypes.SetListItems: {
			return {
				...state,
				listItems: { ...action.payload.listItems },
				bounds: action.payload.bounds,
				markerType: MarkerTypes.RED,
				markers: [...action.payload.markers],
				propertyItem: null,
			};
		}

		case AppActionTypes.MarkerClicked: {
			return {
				...state,
				markerType: MarkerTypes.BLUE,
				markers: [...[action.payload]],
				bounds: new LngLatBounds(
					action.payload.coords,
					action.payload.coords
				),
			};
		}

		case AppActionTypes.SetPropertyItem: {
			return {
				...state,
				markerType: MarkerTypes.BLUE,
				propertyItem: { ...action.payload.propertyItem },
				markers: [...action.payload.markers],
				listItems: null,
			};
		}

		default: {
			return state;
		}
	}
}

import { LngLatLike, LngLatBoundsLike, LngLatBounds } from 'mapbox-gl';

import { AppActions, AppActionTypes } from './app.actions';
import { ListItems } from '../models/ListItems.model';
import { PropertyItem } from '../models/PropertyItem.model';
import { GeoJSONFeature, MarkerTypes } from '../models/GeoJSONFeature.model';

export interface AppState {
	center: LngLatLike;
	zoom: number;
	bounds: LngLatBoundsLike;
	listItems: ListItems;
	propertyItem: PropertyItem;
	isMapLoaded: boolean;
	features: GeoJSONFeature[];
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
	features: [],
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
				features: [...action.payload.features],
				propertyItem: null,
			};
		}

		case AppActionTypes.MarkerClicked: {
			const lngLat = GeoJSONFeature.convertCoordsToLngLat(
				action.payload.geometry.coordinates
			);

			return {
				...state,
				markerType: MarkerTypes.BLUE,
				features: [...[action.payload]],
				bounds: new LngLatBounds(lngLat, lngLat),
			};
		}

		case AppActionTypes.SetPropertyItem: {
			return {
				...state,
				markerType: MarkerTypes.BLUE,
				propertyItem: { ...action.payload.propertyItem },
				features: [...action.payload.features],
				listItems: null,
			};
		}

		default: {
			return state;
		}
	}
}

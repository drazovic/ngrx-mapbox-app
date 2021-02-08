import { createAction, props } from '@ngrx/store';

import { LngLatLike, LngLatBounds } from 'mapbox-gl';

export const updateMap = createAction(
	'[Map] Map updated',
	props<{ center: LngLatLike; bounds: LngLatBounds; zoom: number }>()
);

export const fetchData = createAction('[Map] Map data fetched');

export const setMarkers = createAction(
	'[Map] Markers stored',
	props<{ markers: LngLatLike[] }>()
);

export const markerClicked = createAction(
	'[Map] Marker clicked',
	props<LngLatLike>()
);

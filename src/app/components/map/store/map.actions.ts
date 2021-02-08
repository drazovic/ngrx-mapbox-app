import { createAction, props } from '@ngrx/store';

import { LngLatLike, LngLatBoundsLike } from 'mapbox-gl';
import { ListItem } from '../../list/models/list-items';

export const updateMap = createAction(
	'[Map] Map updated',
	props<{ center: LngLatLike; zoom: number }>()
);

export const fetchData = createAction('[Map] Map data fetched');

export const loadData = createAction(
	'[Map] Markers stored',
	props<{ listItems: ListItem[]; bounds: LngLatBoundsLike }>()
);

export const markerClicked = createAction(
	'[Map] Marker clicked',
	props<LngLatLike>()
);

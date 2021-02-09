import { createAction, props } from '@ngrx/store';

import { LngLatLike, LngLatBoundsLike } from 'mapbox-gl';
import { ListItems, PropertyItem } from '../models';
import { Marker } from '../models/Marker';

export const updateMap = createAction(
	'[Map] Map updated',
	props<{ center: LngLatLike; zoom: number }>()
);

export const fetchListItems = createAction('[ListItems] Fetch list items');

export const setListItems = createAction(
	'[ListItems] Set list items',
	props<{
		listItems: ListItems;
		bounds: LngLatBoundsLike;
		markers: Marker[];
	}>()
);

export const fetchPropertyItem = createAction(
	'[List] Fetch property item',
	props<{ propertyID: number }>()
);

export const setPropertyItem = createAction(
	'[List] Set property item',
	props<{ propertyItem: PropertyItem; markers: Marker[] }>()
);

export const markerClicked = createAction(
	'[Map] Marker clicked',
	props<Marker>()
);

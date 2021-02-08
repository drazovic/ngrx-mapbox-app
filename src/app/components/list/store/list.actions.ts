import { createAction, props } from '@ngrx/store';

import { ListItems, PropertyItem } from '../models/list-items';

export const fetchListItems = createAction('[List] Fetch list items');

export const setListItems = createAction(
	'[List] Set list items',
	props<ListItems>()
);

export const fetchPropertyItem = createAction(
	'[List] Fetch property item',
	props<{ propertyID: number }>()
);

export const setPropertyItem = createAction(
	'[List] Set property item',
	props<PropertyItem>()
);

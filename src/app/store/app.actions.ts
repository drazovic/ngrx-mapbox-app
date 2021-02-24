import { Action } from '@ngrx/store';

import { LngLatLike, LngLatBoundsLike } from 'mapbox-gl';
import { GeoJSONFeature } from '../models/GeoJSONFeature.model';

import { ListItems } from '../models/ListItems.model';
import { PropertyItem } from '../models/PropertyItem.model';

export enum AppActionTypes {
	UpdateMap = '[Map] Map updated',
	FetchListItems = '[ListItems] Fetch list items',
	FetchListItemsFail = '[ListItems] Fetch list items fail',
	SetListItems = '[ListItems] Set list items',
	FetchPropertyItem = '[Property] Fetch property item',
	FetchPropertyItemFail = '[Property] Fetch property item fail',
	SetPropertyItem = '[Property] Set property item',
	MarkerClicked = '[Map] Marker clicked',
}

export class UpdateMap implements Action {
	readonly type = AppActionTypes.UpdateMap;

	constructor(public payload: { center: LngLatLike; zoom: number }) {}
}

export class FetchListItems implements Action {
	readonly type = AppActionTypes.FetchListItems;

	constructor() {}
}

export class FetchListItemsFail implements Action {
	readonly type = AppActionTypes.FetchListItemsFail;

	constructor(public payload: string) {
		console.log(payload);
	}
}

export class SetListItems implements Action {
	readonly type = AppActionTypes.SetListItems;

	constructor(
		public payload: {
			listItems: ListItems;
			bounds: LngLatBoundsLike;
			features: GeoJSONFeature[];
		}
	) {}
}

export class FetchPropertyItem implements Action {
	readonly type = AppActionTypes.FetchPropertyItem;

	constructor(public payload: { propertyID: number }) {}
}

export class FetchPropertyItemFail implements Action {
	readonly type = AppActionTypes.FetchPropertyItemFail;

	constructor(public payload: string) {
		console.log(payload);
	}
}

export class SetPropertyItem implements Action {
	readonly type = AppActionTypes.SetPropertyItem;

	constructor(
		public payload: {
			propertyItem: PropertyItem;
			features: GeoJSONFeature[];
		}
	) {}
}

export class MarkerClicked implements Action {
	readonly type = AppActionTypes.MarkerClicked;

	constructor(public payload: GeoJSONFeature) {}
}

export type AppActions =
	| UpdateMap
	| FetchListItems
	| SetListItems
	| FetchPropertyItem
	| SetPropertyItem
	| MarkerClicked
	| FetchListItemsFail
	| FetchPropertyItemFail;

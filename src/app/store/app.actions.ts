import { Action } from '@ngrx/store';

import { GeoJSONFeature } from '../models/GeoJSONFeature.model';
import { ListItems } from '../models/ListItems.model';
import { PropertyItem } from '../models/PropertyItem.model';

export enum AppActionTypes {
	FetchListItems = '[ListItems] Fetch list items',
	FetchListItemsFail = '[ListItems] Fetch list items fail',
	SetListItems = '[ListItems] Set list items',
	FetchPropertyItem = '[Property] Fetch property item',
	FetchPropertyItemFail = '[Property] Fetch property item fail',
	SetPropertyItem = '[Property] Set property item',
}

export class FetchListItems implements Action {
	readonly type = AppActionTypes.FetchListItems;

	constructor() {}
}

export class FetchListItemsFail implements Action {
	readonly type = AppActionTypes.FetchListItemsFail;

	constructor(public payload: string) {}
}

export class SetListItems implements Action {
	readonly type = AppActionTypes.SetListItems;

	constructor(
		public payload: {
			listItems: ListItems;
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

	constructor(public payload: string) {}
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

export type AppActions =
	| FetchListItems
	| SetListItems
	| FetchPropertyItem
	| SetPropertyItem
	| FetchListItemsFail
	| FetchPropertyItemFail;

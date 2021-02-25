import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { AppActions, AppActionTypes } from './app.actions';
import { ListItems } from '../models/ListItems.model';
import { PropertyItem } from '../models/PropertyItem.model';
import { GeoJSONFeature, MarkerTypes } from '../models/GeoJSONFeature.model';

export interface AppState extends EntityState<GeoJSONFeature> {
	selectedFeatureId: number | null;
	listItems: ListItems;
	propertyItem: PropertyItem;
}

export const adapter: EntityAdapter<GeoJSONFeature> = createEntityAdapter<GeoJSONFeature>(
	{
		selectId: (feature: GeoJSONFeature) => feature.properties['propertyID'],
	}
);

export const initialState: AppState = adapter.getInitialState({
	selectedFeatureId: null,
	listItems: undefined,
	propertyItem: undefined,
});

export function reducer(state = initialState, action: AppActions): AppState {
	switch (action.type) {
		case AppActionTypes.SetListItems: {
			const partialState = {
				...state,
				listItems: { ...action.payload.listItems },
				propertyItem: null,
			};

			return adapter.setAll(action.payload.features, partialState);
		}

		case AppActionTypes.SetPropertyItem: {
			const partialState = {
				...state,
				propertyItem: action.payload.propertyItem,
				listItems: null,
			};

			return adapter.setAll(action.payload.features, partialState);
		}

		default: {
			return state;
		}
	}
}

const { selectAll } = adapter.getSelectors();

export const selectAllFeatures = selectAll;

import { Action, createReducer, on } from '@ngrx/store';

import {
	AgentInfo,
	ListItem,
	PropertyItem,
} from '../../../components/list/models/list-items';
import * as ListActions from './list.actions';

export interface State {
	agentInfo: AgentInfo;
	records: ListItem[];
	showContactInfo: boolean;
	role: string;
	propertyItem: PropertyItem;
}

export const initialState: State = {
	agentInfo: null,
	records: [],
	showContactInfo: null,
	role: null,
	propertyItem: null,
};

const mapReducer = createReducer(
	initialState,
	on(ListActions.setListItems, (state, listItems) => ({
		...state,
		agentInfo: { ...listItems.agentInfo },
		records: [...listItems.records],
		showContactInfo: listItems.showContactInfo,
		role: listItems.role,
	})),
	on(ListActions.setPropertyItem, (state, propertyItem) => ({
		...state,
		propertyItem: propertyItem,
	}))
);

export function reducer(state: State | undefined, action: Action) {
	return mapReducer(state, action);
}

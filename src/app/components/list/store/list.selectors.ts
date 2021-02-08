import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './list.reducer';

export const getListState = createFeatureSelector<State>('list');

export const getAgentInfo = createSelector(
	getListState,
	(state: State) => state.agentInfo
);

export const getRecords = createSelector(
	getListState,
	(state: State) => state.records
);

export const getPropertyItem = createSelector(
	getListState,
	(state: State) => state.propertyItem
);

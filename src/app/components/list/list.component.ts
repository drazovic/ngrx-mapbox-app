import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as ListActions from './store/list.actions';
import * as fromApp from '../../store/app.reducer';

@Component({
	selector: 'app-list',
	templateUrl: './list.component.html',
	styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
	constructor(private store: Store<fromApp.AppState>) {}

	ngOnInit(): void {
		this.store.dispatch(ListActions.fetchListItems());
	}
}

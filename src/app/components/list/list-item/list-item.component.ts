import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as listSelectors from '../../list/store/list.selectors';
import * as fromApp from '../../../store/app.reducer';
import { PropertyItem } from '../models/list-items';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-list-item',
	templateUrl: './list-item.component.html',
	styleUrls: ['./list-item.component.css'],
})
export class ListItemComponent implements OnInit, OnDestroy {
	propertyItem: PropertyItem;
	subscription: Subscription;

	constructor(private store: Store<fromApp.AppState>) {}

	ngOnInit(): void {
		this.subscription = this.store
			.select(listSelectors.getPropertyItem)
			.subscribe((propertyItem) => (this.propertyItem = propertyItem));
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}
}

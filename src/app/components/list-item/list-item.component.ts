import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as AppSelectors from '../../store/app.selectors';
import * as fromApp from '../../store/app.reducer';
import { PropertyItem } from '../../models';
import { Subscription } from 'rxjs';
import * as MapActions from '../../store/app.actions';
import { Marker } from 'src/app/models/Marker';

@Component({
	selector: 'app-list-item',
	templateUrl: './list-item.component.html',
	styleUrls: ['./list-item.component.css'],
})
export class ListItemComponent implements OnInit, OnDestroy {
	propertyItem: PropertyItem;
	propertyItemSubscription: Subscription;
	isMapLoadedItemSubscription: Subscription;

	constructor(private store: Store<fromApp.AppState>) {}

	ngOnInit(): void {
		this.propertyItemSubscription = this.store
			.select(AppSelectors.getPropertyItem)
			.subscribe((propertyItem) => {
				this.propertyItem = propertyItem;
			});

		this.isMapLoadedItemSubscription = this.store
			.select(AppSelectors.getIsMapLoaded)
			.subscribe(() => {
				const marker = new Marker(this.propertyItem);
				this.store.dispatch(MapActions.markerClicked(marker));
			});
	}

	ngOnDestroy() {
		this.propertyItemSubscription.unsubscribe();
		this.isMapLoadedItemSubscription.unsubscribe();
	}
}

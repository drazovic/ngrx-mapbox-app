import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import * as AppSelectors from '../../store/app.selectors';
import * as fromApp from '../../store/app.reducer';
import * as MapActions from '../../store/app.actions';
import { PropertyItem } from 'src/app/models/PropertyItem.model';
import { Marker } from 'src/app/models/Marker.model';

@Component({
	selector: 'app-property-item',
	templateUrl: './property-item.component.html',
	styleUrls: ['./property-item.component.css'],
})
export class PropertyItemComponent implements OnInit, OnDestroy {
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

	getDirections(propertyItem: PropertyItem) {
		return `https://www.google.com/maps?daddr=${propertyItem.streetAddress},${propertyItem.city}`;
	}

	ngOnDestroy() {
		this.propertyItemSubscription.unsubscribe();
		this.isMapLoadedItemSubscription.unsubscribe();
	}
}

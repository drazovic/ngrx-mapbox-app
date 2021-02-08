import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as listSelectors from '../../list/store/list.selectors';
import * as fromApp from '../../../store/app.reducer';
import { PropertyItem } from '../models/list-items';
import { Subscription } from 'rxjs';
import { MapService } from '../../map/services/map.service';
import * as MapActions from '../../map/store/map.actions';
import * as MapSelectors from '../../map/store/map.selectors';

@Component({
	selector: 'app-list-item',
	templateUrl: './list-item.component.html',
	styleUrls: ['./list-item.component.css'],
})
export class ListItemComponent implements OnInit, OnDestroy {
	propertyItem: PropertyItem;
	propertyItemSubscription: Subscription;
	isMapLoadedItemSubscription: Subscription;

	constructor(
		private store: Store<fromApp.AppState>,
		private mapService: MapService
	) {}

	ngOnInit(): void {
		this.propertyItemSubscription = this.store
			.select(listSelectors.getPropertyItem)
			.subscribe((propertyItem) => {
				this.propertyItem = propertyItem;
			});

		this.isMapLoadedItemSubscription = this.store
			.select(MapSelectors.getIsMapLoaded)
			.subscribe(() => {
				if (this.mapService.map) {
					const coords = this.mapService.getGeocodeCoords(
						this.propertyItem.geocode
					);
					this.store.dispatch(MapActions.markerClicked(coords));
				}
			});
	}

	ngOnDestroy() {
		this.propertyItemSubscription.unsubscribe();
		this.isMapLoadedItemSubscription.unsubscribe();
	}
}

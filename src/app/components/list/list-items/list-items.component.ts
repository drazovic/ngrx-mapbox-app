import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { LngLat } from 'mapbox-gl';

import { ListItem } from '../models/list-items';
import * as fromApp from '../../../store/app.reducer';
import * as listSelectors from '../../list/store/list.selectors';
import * as mapActions from '../../map/store/map.actions';

@Component({
	selector: 'app-list-items',
	templateUrl: './list-items.component.html',
	styleUrls: ['./list-items.component.css'],
})
export class ListItemsComponent implements OnInit {
	listItems$: Observable<ListItem[]>;

	constructor(
		private store: Store<fromApp.AppState>,
		private router: Router
	) {}

	ngOnInit(): void {
		this.listItems$ = this.store.select(listSelectors.getRecords);
	}

	onListItemSelected(listItem: ListItem) {
		const coordinates = new LngLat(
			Number(listItem.geocode.Longitude),
			Number(listItem.geocode.Latitude)
		);
		this.store.dispatch(mapActions.markerClicked(coordinates));

		this.router.navigate(['/', listItem.propertyID]);
	}
}

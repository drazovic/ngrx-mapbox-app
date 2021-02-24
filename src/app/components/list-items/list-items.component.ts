import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

import * as fromApp from '../../store/app.reducer';
import * as AppSelectors from '../../store/app.selectors';
import * as AppActions from '../../store/app.actions';
import { ListItems, ListItem } from 'src/app/models/ListItems.model';
import { GeoJSONFeature } from 'src/app/models/GeoJSONFeature.model';

@Component({
	selector: 'app-list-items',
	templateUrl: './list-items.component.html',
	styleUrls: ['./list-items.component.css'],
})
export class ListItemsComponent implements OnInit {
	listItems$: Observable<ListItems>;

	constructor(
		private store: Store<fromApp.AppState>,
		private router: Router,
		private route: ActivatedRoute
	) {}

	ngOnInit(): void {
		this.listItems$ = this.store.select(AppSelectors.getListItems);
	}

	onListItemSelected(listItem: ListItem) {
		const marker = new GeoJSONFeature(listItem);
		this.store.dispatch(new AppActions.MarkerClicked(marker));

		this.router.navigate(['/', listItem.propertyID], {
			relativeTo: this.route,
		});
	}
}

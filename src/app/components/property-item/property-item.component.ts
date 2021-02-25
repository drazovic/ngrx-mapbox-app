import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as AppSelectors from '../../store/app.selectors';
import * as fromApp from '../../store/app.reducer';
import { PropertyItem } from '../../models/PropertyItem.model';

@Component({
	selector: 'app-property-item',
	templateUrl: './property-item.component.html',
	styleUrls: ['./property-item.component.css'],
})
export class PropertyItemComponent implements OnInit {
	propertyItem$: Observable<PropertyItem>;

	constructor(private store: Store<fromApp.AppState>) {}

	ngOnInit(): void {
		this.propertyItem$ = this.store.select(
			AppSelectors.PropertyItemSelector.get
		);
	}

	getDirections(propertyItem: PropertyItem) {
		return `https://www.google.com/maps?daddr=${propertyItem.streetAddress},${propertyItem.city}`;
	}
}

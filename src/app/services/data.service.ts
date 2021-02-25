import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { environment } from '../../environments/environment';

import { ListItems } from '../models/ListItems.model';
import { PropertyItem } from '../models/PropertyItem.model';

const CACHE_SIZE = 1;

@Injectable({
	providedIn: 'root',
})
export class DataService {
	private _listItemsCache$: Observable<ListItems>;
	baseUrl = environment.api.baseUrl;
	token = environment.api.token;

	constructor(private http: HttpClient) {}

	getListItems() {
		if (!this._listItemsCache$) {
			this._listItemsCache$ = this.fetchListItems().pipe(
				shareReplay(CACHE_SIZE)
			);
		}

		return this._listItemsCache$;
	}

	private fetchListItems() {
		return this.http.get<ListItems>(
			`${this.baseUrl}/List/json/listItems.aspx?listID=5638557&token=${this.token}&receipt=undefined`
		);
	}

	getPropertyItem(propertyID: number) {
		return this.http.get<PropertyItem>(
			`${this.baseUrl}/List/json/propertyItem.aspx?listID=5638557&token=${this.token}&propertyID=${propertyID}`
		);
	}
}

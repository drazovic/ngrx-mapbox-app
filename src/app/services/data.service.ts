import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

import { ListItems } from '../models/ListItems.model';
import { PropertyItem } from '../models/PropertyItem.model';

@Injectable({
	providedIn: 'root',
})
export class DataService {
	private _listItems$: Observable<ListItems>;
	baseUrl = environment.api.baseUrl;
	token = environment.api.token;

	constructor(private http: HttpClient) {}

	get listItems() {
		if (this._listItems$) {
			return this._listItems$;
		} else {
			return (this._listItems$ = this.http.get<ListItems>(
				`${this.baseUrl}/List/json/listItems.aspx?listID=5638557&token=${this.token}&receipt=undefined`
			));
		}
	}

	getPropertyItem(propertyID: number) {
		return this.http.get<PropertyItem>(
			`${this.baseUrl}/List/json/propertyItem.aspx?listID=5638557&token=${this.token}&propertyID=${propertyID}`
		);
	}
}

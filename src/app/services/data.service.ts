import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ListItems, PropertyItem } from '../models';

@Injectable({
	providedIn: 'root',
})
export class DataService {
	private _listItems$: Observable<ListItems>;

	constructor(private http: HttpClient) {}

	get listItems() {
		if (this._listItems$) {
			return this._listItems$;
		} else {
			return (this._listItems$ = this.http.get<ListItems>(
				`https://app.smartapartmentdata.com/List/json/listItems.aspx?listID=5638557&token=A0E2523B25B805CBB6F8EC9D98AF56457EE7A255&receipt=undefined`
			));
		}
	}

	getPropertyItem(propertyID: number) {
		return this.http.get<PropertyItem>(
			`https://app.smartapartmentdata.com/List/json/propertyItem.aspx?listID=5638557&token=A0E2523B25B805CBB6F8EC9D98AF56457EE7A255&propertyID=${propertyID}`
		);
	}
}

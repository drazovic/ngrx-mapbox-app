import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ListItems, PropertyItem } from '../components/list/models/list-items';

@Injectable({
	providedIn: 'root',
})
export class DataService {
	private _listItems$: Observable<ListItems>;
	private _propertyItem$: Observable<PropertyItem>;

	constructor(private http: HttpClient) {}

	get listItems() {
		if (this._listItems$) {
			return this._listItems$;
		}

		this._listItems$ = this.http.get<ListItems>(
			`https://app.smartapartmentdata.com/List/json/listItems.aspx?listID=5638557&token=A0E2523B25B805CBB6F8EC9D98AF56457EE7A255&receipt=undefined`
		);

		return this._listItems$;
	}

	get propertyItem() {
		if (this._propertyItem$) {
			return this._propertyItem$;
		}

		this._propertyItem$ = this.http.get<PropertyItem>(
			`https://app.smartapartmentdata.com/List/json/propertyItem.aspx?listID=5638557&token=A0E2523B25B805CBB6F8EC9D98AF56457EE7A255&propertyID=70275`
		);

		return this._propertyItem$;
	}
}

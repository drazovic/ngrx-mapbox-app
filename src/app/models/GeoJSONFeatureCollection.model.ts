import { GeoJSONFeature } from './GeoJSONFeature.model';
import { ListItems } from './ListItems.model';

export class GeoJSONFeatureCollection {
	data;

	constructor(items: ListItems) {
		this.data = items.records.map<any>((item) => {
			return new GeoJSONFeature(item);
		});
	}
}

export enum MarkerTypes {
	BLUE = '../../assets/images/pin/pin-blue.svg',
	RED = '../../assets/images/pin/pin-red.svg',
}

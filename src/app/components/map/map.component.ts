import {
	AfterViewInit,
	Component,
	ElementRef,
	OnInit,
	ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromApp from '../../store/app.reducer';
import * as mapSelectors from '../../store/app.selectors';
import { MapService } from './map.service';
import { GeoJSONFeature } from '../../models/GeoJSONFeature.model';

@Component({
	selector: 'app-map',
	templateUrl: './map.component.html',
	styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit, AfterViewInit {
	@ViewChild('map') mapRef: ElementRef;

	map: mapboxgl.Map;
	features$: Observable<GeoJSONFeature[]>;

	constructor(
		private store: Store<fromApp.AppState>,
		private router: Router,
		private mapService: MapService
	) {
		this.features$ = this.store.select(
			mapSelectors.FeaturesSelector.getAll
		);
	}

	ngOnInit(): void {}

	ngAfterViewInit() {
		this.map = this.mapService.buildMap(this.mapRef.nativeElement);

		this.map.on('click', 'listItems', (e) => {
			this.router.navigate([e.features[0].properties.propertyID]);
		});

		this.features$.subscribe((features) => {
			switch (features.length) {
				case 0:
					return;
				case 1:
					return this.mapService.setFeature(features[0]);
				default:
					return this.mapService.setFeatureCollection(features);
			}
		});
	}
}

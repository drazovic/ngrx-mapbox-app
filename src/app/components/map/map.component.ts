import {
	AfterViewInit,
	Component,
	ElementRef,
	OnInit,
	ViewChild,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { FitBoundsOptions, LngLatBoundsLike, Map } from 'mapbox-gl';

import * as fromApp from '../../store/app.reducer';
import * as mapSelectors from '../../store/app.selectors';
import { environment } from 'src/environments/environment';
import { MapService } from './map.service';
import { GeoJSONFeature } from 'src/app/models/GeoJSONFeature.model';

@Component({
	selector: 'app-map',
	templateUrl: './map.component.html',
	styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit, AfterViewInit {
	@ViewChild('map') mapRef: ElementRef;

	map: mapboxgl.Map;
	bounds$: Observable<LngLatBoundsLike>;
	fitBoundsOptions: FitBoundsOptions = { padding: 60 };
	style = environment.map.style;
	features$: Observable<GeoJSONFeature[]>;
	markerType$: Observable<string>;

	constructor(
		private store: Store<fromApp.AppState>,
		private router: Router,
		private mapService: MapService
	) {
		this.features$ = this.store.select(mapSelectors.getFeatures);
		this.bounds$ = this.store.select(mapSelectors.getBounds);
		this.markerType$ = this.store.select(mapSelectors.getMarkerType);
	}

	ngOnInit(): void {}

	ngAfterViewInit() {
		this.map = this.mapService.buildMap(this.mapRef.nativeElement);

		this.map.on('load', (event) => {
			this.map.on('click', 'points', (e) => {
				// this.mapService.setFeatureMarker(
				// 	e.features[0].geometry['coordinates']
				// );
				// this.map.setLayoutProperty('points', 'visibility', 'none');
				console.log(e.features[0].properties.propertyID);

				this.router.navigate([e.features[0].properties.propertyID]);
			});
		});

		this.features$.subscribe((features) => {
			if (features.length > 0) {
				console.log(features);
				this.mapService.setFeatureCollection(features);
			}
		});
	}
}

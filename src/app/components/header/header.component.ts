import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import * as AppSelectors from '../../store/app.selectors';
import * as fromApp from '../../store/app.reducer';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
	customHeader$: Observable<string>;

	constructor(
		private store: Store<fromApp.AppState>,
		private router: Router
	) {}

	ngOnInit(): void {
		this.customHeader$ = this.store
			.select(AppSelectors.ListItemsSelector.get)
			.pipe(
				map((listItems) => {
					switch (listItems) {
						case null:
							return 'Back to results';
						case undefined:
							return '';
						default:
							return listItems.agentInfo.customHeader;
					}
				})
			);
	}

	onHomeClick() {
		this.router.navigate(['/']);
	}
}

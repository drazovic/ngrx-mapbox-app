import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import * as AppSelectors from '../../store/app.selectors';
import * as MapActions from '../../store/app.actions';
import * as fromApp from '../../store/app.reducer';
import { map, withLatestFrom } from 'rxjs/operators';

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
		this.customHeader$ = this.store.select(AppSelectors.getListItems).pipe(
			map((listItems) => {
				return listItems
					? listItems.agentInfo.customHeader
					: 'Back to results';
			})
		);
	}

	onHomeClick() {
		this.store.dispatch(MapActions.fetchListItems());
		this.router.navigate(['/']);
	}
}

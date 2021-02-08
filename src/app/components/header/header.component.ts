import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import * as listSelectors from '../list/store/list.selectors';
import * as MapActions from '../map/store/map.actions';
import * as fromApp from '../../store/app.reducer';
import { AgentInfo } from '../list/models/list-items';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
	agentInfo$: Observable<AgentInfo>;

	constructor(
		private store: Store<fromApp.AppState>,
		private router: Router
	) {}

	ngOnInit(): void {
		this.agentInfo$ = this.store.select(listSelectors.getAgentInfo);
	}

	onHomeClick() {
		this.store.dispatch(MapActions.fetchData());
		this.router.navigate(['/']);
	}
}

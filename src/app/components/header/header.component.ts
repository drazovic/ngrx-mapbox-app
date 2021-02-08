import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as listSelectors from '../list/store/list.selectors';
import * as fromApp from '../../store/app.reducer';
import { AgentInfo } from '../list/models/list-items';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
	agentInfo$: Observable<AgentInfo>;

	constructor(private store: Store<fromApp.AppState>) {}

	ngOnInit(): void {
		this.agentInfo$ = this.store.select(listSelectors.getAgentInfo);
	}
}

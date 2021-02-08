import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListItemComponent } from './components/list/list-item/list-item.component';
import { ListItemsComponent } from './components/list/list-items/list-items.component';
import { ListComponent } from './components/list/list.component';
import { ListResolverService } from './components/list/services/list-resolver.service';
import { MapResolverService } from './components/map/services/map-resolver.service';

const routes: Routes = [
	{
		path: '',
		component: ListComponent,
		resolve: [MapResolverService],

		children: [
			{
				path: '',
				component: ListItemsComponent,
			},
			{
				path: ':id',
				component: ListItemComponent,
				resolve: [ListResolverService],
			},
		],
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}

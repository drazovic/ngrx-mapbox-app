import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListItemComponent } from './components/list-item/list-item.component';
import { ListItemsComponent } from './components/list-items/list-items.component';
import { PropertyResolverService } from './services/property-resolver.service';
import { MapResolverService } from './services/map-resolver.service';

const routes: Routes = [
	{
		path: '',
		component: ListItemsComponent,
		resolve: [MapResolverService],
	},
	{
		path: ':id',
		component: ListItemComponent,
		resolve: [PropertyResolverService],
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}

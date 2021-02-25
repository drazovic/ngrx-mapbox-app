import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PropertyItemComponent } from './components/property-item/property-item.component';
import { ListItemsComponent } from './components/list-items/list-items.component';
import { PropertyResolverService } from './services/property-resolver.service';

const routes: Routes = [
	{
		path: '',
		component: ListItemsComponent,
	},
	{
		path: ':id',
		component: PropertyItemComponent,
		resolve: [PropertyResolverService],
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapComponent } from './components/map/map.component';
import { PropertyItemComponent } from './components/property-item/property-item.component';
import { HeaderComponent } from './components/header/header.component';
import { ListItemsComponent } from './components/list-items/list-items.component';
import * as fromApp from './store/app.reducer';
import { AppEffects } from './store/app.effects';
import { environment } from '../environments/environment';

@NgModule({
	declarations: [
		AppComponent,
		MapComponent,
		PropertyItemComponent,
		HeaderComponent,
		ListItemsComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,
		BrowserAnimationsModule,
		MatSidenavModule,
		MatToolbarModule,
		MatButtonModule,
		MatCardModule,
		MatIconModule,
		MatListModule,
		MatExpansionModule,
		MatDividerModule,
		NgxMapboxGLModule.withConfig({
			accessToken: environment.map.accessToken,
		}),
		StoreModule.forRoot({
			app: fromApp.reducer,
		}),
		EffectsModule.forRoot([AppEffects]),
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}

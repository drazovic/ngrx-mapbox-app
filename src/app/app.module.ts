import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
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

import { AppComponent } from './app.component';
import { MapComponent } from './components/map/map.component';
import { ListComponent } from './components/list/list.component';
import { ListItemComponent } from './components/list/list-item/list-item.component';
import { HeaderComponent } from './components/header/header.component';
import { AppRoutingModule } from './app-routing.module';
import * as fromApp from './store/app.reducer';
import { MapEffects } from './components/map/store/map.effects';
import { ListEffects } from './components/list/store/list.effects';
import { HttpClientModule } from '@angular/common/http';
import { ListItemsComponent } from './components/list/list-items/list-items.component';

@NgModule({
	declarations: [
		AppComponent,
		MapComponent,
		ListComponent,
		ListItemComponent,
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
			accessToken:
				'pk.eyJ1IjoiZHJhem92aWMiLCJhIjoiY2trcHhnazN0MGhkaTJuczFzMDh3dGpzbCJ9.yf783U8myk0GX_R-qtDOYA',
		}),
		StoreModule.forRoot(fromApp.appReducer),
		EffectsModule.forRoot([MapEffects, ListEffects]),
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}

// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
	production: false,
	map: {
		style:
			'https://api.maptiler.com/maps/eef16200-c4cc-4285-9370-c71ca24bb42d/style.json?key=SoL71Zyf7SmLrVYWC7fQ',
		accessToken:
			'pk.eyJ1IjoiZHJhem92aWMiLCJhIjoiY2trcHhnazN0MGhkaTJuczFzMDh3dGpzbCJ9.yf783U8myk0GX_R-qtDOYA',
	},
	api: {
		baseUrl: 'https://app.smartapartmentdata.com',
		token: 'A0E2523B25B805CBB6F8EC9D98AF56457EE7A255',
	},
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

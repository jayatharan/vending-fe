// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiURL: 'http://localhost:8000',
  firebase:{
    apiKey: "AIzaSyA2NX-ey43xNPD5PFzD_lsYFL9Zf-lvXoQ",
    authDomain: "vending-machine-5985a.firebaseapp.com",
    databaseURL: "https://vending-machine-5985a-default-rtdb.firebaseio.com",
    projectId: "vending-machine-5985a",
    storageBucket: "vending-machine-5985a.appspot.com",
    messagingSenderId: "571426028326",
    appId: "1:571426028326:web:f8c0fe8034931a0ece5fe7",
    measurementId: "G-KZS93KL9S1"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.

---
layout: post
title: Ionic - How to Use Google Maps & Geolocation (Native & JavaScript)
image: img/ionic-google-maps.jpg
author: Baadier Sydow
date: 2018-01-20T07:03:47.149Z
tags: ["Ionic", "Angular"]
---

## Ionic Google Maps: An alternate approach

Many developers want to use Ionic Google Maps to add mapping and geolocation to their applications.  I've been exploring different ways to integrate Google Maps into an Ionic application over the last month. [MobeeWash](http://mobeewash.com), an Ionic Framework application, uses the map as an integral part of the user experience.

You have two options for integrating Google Maps into your Ionic application. There are versions using the native SDK's for iOS and Android or the JavaScript version intended for the web. Your choice affects how you will interact with the map and both options have different pros and cons.

One of the key [advantages of Ionic](http://baadiersydow.com/choose-ionic-framework-mobile-application-development-framework/) is the speed of development while in the browser. Things like live reload for native testing improve performance but does not get you to the same productivity level as staying in the browser.

The native Google Maps experience is smoother than the JavaScript Google Map version while the JavaScript version is easier to test in the browser.

I've been exploring a method for using both Native & JavaScript Google Maps in the same application. The correct version is chosen when the device boots. This allows you to test in the browser while developing and deliver the best experience for the current device when the application is deployed.

This approach does come with some overhead which I am still exploring.

I have added a repository with the completed tutorial code at <https://github.com/Baadier-Sydow/ionic-google-maps>

**Last updated for Ionic 3.9.2**

#### Getting Started

Let's start by setting up your Ionic installation. Navigate to where you would like to install this project using your terminal and enter the following:

```shell
ionic start
```

Enter an appropriate project name, for example GoogleMaps, and select blank for the starter. Select Y to add the Cordova native platforms to this project when the question is presented.

Navigate to the folder using:

```shell
cd projectname
```

#### Add Geolocation to the project

Geolocation allows you to retrieve the current location from the user's device. This works on both browsers and mobiles.

The device will request permission when the user loads a page that triggers a Geolocation lookup. You won't be able to retrieve the user's location until the permission is granted.

The official documentation for the Ionic Native wrapper for Geolocation can be viewed at <https://ionicframework.com/docs/native/geolocation/>

Run the following commands in your terminal to install the plugin:

```shell
ionic cordova plugin add cordova-plugin-geolocation --variable GEOLOCATION_USAGE_DESCRIPTION="To locate you"
tnpm install --save @ionic-native/geolocation
```

Now add the plugin to your app's module by editing **app.module.ts**.

```js
...
import { Geolocation } from '@ionic-native/geolocation';
...


providers: [ 
... 
Geolocation 
... 
]
```

#### Retrieve the users location using Geolocation

Everything has now been set up for you to use the Geolocation functionality. Lets open up ***home.ts*** and retrieve the user's location by amending ***home.ts*** to the following:

```js
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  location: {
    latitude: number,
    longitude: number
  };
  
  constructor(public navCtrl: NavController, public geolocation: Geolocation) {
    
  }

  ionViewDidLoad() {
    this.findUserLocation();
  }

  findUserLocation(){
    let options = {
      enableHighAccuracy: true,
      timeout: 25000
    };


    this.geolocation.getCurrentPosition(options).then((position) => {

      this.location = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      };

     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }

}
```

Let's walk through the code to get an understanding of what's going on.

We first import the Geolocation provider and then use dependency injection to initialize the object.

Then we create a location variable to hold the user's location. We are declaring the type for the location inline.

It will store both longitude and latitude as two separate properties.

```js
...
import { Geolocation } from '@ionic-native/geolocation';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  location: {
    latitude: number,
    longitude: number
  };
  
  constructor(public navCtrl: NavController, public geolocation: Geolocation) {
    
  }

}
```

With that being completed we have a function that requests the user's location that fires using the Ionic Framework lifecycle event, ionViewDidLoad().

Using this lifecycle event ensures that we only initiate the request once the view is ready and loaded.

The function ***findUserLocation()*** will perform the legwork of fetching and handling the user's location.

In the body of the findUserLocation() function, we set some initial options. It's important to set the **enableHighAccuracy** to true as it may not activate the Geolocation on some devices if not turned on.

We use **getCurrentPosition()** to retrieve the position which is returned to us via a Promise.

When the promise resolves we are given the users location as properties on the **response.coords** object.

This we store in the **location** variable that we set up for this purpose earlier.

You can handle any errors in the catch block. For now, we will only include the **console.log()**.

```js
  ionViewDidLoad() {
    this.findUserLocation();
  }

  findUserLocation(){
    let options = {
      enableHighAccuracy: true,
      timeout: 25000
    };


    this.geolocation.getCurrentPosition(options).then((position) => {

      this.location = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      };

     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }
```

#### Create the different Map providers you will require

We will be creating three different providers to interact with Google Maps. The **MapsProvider()** will interface with the different implementations of Javascript and Native maps.

The **JsMapsProvider()** and **NativeMapsProvider()** will have the concrete implementation of the map functionality.

Run the following in your terminal to create the providers:

```shell
ionic g provider MapsProvider
ionic g provider JsMapsProvider
ionic g provider NativeMapsProvider
```

Now add the new providers to your app module:

```js
...
import { MapsProvider } from '../providers/maps/maps';
import { JsMapsProvider } from '../providers/js-maps/js-maps';
import { NativeMapsProvider } from '../providers/native-maps/native-maps';
...

providers: [
    ...
    MapsProvider,
    JsMapsProvider,
    NativeMapsProvider
    ...
  ]
```

#### Setup your Google Maps API keys

To use the Google Maps API you will need an API key for each environment you want to tackle. In our case, we will be using the Web ie JavaScript and Native which covers iOS and Android.

You can find instructions for retrieving your API keys at:

- Web: [JavaScript API Key](https://developers.google.com/maps/documentation/javascript/get-api-key)
- Native: [iOS API Key](https://google-developers.appspot.com/maps/documentation/ios-sdk/get-api-key)
- Native: [Android API Key](https://google-developers.appspot.com/maps/documentation/android-api/signup)

We can move on once you have created and recorded your API keys.

#### Install the Native Google Maps Cordova plugin

We can install the Google Maps Cordova plugin using the API keys for Android and iOS you created from the previous step.

Run the following commands in the terminal ensuring that you replace the API key placeholder with your actual API keys:

```shell
ionic cordova plugin add cordova-plugin-googlemaps --variable API_KEY_FOR_ANDROID="YOUR_ANDROID_API_KEY_IS_HERE" --variable API_KEY_FOR_IOS="YOUR_IOS_API_KEY_IS_HERE"

npm install --save @ionic-native/google-maps
```

Add the Google Maps plugin to your app module:

```js
...
import { GoogleMaps } from '@ionic-native/google-maps';
...

  providers: [
    ...
    GoogleMaps
    ...
  ]
```

#### Install the JavaScript Google Maps script

The JavaScript version of Google Maps doesnt require installation using NPM and Cordova. It gets added directly to the head of your **index.html**.

Make the following addition to your index.html using your API key for Google Maps Web:

```html
  <!-- add to homescreen for ios -->
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="black">

  <script src="https://maps.googleapis.com/maps/api/js?key="></script>

  <!-- cordova.js required for cordova apps (remove if not needed) -->
  <script src="cordova.js"></script>
```

Note that I've highlighted where you need to add the script tag. You do not need to add the surrounding code.

#### A note on restricting your API key use

It's important to restrict where your API keys can be used. Someone could get a hold of your API key and use it resulting in you paying for their usage.

You can find options to restrict the API key usage when you create it. It will be under Credentials if your key has already been created.

The key can be restricted using the following different options:

- None
- HTTP referrers
- IP addresses
- Android applications
- iOS applications

I would suggest using None while following through this tutorial and then amending the restrictions to suit your needs later.

#### Setup your MapsProvider() to initialize the correct Google Maps implementation

Amend your **MapsProvider()**, which can be found at ***providers/map/map.ts***, to the following:

```js
import { Platform } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { JsMapsProvider } from './../js-maps/js-maps';
import { NativeMapsProvider } from './../native-maps/native-maps';
import { GoogleMaps } from '@ionic-native/google-maps';

@Injectable()
export class MapsProvider {

  map: any;

  constructor(public platform: Platform) {
    if(this.platform.is('cordova') && 
      (this.platform.is('ios') || this.platform.is('android'))){
      this.map = new NativeMapsProvider(GoogleMaps);
    } else {
      this.map = new JsMapsProvider();
    }
  }

  init(location, element){
    this.map.init(location, element);
  }

}
```

Let's talk through what is taking place above.

First we import the different providers we will be using in this provider:

```js
import { Platform } from 'ionic-angular';
import { JsMapsProvider } from './../js-maps/js-maps';
import { NativeMapsProvider } from './../native-maps/native-maps';
import { GoogleMaps } from '@ionic-native/google-maps';
```

Then we create a map variable that will eventually hold our map and initialize the **Platform** provider.

```js
...

@Injectable()
export class MapsProvider {

  map: any;

  constructor(public platform: Platform) {
   ...
  }
```

In the **MapsProvider()** constructor we check to see whether we are on the web or on a native device and then initialize the correct Google Maps provider.

```js
...

  constructor(public platform: Platform) {
    if(this.platform.is('cordova') && 
      (this.platform.is('ios') || this.platform.is('android'))){
      this.map = new NativeMapsProvider(GoogleMaps);
    } else {
      this.map = new JsMapsProvider();
    }
  }

...
```

Finally, we create an **init()** function that will create the actual map using the users Geolocation and a DOM element to display it in.

```js
  init(location, element){
    this.map.init(location, element);
  }
```

This function will be called when we decide where we are going to display the map.

The map variable will store the correct provider and call its **init()** function. We will create the corresponding init function in a later step.

#### Create your concrete JavaScript Google Maps implementations

Let's create the providers that will actually create the iOS, Android and JavaScript Google Maps.

Amend your **js-maps.ts** to the below and we can work through what is taking place.

```js
import { Injectable } from '@angular/core';

declare var google;

@Injectable()
export class JsMapsProvider {

  map: any;

  constructor() {
    
  }

  init(location, element){
    let latLng = new google.maps.LatLng(location.latitude, location.longitude);

    let opts = {
      center: latLng,
      zoom: 11,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    this.map = new google.maps.Map(element.nativeElement, opts);
  }

}
```

The first thing to take a note of is our declaring the **var google**. We do this to stop the compiler from complaining about a missing variable.

```js
declare var google;
```

Then we create a map variable to hold the Google Map and create the **init()** function that will initialize and display the map.

```js
@Injectable()
export class JsMapsProvider {

  map: any;

  constructor() {
    
  }

  init(location, element){
    let latLng = new google.maps.LatLng(location.latitude, location.longitude);

    let opts = {
      center: latLng,
      zoom: 11,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    this.map = new google.maps.Map(element.nativeElement, opts);
  }

}
```

When the init() is fired we use the location to set the center of the map. The new map is created by passing in the options and the DOM element that will hold the map.

#### Create your concrete Native Google Maps(iOS & Android) implementations

Amend your **native-maps.ts** to the below and we can work through what is taking place.

```js
import { Injectable } from '@angular/core';
import { GoogleMaps, LatLng, GoogleMapsEvent } from '@ionic-native/google-maps';

@Injectable()
export class NativeMapsProvider {

  map: any;

  constructor(public googleMaps: GoogleMaps) {

  }

  init(location, element){

    let latLng = new LatLng(location.latitude, location.longitude);

    let opts = {
      camera: {
        latLng: latLng,
        zoom: 11,
        tilt: 30
      }
    };

    this.map = this.googleMaps.create(element.nativeElement, opts);

    this.map.on(GoogleMapsEvent.MAP_READY).subscribe(() => {
      console.log('Map is ready!');
    });
  }

}
```

Note that additional objects have been imported specifically for the native Google Maps implementation.

```js
import { GoogleMaps, LatLng, GoogleMapsEvent } from '@ionic-native/google-maps';
```

Then we create a map variable to hold the Google Map and create the **init()** function that will initialize and display the map.

```js
@Injectable()
export class NativeMapsProvider {

  map: any;

  constructor(public googleMaps: GoogleMaps) {

  }

  init(location, element){

    let latLng = new LatLng(location.latitude, location.longitude);

    let opts = {
      camera: {
        latLng: latLng,
        zoom: 11,
        tilt: 30
      }
    };

    this.map = this.googleMaps.create(element.nativeElement, opts);

    this.map.on(GoogleMapsEvent.MAP_READY).subscribe(() => {
      console.log('Map is ready!');
    });
  }

}
```

When the init() is fired we use the location to set the center of the camera for the map.  The new map is created by passing in the options and the DOM element that will hold the map.

We've also added a listener that will log out to the console when the GoogleMapsEvent.MAP_READY event is fired. You can add logic here to handle things like adding map markers, changing the map center programmatically etc.

#### Handle the creation and display of the map on your page

This is the final step to display the map on your page.

First, we create the DOM element that will host our map on the page.

```html
<ion-header>
  <ion-navbar>
    <ion-title>
      Google Maps
    </ion-title>
  </ion-navbar>
</ion-header>

<ion-content>
  <div #map id="map"></div>
</ion-content>
```

Then we add some styles that will ensure that the DOM element can host the map. If you don't include this your map will not display.

```css
page-home {
    #map {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
      }

    ion-app._gmaps_cdv_ .nav-decor{
        background-color: transparent !important;
    }
}
```

Finally we create the map by passing the users location and the DOM element to our map provider.

Make the following amendments to your home.ts file to create the map.

```js
import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { MapsProvider } from './../../providers/maps/maps';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  location: {
    latitude: number,
    longitude: number
  };

  @ViewChild('map') mapElement: ElementRef;
  
  constructor(public navCtrl: NavController, public geolocation: Geolocation, public mapsProvider: MapsProvider) {
    
  }

  ionViewDidLoad() {
    this.findUserLocation();
  }

  findUserLocation(){
    let options = {
      enableHighAccuracy: true,
      timeout: 25000
    };


    this.geolocation.getCurrentPosition(options).then((position) => {

      this.location = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      };

      this.mapsProvider.init(this.location, this.mapElement);

     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }

}
```

#### Testing

We are now ready to test the final implementation. You can do this by running ionic serve to test the web-based implementation of Google Maps. Run ionic cordova run android or ionic cordova run ios to test the iOS and Android implementations.

Unfortunately, [Ionic DevApp](http://baadiersydow.com/introduction-to-ionic-devapp-and-first-impressions-using-it/), does not [currently support](https://ionicframework.com/docs/pro/view.html#plugin-support) the native Google Maps implementation.

#### Conclusion: Ionic Google Maps

This approach to handling Ionic Google Maps is focused on having the flexibility of being able to test in the browser and the performance of running the iOS or Android SDK versions of Google Maps. It takes a bit more effort as you have to maintain the code in two places but I feel the payoff is worth it.

Changing from an existing Google Maps implementation should not be too difficult as long as you don't leave out any functions when you refactor this alternative approach.

The full completed repo can be viewed [here](https://github.com/Baadier-Sydow/ionic-google-maps).
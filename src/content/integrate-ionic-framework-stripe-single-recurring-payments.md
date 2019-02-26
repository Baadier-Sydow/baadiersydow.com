---
layout: post
title: How to integrate Ionic Framework & Stripe single and recurring payments
image: img/ionic-framework-stripe.jpg
author: Baadier Sydow
date: 2018-01-26T07:03:47.149Z
tags: ["Ionic", "Angular"]
draft: false
---
<a href="//pluralsight.pxf.io/c/1384273/431407/7490"><img src="//a.impactradius-go.com/display-ad/7490-431407" border="0" alt="" width="728" height="90"/></a><img height="0" width="0" src="//pluralsight.pxf.io/i/1384273/431407/7490" style="position:absolute;visibility:hidden;" border="0" />

## Learn how to integrate Ionic Framework & Stripe in this tutorial


 Ionic Framework makes integrating Stripe a quick and easy process. [Stripe](http://stripe.com) is one of the world's leading payment processors and has built a reputation for being extremely developer friendly. They are available in a [number of countries](https://stripe.com/global) and you can attempt to go the [Stripe Atlas](https://stripe.com/atlas) route if you fall outside of the approved countries.

#### There are two main ways of integrating Stripe into an Ionic application

You can either go with the [Ionic Native](https://ionicframework.com/docs/native/stripe/) implementation, which is a wrapper around the Stripe native SDKs for iOS and Android. This is powered by [cordova-plugin-stripe](https://github.com/zyra/cordova-plugin-stripe). This has the limitation of only facilitating the creation of tokens for once off payments. The limitation is within the plugin and could change in the future.

The alternative approach is to use [Stripe.js](https://stripe.com/docs/stripe-js/reference) which is Stripe's JavaScript implementation of their functionality. This is easy to use and quick to implement as this is implemented in JavaScript and Ionic at its core is powered by web technologies. The functionality is delivered dynamically into the page and supports both single and recurring payments.

**After we complete this tutorial you will be able to integrate Ionic with Stripe and create tokens that you can use to charge your users with either a once off amount or a recurring payment.**

The final payment processing will need to be integrated into your backend as a separate task. This tutorial will focus primarily on the creation of the tokens necessary to charge the user.

I have added a repository with the completed tutorial code at <https://github.com/Baadier-Sydow/ionic-stripe>

**Last updated for Ionic 3.9.2**

#### Getting Started

Let's start by setting up your Ionic installation. Navigate to where you would like to install this project using your terminal and enter the following:

```shell
ionic start stripe blank
```

Enter an appropriate project name, for example, stripe as I've done, and select Y to add the Cordova native platforms to this project when the question is presented.

Navigate to the folder using:

```shell
cd stripe
```

#### Setup your Stripe profile and retrieve your API key

Stripe provides you with both testing and live API keys that you will need to use to complete the integration. Firstly, sign up for a Stripe account, and then retrieve your API keys by [following the instructions here](https://stripe.com/docs/dashboard#api-keys).

You should not have an issue signing up for a Stripe account even if you reside outside of their list of approved countries. The challenge occurs when you attempt to transact live payments. The test key will be sufficient for this tutorial.

#### Create the pages, add the plugins and connect them all

The first thing you will need to do is to create all the necessary pages you will need and add them to your **app.module.ts**.

Run the following commands to create the pages:

```shell
ionic g page StripeJavaScript --no-module
ionic g page StripeNative --no-module
```

Now add them to your applications module file:

```js
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { StripeJavaScriptPage } from '../pages/stripe-java-script/stripe-java-script';
import { StripeNativePage } from '../pages/stripe-native/stripe-native';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    StripeJavaScriptPage,
    StripeNativePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    StripeJavaScriptPage,
    StripeNativePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
```

Open up your **home.html** file and change it to match the code below. We are doing this to make it easier to test the different versions of Stripe we are integrating.

```html
<ion-header>
  <ion-navbar>
    <ion-title>
      Learn Stripe
    </ion-title>
  </ion-navbar>
</ion-header>

<ion-content padding>
  <button ion-button large full (click)="openJavaScript()">Stripe JavaScript</button>
  <button ion-button large full (click)="openNative()">Stripe Native</button>
</ion-content>
```

Now let's add the functions that the buttons are calling to your **home.ts** file. Include the code below to handle the button presses and ensure that the correct pages are being loaded.

```js
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { StripeJavaScriptPage } from './../stripe-java-script/stripe-java-script';
import { StripeNativePage } from '../stripe-native/stripe-native';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  openJavaScript(){
    this.navCtrl.push(StripeJavaScriptPage)
  }

  openNative(){
    this.navCtrl.push(StripeNativePage)
  }

}
```

#### Integrate Stripe.js into your Ionic project

Let's start by adding the Stripe.js script file to your **index.html**. Make the following change to the head of your **index.html**:

```html
<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>
  <meta charset="UTF-8">
  <title>Ionic App</title>
  <meta name="viewport" content="viewport-fit=cover, width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <meta name="format-detection" content="telephone=no">
  <meta name="msapplication-tap-highlight" content="no">

  <link rel="icon" type="image/x-icon" href="assets/icon/favicon.ico">
  <link rel="manifest" href="manifest.json">
  <meta name="theme-color" content="#4e8ef7">

  <!-- add to homescreen for ios -->
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="black">

  <script src="https://js.stripe.com/v3/" async></script>

  <!-- cordova.js required for cordova apps (remove if not needed) -->
  <script src="cordova.js"></script>

  <!-- un-comment this code to enable service worker
  <script>
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('service-worker.js')
        .then(() => console.log('service worker installed'))
        .catch(err => console.error('Error', err));
    }
  </script>-->

  <link href="build/main.css" rel="stylesheet">

</head>
<body>

  <!-- Ionic's root component and where the app will load -->
  <ion-app></ion-app>

  <!-- The polyfills js is generated during the build process -->
  <script src="build/polyfills.js"></script>

  <!-- The vendor js is generated during the build process
       It contains all of the dependencies in node_modules -->
  <script src="build/vendor.js"></script>

  <!-- The main bundle js is generated during the build process -->
  <script src="build/main.js"></script>

</body>
</html>
```

With that step completed we can start by making the changes we need to **StripeJavaScriptPage()**.

Open up **stripe-java-script.html** and make the following amendments to it.

```html
<ion-header>

  <ion-navbar>
    <ion-title>JavaScript</ion-title>
  </ion-navbar>

</ion-header>


<ion-content>

    <form action="/" method="post" id="payment-form">
    
      <div class="form-row">
        <div id="card-element">
          <!-- a Stripe Element will be inserted here. -->
        </div>
  
        <!-- Used to display Element errors -->
        <div id="card-errors" role="alert"></div>
      </div>
  
    <button ion-button block large>Add Card</button>
      
    </form>

</ion-content>
```

We are using [Stripe Elements](https://stripe.com/elements) to bootstrap our payment form. This will be bound together in **stripe-java-script.ts** and the Stripe form will be injected in when ready. The form id will be used to bind everything together.

Before we move on we are going to add some generic styles to our **stripe-java-script.scss**.

```css
page-stripe-java-script {
    .form-row{
        padding: 10px;
      }
    
      .StripeElement {
        background-color: white;
        padding: 8px 12px;
        border-radius: 4px;
        border: 1px solid transparent;
        box-shadow: 0 1px 3px 0 #e6ebf1;
        -webkit-transition: box-shadow 150ms ease;
        transition: box-shadow 150ms ease;
      }
    
      .StripeElement--focus {
        box-shadow: 0 1px 3px 0 #cfd7df;
      }
    
      .StripeElement--invalid {
        border-color: #fa755a;
      }
    
      .StripeElement--webkit-autofill {
        background-color: #fefde5 !important;
      }
}
```

Now we can start working on the **stripe-java-script.ts**. This where all the action takes place. First, amend your code in **stripe-java-script.ts** to match the following and then we can walk through it together.

```js
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

declare var Stripe;

@Component({
  selector: 'page-stripe-java-script',
  templateUrl: 'stripe-java-script.html',
})
export class StripeJavaScriptPage {

  stripe = Stripe('YOUR_API_KEY');
  card: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.setupStripe();
  }

  setupStripe(){
    let elements = this.stripe.elements();
    var style = {
      base: {
        color: '#32325d',
        lineHeight: '24px',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#aab7c4'
        }
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a'
      }
    };

    this.card = elements.create('card', { style: style });

    this.card.mount('#card-element');

    this.card.addEventListener('change', event => {
      var displayError = document.getElementById('card-errors');
      if (event.error) {
        displayError.textContent = event.error.message;
      } else {
        displayError.textContent = '';
      }
    });

    var form = document.getElementById('payment-form');
    form.addEventListener('submit', event => {
      event.preventDefault();

      // this.stripe.createToken(this.card)
      this.stripe.createSource(this.card).then(result => {
        if (result.error) {
          var errorElement = document.getElementById('card-errors');
          errorElement.textContent = result.error.message;
        } else {
          console.log(result);
        }
      });
    });
  }

}
```

The first step we are doing is to declare a Stripe variable that will stop the compiler from complaining about a missing object.

Then we new up a Stripe object using your Stripe API key and create a variable to hold the Stripe Elements object.

```js
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

declare var Stripe;

@Component({
  selector: 'page-stripe-java-script',
  templateUrl: 'stripe-java-script.html',
})
export class StripeJavaScriptPage {

  stripe = Stripe('YOUR_API_KEY');
  card: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
```

The code that sets up the Stripe Element and the handlers for the events that comes back from the Stripe element is setup using the **ionViewDidLoad()** lifecycle event.

```js
  ionViewDidLoad() {
    this.setupStripe();
  }
```

The majority of the work for this functionality takes place in the **setupStripe()** function.

```js
setupStripe(){
    let elements = this.stripe.elements();
    var style = {
      base: {
        color: '#32325d',
        lineHeight: '24px',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#aab7c4'
        }
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a'
      }
    };

    this.card = elements.create('card', { style: style });

    this.card.mount('#card-element');

    this.card.addEventListener('change', event => {
      var displayError = document.getElementById('card-errors');
      if (event.error) {
        displayError.textContent = event.error.message;
      } else {
        displayError.textContent = '';
      }
    });

    var form = document.getElementById('payment-form');
    form.addEventListener('submit', event => {
      event.preventDefault();

      // this.stripe.createToken(this.card)
      this.stripe.createSource(this.card).then(result => {
        if (result.error) {
          var errorElement = document.getElementById('card-errors');
          errorElement.textContent = result.error.message;
        } else {
          console.log(result);
        }
      });
    });
  }
```

The function does quite a bit and it would be better to separate the setup and binding code from the setup of the event handlers but this is sufficient for what we are attempting to do.

We first set up a Stripe Element, add some base styles, create a card and then mount it onto the view.

```js
let elements = this.stripe.elements();
    var style = {
      base: {
        color: '#32325d',
        lineHeight: '24px',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#aab7c4'
        }
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a'
      }
    };

    this.card = elements.create('card', { style: style });

    this.card.mount('#card-element');
```

With the card created we can now listen to errors from the card and add a listener for submit events. We prevent the default from taking place on submit and then select either **createToken()** or **createSource()** to authorise the card for future charges.

Use **createToken()** if you need to make a once off payment or **createSource()** to create a card that can be billed multiple times in the future.

When the promise resolves you will receive an object back that has everything you need to make payments with this card.  This is where you would integrate an API call to your server to send through the source id, last 4 digits etc

```js
    this.card.addEventListener('change', event => {
      var displayError = document.getElementById('card-errors');
      if (event.error) {
        displayError.textContent = event.error.message;
      } else {
        displayError.textContent = '';
      }
    });

    var form = document.getElementById('payment-form');
    form.addEventListener('submit', event => {
      event.preventDefault();

      // this.stripe.createToken(this.card)
      this.stripe.createSource(this.card).then(result => {
        if (result.error) {
          var errorElement = document.getElementById('card-errors');
          errorElement.textContent = result.error.message;
        } else {
          console.log(result);
        }
      });
    });
```

#### Integrate Stripe Native SDKs ie iOS & Android into your Ionic project

To integrate the native Stripe implementation into Ionic we start with adding the Cordova plugin and then add the Ionic Native wrapper to make working with it easier.

```shell
ionic cordova plugin add cordova-plugin-stripe
npm install --save @ionic-native/stripe
```

Once this is completed we need to add the Ionic Native Stripe helper to your **app.module.ts**.

```js
...

import { Stripe } from '@ionic-native/stripe';

@NgModule({
  ...
  providers: [
    ...
    Stripe,
    ...
  ]
})
export class AppModule {}
```

We now have all the setup complete and can move onto setting up our view to host our payment form.

I've opted to make this as simple as possible for the purpose of showing you how to do the foundational setup. I'm just binding variables to the view using ngModel instead of using a reactive form that will make firing some inline validation easier for the sake of simplicity.

The view will include some Ionic inputs and a button to submit the request to Stripe.

Amend **stripe-native.html** to the following.

```html
<ion-header>

  <ion-navbar>
    <ion-title>Native</ion-title>
  </ion-navbar>

</ion-header>


<ion-content>

<ion-list>

  <ion-item>
    <ion-label color="primary" stacked>Card Number</ion-label>
    <ion-input type="text" placeholder="Enter your 16 digit card number" 
    [(ngModel)]="cardNumber"></ion-input>
  </ion-item>

  <ion-item>
    <ion-label color="primary" stacked>Expiration Month</ion-label>
    <ion-input type="number" placeholder="Enter your card expiration month"
    [(ngModel)]="cardMonth"></ion-input>
  </ion-item>

  <ion-item>
    <ion-label color="primary" stacked>Expiration Year</ion-label>
    <ion-input type="number" placeholder="Enter your card expiration year"
    [(ngModel)]="cardYear"></ion-input>
  </ion-item>

  <ion-item>
    <ion-label color="primary" stacked>CVV</ion-label>
    <ion-input type="number" placeholder="Enter your CVV"
    [(ngModel)]="cardCVV"></ion-input>
  </ion-item>

</ion-list>


  <button ion-button block large (click)="validateCard()">Add Card</button>

</ion-content>
```

Your **stripe-native.ts** will handle the legwork of validating the card details and submitting it to the Stripe servers. You will be able to communicate to your own API once you receive a successful response back from Stripe with the tokenized card object.

Amend your stripe-native.ts file to reflect the code below and we can walk through it together afterwards.

```js
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Stripe } from '@ionic-native/stripe';

@Component({
  selector: 'page-stripe-native',
  templateUrl: 'stripe-native.html',
})
export class StripeNativePage {

  cardNumber: string;
  cardMonth: number;
  cardYear: number;
  cardCVV: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public stripe: Stripe) {
  }

  ionViewDidLoad() {
    this.stripe.setPublishableKey('YOUR_API_KEY');
  }

  validateCard(){
    let card = {
      number: this.cardNumber,
      expMonth: this.cardMonth,
      expYear: this.cardYear,
      cvc: this.cardCVV
     };

     // Run card validation here and then attempt to tokenise
     
     this.stripe.createCardToken(card)
        .then(token => console.log(token))
        .catch(error => console.error(error));
  }

}
```

First, we import the Ionic Native Stripe helper into this component and then we create a few variables that will hold the card details that we bound to the view in the previous step.

```js
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Stripe } from '@ionic-native/stripe';

@Component({
  selector: 'page-stripe-native',
  templateUrl: 'stripe-native.html',
})
export class StripeNativePage {

  cardNumber: string;
  cardMonth: number;
  cardYear: number;
  cardCVV: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public stripe: Stripe) {
  }
```

Now we set the Stripe key on the object when the view loads. Once again, we are using the **ionViewDidLoad()** lifecycle hook. This step would be better suited done in your **app.component.ts** when the application boots up but I've done it here for simplicity.

```js
  ionViewDidLoad() {
    this.stripe.setPublishableKey('YOUR_API_KEY');
  }
```

Finally, we call our **validateCard()** function which only creates the Stripe card object and then fires off the captured card details to Stripe. When the promise resolves you would retrieve the data and then communicate with your own API to actually bill the card.

It's important to actually validate the card details before attempting to create the token. The [Ionic Native Stripe](https://ionicframework.com/docs/native/stripe/) documentation includes all the available functions that you can use to validate the card number, cvv etc.

```js
  validateCard(){
    let card = {
      number: this.cardNumber,
      expMonth: this.cardMonth,
      expYear: this.cardYear,
      cvc: this.cardCVV
     };

     // Run card validation here and then attempt to tokenise
     
     this.stripe.createCardToken(card)
        .then(token => console.log(token))
        .catch(error => console.error(error));
  }
```

Unfortunately, the Native implementation only supports creating card tokens and bank account tokens for once-off payments. If you want to bill the card more than once in the future then you will need to use the Stripe.js integration and create a payment source.

#### Conclusion: Ionic Framework & Stripe

We've learnt how to do two different ways of integrating Stripe into an Ionic project. You can use both in the same application if you wanted to though you would have to use the JavaScript integration if you want recurring payments.

You still have a fair bit of work to do once you've completed the integration of the frontend of the application as you will need to bill the payment source from your server.

The full completed repo can be viewed [here](https://github.com/Baadier-Sydow/ionic-stripe).

<a href="//pluralsight.pxf.io/c/1384273/431407/7490"><img src="//a.impactradius-go.com/display-ad/7490-431407" border="0" alt="" width="728" height="90"/></a><img height="0" width="0" src="//pluralsight.pxf.io/i/1384273/431407/7490" style="position:absolute;visibility:hidden;" border="0" />
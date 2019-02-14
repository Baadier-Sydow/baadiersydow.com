---
layout: post
title: How to integrate Ionic Framework & WordPress REST API Tutorial
image: img/ionic-framework-wordpress-tutorial.jpg
author: Baadier Sydow
date: 2018-01-31T07:03:47.149Z
tags: ["Ionic", "Wordpress", "Angular"]
---

## Learn how to integrate Ionic Framework & WordPress in this tutorial

[WordPress](http://wordpress.org) officially merged in the REST API into core in 2017. Up until that point it had been a feature plugin. This was the culmination of a multi-year endeavour and opened up WordPress to becoming a generic backend content provider for a wide range of applications.

Ionic Framework makes integrating with WordPress a quick and easy process. Integration involves connecting to the correct resources via Angular's HTTP provider. The WordPress API team has used REST principles in the development of the API which makes the API predictable and a cinch to work with.

You can learn more about the WordPress REST API and how to access its different resources by visiting the [documentation](https://developer.wordpress.org/rest-api/).

**After we complete this tutorial you will be able to integrate Ionic with WordPress.**

This tutorial will focus primarily on teaching the fundamentals of interacting with WordPress via the API. To do that we will access a few different endpoints to retrieve and display data.

We will be loading all the post categories on a WordPress site, showing a selected categories posts and then viewing a single post.

I have added a repository with the completed tutorial code at <https://github.com/Baadier-Sydow/ionic-wordpress-rest-api>.

**Last updated for Ionic 3.9.2**

#### Getting Started

Let's start by setting up your Ionic installation. Navigate to where you would like to install this project using your terminal and enter the following:

```shell
ionic start wordpress blank
```

Enter an appropriate project name, for example, wordpress as I've done, and select N to not add the Cordova native platforms to this project when the question is presented as it will not be needed.

Navigate to the folder using:

```shell
cd wordpress
```

#### Create a provider to interface with your WordPress API

Let's start by creating a provider that will handle the heavy lifting of connecting to the API and returning the data as an Observable back to us. Our pages and components will be able to receive the response and update the view appropriately.

Run the following command to generate the provider:

```shell
ionic g provider Wordpress
```

Now add the provider to your **app.module.ts** to make it available to your application. Also, note that we add Angular's **HttpModule** to make **Http** available within the application. You will need this to connect to remote resources.

```js
...
import { HttpModule } from '@angular/http';
import { WordpressProvider } from '../providers/wordpress/wordpress';
...

@NgModule({
  declarations: [
    ...
  ],
  imports: [
    ...
    HttpModule
    ...
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    ...
  ],
  providers: [
    ...
    WordpressProvider
  ]
})
export class AppModule {}
```

Make the following changes your **wordpress.ts** file:

```js
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class WordpressProvider {

  baseUrl: string = "http://demo.wp-api.org/wp-json/wp/v2/"

  constructor(public http: Http) {

  }

  retrieveCategories(){
    return this.http.get(this.baseUrl + 'categories')
    .map(res => res.json());
  }

  retrievePostsInCategory(categoryId: number){
    return this.http.get(this.baseUrl + 'posts?categories=' + categoryId)
    .map(res => res.json());
  }

}
```

Now let's talk through what is taking place in the provider.

We are importing **Http** into the provider to allow us to connect to the REST API. We also include **Http** in the constructor of the provider to create it.

Then we add the **map** operator so that we can map the Observable response that is returned. This allows you to transform the data and return it.

```js
...
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class WordpressProvider {

  ...

  constructor(public http: Http) {

  }
```

A variable, **baseUrl**, is created to store the base URL of the endpoint you will be using. This is just to make it easier to work with and change. In a larger application, this would live in a constants or settings file.

I've opted to use the demo url provided by the WordPress REST API handbook to make this easier for you to follow the tutorial. This should be replaced by a URL pointing to your own site.

```js
...

@Injectable()
export class WordpressProvider {

  baseUrl: string = "http://demo.wp-api.org/wp-json/wp/v2/"

  constructor(public http: Http) {

  }

...
```

Now we create a function that retrieves all the categories available on the WordPress site. This will return an observable stream of data.

```js
  retrieveCategories(){
    return this.http.get(this.baseUrl + 'categories')
    .map(res => res.json());
  }
```

Finally, we add a function that retrieves all the posts for a selected category on the remote site. This function takes a category id.

```js
  retrievePostsInCategory(categoryId: number){
    return this.http.get(this.baseUrl + 'posts?categories=' + categoryId)
    .map(res => res.json());
  }
```

#### Create pages that your app will navigate to

Now we can create the pages we need to interact with the API and display the posts. We have the **HomePage** available that will host our first view. We will add two more pages that you will be able to navigate to.

Run the following commands in your terminal:

```shell
ionic g page CategoryList --no-module
ionic g page Post --no-module
```

Add the pages to your **app.module.ts** to make them available to the application.

```js
...
import { CategoryListPage } from '../pages/category-list/category-list';
import { PostPage } from './../pages/post/post';

@NgModule({
  declarations: [
    ...
    CategoryListPage,
    PostPage
  ],
  imports: [
    ...
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    ...
    CategoryListPage,
    PostPage
  ],
  providers: [
    ...
  ]
})
export class AppModule {}
```

#### Retrieve all the categories from the WordPress site via the API

Start by making the following changes to your home.ts file.

```js
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { WordpressProvider } from './../../providers/wordpress/wordpress';
import { CategoryListPage } from './../../pages/category-list/category-list';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  categories: any;

  constructor(public navCtrl: NavController, public wordpress: WordpressProvider) {

  }

  ionViewDidLoad(){
   this.wordpress.retrieveCategories().subscribe(results => {
     this.categories = results;
   });
  }

  loadCategory(id: number){
    this.navCtrl.push(CategoryListPage, {
      categoryId: id
    });
  }

}
```

We start by importing the WordPress provider so that we can interact with the API. We initialize this in the constructor.

Then we add in the **CategoryListPage** so that we can navigate to this after selecting a single category to view.

```js
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { WordpressProvider } from './../../providers/wordpress/wordpress';
import { CategoryListPage } from './../../pages/category-list/category-list';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public wordpress: WordpressProvider) {

  }
```

When the view loads we make a request to the WordPress site to retrieve all the post categories that are available and then store the result in a variable named **categories**. We use **ionViewDidLoad()** to make sure that the request only fires off once the view has loaded.

```js
...

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  categories: any;

  constructor(public navCtrl: NavController, public wordpress: WordpressProvider) {

  }

  ionViewDidLoad(){
   this.wordpress.retrieveCategories().subscribe(results => {
     this.categories = results;
   });
  }

}
```

A method has been added, **loadCategory()**, that will receive a category id and navigate to the **CategoryListPage** with the id attached as a **NavParams**.

This method is triggered by user interaction on the list of categories.

```js
  loadCategory(id: number){
    this.navCtrl.push(CategoryListPage, {
      categoryId: id
    });
  }
```

#### Display all the categories that were retrieved and handle the user selection

Change **home.html** to reflect the code below:

```html
<ion-header>
  <ion-navbar>
    <ion-title>
      Ionic Framework & WordPress
    </ion-title>
  </ion-navbar>
</ion-header>

<ion-content>
  <ion-list>
    <ion-item *ngFor="let category of categories" (click)="loadCategory(category?.id)">
      {{ category?.name }}
    </ion-item>
  </ion-list>
</ion-content>
```

We create an **ion-list** to hold the list of categories that are returned. An ***ngFor** is used to loop through each of the categories and create an **ion-item** that will display the category name.

Angular's safe navigation operator is used to ensure that no error is triggered before the data is returned to the view.

Finally, a click handler is included which passes through the selected categories id to the **loadCategory()** function.

#### Receive the selected categories id and fetch its posts

Open your **category-list.ts** file and make the following changes before proceeding.

```js
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { WordpressProvider } from './../../providers/wordpress/wordpress';
import { PostPage } from './../post/post';

@Component({
  selector: 'page-category-list',
  templateUrl: 'category-list.html',
})
export class CategoryListPage {

  categoryId: number;
  posts: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public wordpress: WordpressProvider) {
    this.categoryId = this.navParams.get("categoryId");
  }

  ionViewDidLoad() {
    this.wordpress.retrievePostsInCategory(this.categoryId).subscribe(results => {
      this.posts = results;
    });
  }

  openPost(post){
    this.navCtrl.push(PostPage, {
      post: post
    });
  }

}
```

Now, let's walk through the changes to understand what is taking place.

We start by importing the providers that we will need in this component.

**NavParams** is imported to retrieve the category id coming from **HomePage** along with the **WordpressProvider** to interact with the API.

**PostPage** has also been included to display a single post that has been retrieved and selected by the user.

**NavParams** and **WordpressProvider** are initialized via the constructor.

```js
...
import { NavController, NavParams } from 'ionic-angular';
import { WordpressProvider } from './../../providers/wordpress/wordpress';
import { PostPage } from './../post/post';

@Component({
  selector: 'page-category-list',
  templateUrl: 'category-list.html',
})
export class CategoryListPage {

  ...

  constructor(public navCtrl: NavController, public navParams: NavParams, public wordpress: WordpressProvider) {
    ...
  }

  ...
```

We create variables to hold the category id that has been selected and the posts that are available for this category.

```js
...

@Component({
  selector: 'page-category-list',
  templateUrl: 'category-list.html',
})
export class CategoryListPage {

  categoryId: number;
  posts: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public wordpress: WordpressProvider) {
    ...
  }

}
```

In the constructor, we use **NavParams** to retrieve and store the selected category id.

```js
...

@Component({
  selector: 'page-category-list',
  templateUrl: 'category-list.html',
})
export class CategoryListPage {

  categoryId: number;
  posts: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public wordpress: WordpressProvider) {
    this.categoryId = this.navParams.get("categoryId");
  }

}
```

The Ionic lifecycle hook, **ionViewDidLoad()** is used to fire off a request to retrieve all the available posts for this category. The category id is passed along with the request to the API.

All the posts that have been returned are stored in the **posts** variable for display on the view.

**ionViewDidLoad()** is run after the constructor so you can be assured that the category id will have been retrieved already.

```js
...

@Component({
  selector: 'page-category-list',
  templateUrl: 'category-list.html',
})
export class CategoryListPage {

  categoryId: number;
  posts: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public wordpress: WordpressProvider) {
    this.categoryId = this.navParams.get("categoryId");
  }

  ionViewDidLoad() {
    this.wordpress.retrievePostsInCategory(this.categoryId).subscribe(results => {
      this.posts = results;
    });
  }

}
```

Now we create a function, **openPost()**, that will send the full post object returned from the API to the **PostPage** for displaying. This is triggered via a click event on the selected post in the view which we will discuss in the next section.

```js
...

@Component({
  selector: 'page-category-list',
  templateUrl: 'category-list.html',
})
export class CategoryListPage {

  ...

  constructor(public navCtrl: NavController, public navParams: NavParams, public wordpress: WordpressProvider) {
    ...
  }
   ...
   
  openPost(post){
    this.navCtrl.push(PostPage, {
      post: post
    });
  }

}
```

#### Show all the posts for this category and allow the user to select one

Change your **category-list.html** to the following before we move on.

```html
<ion-header>

  <ion-navbar>
    <ion-title>Posts</ion-title>
  </ion-navbar>

</ion-header>


<ion-content>
  <ion-list *ngIf="posts.length">
    <ion-item *ngFor="let post of posts" (click)="openPost(post)">
      <h3>{{ post.title.rendered }}</h3>
    </ion-item>
  </ion-list>
</ion-content>
```

We take a similar approach to the **home.html** where we have a **ion-list** that will contains a few **ion-item**'s. One difference is that we use ***ngIf** to make sure that the **ion-list** is only created when there are posts returned for this category.

Then we use a *ngFor to iterate over all the posts while displaying their respective titles with the safe navigation operator.

Note that the title of the WordPress post is within the **rendered** property of the object.

A click handler has been included that will send the full post object when selected.

#### Display the WordPress post's full content on the Ionic page

Change post.ts to reflect the below:

```js
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-post',
  templateUrl: 'post.html',
})
export class PostPage {

  post: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.post = this.navParams.get("post");
  }

}
```

Once again, we are importing the providers we will need. We only include NavParams to retrieve the post object. No other additional providers are necessary as this is largely a presentational view.

```js
...
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-post',
  templateUrl: 'post.html',
})
export class PostPage {

  ...

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    
  }

}
```

Then we retrieve the post from NavParams and set it to a local variable, **post**.

```js
...

@Component({
  selector: 'page-post',
  templateUrl: 'post.html',
})
export class PostPage {

  post: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.post = this.navParams.get("post");
  }

}
```

With that out of the way, we can display the post on **post.html**.

Amend **post.html** to reflect the following:

```html
<ion-header>

  <ion-navbar>
    <ion-title>Post</ion-title>
  </ion-navbar>

</ion-header>


<ion-content padding>
  <h1>{{ post.title.rendered }}</h1>
  <p [innerHTML]="post.content.rendered"></p>
</ion-content>
```

We display the post title first and beneath that the post content. Notice that we bind the post content using **[innerHTML]**.

The post's body content includes HTML markup that will display if you use the usual interpolation, **{{ post.content.rendered }}** instead of the **[innerHTML]** binding.

That concludes the final step.

You should now be able to load the categories from your WordPress website via the API and then select specific posts within the category for viewing.

#### Conclusion: Ionic Framework & WordPress REST API

We've learnt how to integrate WordPress into an Ionic project. The process is similar for retrieving and posting to other endpoints. Refer to the [API documentation](https://developer.wordpress.org/rest-api/reference/) to try the other endpoints and to begin making more complex integrations.

The full completed repo can be viewed [here](https://github.com/Baadier-Sydow/ionic-wordpress-rest-api).
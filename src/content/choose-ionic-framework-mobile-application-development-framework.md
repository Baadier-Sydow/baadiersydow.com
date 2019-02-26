---
layout: post
title: Why choose Ionic Framework for your mobile application development framework
image: img/ionic-framework.png
author: Baadier Sydow
date: 2017-11-17T07:03:47.149Z
tags: ["Ionic"]
draft: false
---
<a href="//pluralsight.pxf.io/c/1384273/431407/7490"><img src="//a.impactradius-go.com/display-ad/7490-431407" border="0" alt="" width="728" height="90"/></a><img height="0" width="0" src="//pluralsight.pxf.io/i/1384273/431407/7490" style="position:absolute;visibility:hidden;" border="0" />

### **Foreword**

I wrote this article in early January 2017 and somehow never got round to publishing it. I had planned on publishing it the very next day! Somehow life must have got in the way of my good intentions. After a 10 month hiatus, I decided to re-look at it and see if anything has changed since then and to finally publish it.

I’ve been working with [Ionic Framework](http://ionicframework.com/) since 2016 while the framework was still in Beta. The initial commit on [MobeeWash](http://mobeewash.com) was made on the 5th July 2016 and ionic-angular was at 2.0.0-beta.10 at the time. I also worked on an early prototype for MobeeWash in May 2016 using Ionic on an earlier version of the Beta. I tinkered with Ionic before that, in 2015, while it was at version 1 but found Angular 1, at the time, to be bewildering.

### The current state of the ecosystem

There are a plethora of options available for developing on the major mobile platforms and I’ve tinkered with the majority of them. I’ve sampled everything from web apps to [Xamarin](https://www.xamarin.com/), [Titanium](https://www.appcelerator.com/Titanium/) and more recently a brief fling with [React Native](https://facebook.github.io/react-native/). Going native on both major platforms always felt a bridge too far. Each ecosystem is different and carries its own cognitive load. Going hybrid is the best option if you have a small team and want to be on both platforms as soon as possible.

Ionic has unique advantages that set it apart from others within the mobile application development space. While it is not as performant as native and doesn’t purport to be, it gets damn close to it. The average user cannot spot the difference between a well designed Ionic app and a native one. A fair number of developers would not be able to either.

### A vote for Ionic

Ionic provides exactly what it says on the tin. Choose Ionic if you want a technology that allows you to build high-quality mobile applications at breakneck speed. Ionic makes the single code base pipe dream a concrete reality. Your mileage will vary but I’ve had to write very limited platform specific code. The majority of the platform-specific code I’ve written has been isolated to the UI and not logic.

These are some of the key advantages that set Ionic apart.

### Use your existing web skills

Ionic allows you to bring your existing web development skills along with you. It has a foundation of familiar and robust web technologies. Angular, Typescript, SCSS and HTML are the key building blocks of Ionic applications. I had no experience with Angular 2 or Typescript when I starting learning it but found it easy to grok.

The ecosystem and tooling will feel familiar if you’re coming from a web development background. I was able to start being productive significantly faster than I expected. Once I understood exactly how all the different pieces fit together and interacted I could start operating at full tilt.

### Speed of development and iteration

Ionic allows you to spend most of your time doing your testing in the browser. This saves you from having to deploy to an emulator and/or device which can disrupt your flow. This increases your speed of development and iteration on ideas. Ionic provide convenient live reloading on devices that will speed up your device testing.

Being able to whip together a quick-and-dirty prototype in a week is useful. This allows you to mockup parts of your application while getting feedback. End users can start testing functional prototypes much earlier in the development cycle. [Ionic View](https://view.ionic.io/) provides a useful way to get your application in front of your decision makers while [Ionic DevApp](https://ionicframework.com/docs/pro/devapp/) allows you to test your application live on multiple devices.

You can mockup native plugins that will only run on devices to return mock data on the browser. This ensures that you can spend as much time as possible in the browser where you are the most efficient. Community member, [Josh Morony](https://twitter.com/joshuamorony), has a good overview of how to achieve this in the video below.


<iframe width="560" height="315" src="https://www.youtube.com/embed/SENbR9g7ExQ" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


### First class cross-platform support

Ionic currently supports all the major deployment targets for a mobile application. You are able to build and deploy for Android, iOS and Windows Mobile. They have also worked hard on getting full support for Progressive Web Apps. The support is comprehensive and you can use the same code across all platforms.

Ionic allows you to spend less time writing code to support individual platforms and more time focusing on your actual app. That’s a major win in my book.

> Ionic allows you to spend less time writing code to support individual platforms and more time focusing on your actual app.

[Ionic Native](http://ionicframework.com/docs/native/) provides support in Ionic for a wide range of Cordova plugins. Cordova allows you to develop in Javascript and interact with the native app environment. Ionic provides interfaces around this native functionality. This allows you to work with native interaction in a consistent and predictable way. Native interaction return promises and observables which are easy to handle for developers.

### High quality and well-documented components

Ionic has created a comprehensive set of high-quality components. The components look and act the part of their native counterparts. They have been developed to match the feel of their respective platform. This ensures that Android and iOS components don’t look out of place on the device. They feel natural and performant to the end user.

The components have been completely documented with a number of examples and demos. This is an important consideration that is often overlooked in open source projects. Being able to refer to the documentation with confidence makes a big difference to your daily workflow.

Ionic has made massive strides to make their components sustainable for the long term with their introduction of [Stencil.js](https://stenciljs.com/). They have migrated their Angular-based components to 100% standards compliant web components. This allows you to start using Ionic components without having to use Angular. The change will allow developers to use any Javascript framework or no framework at all with the components.

You can view an introduction to Stencil.js in the video below:

<iframe width="560" height="315" src="https://www.youtube.com/embed/UfD-k7aHkQE" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### Holistic ecosystem for mobile application development

Ionic has provided a comprehensive toolset to develop a mobile application from genesis to delivery. Their Pro functionality has changed since this article was initially written. It used to include push notifications and user authentication as part of the offering but this has since fallen away. The team also invested time into a real-time database offering but this has been sunsetted. The offering now includes live deployment, application packaging and comprehensive error monitoring.

A subset of this functionality is available in a generous free tier. The paid tiers are reasonably priced starting at $29 for individual developers. This pricing is per user and you can have unlimited applications on your profile. They also have offerings tailored towards teams and enterprise users.

[Ionic Market](https://market.ionic.io/) has some plugins and starter packages. The volume is slim and of varying quality. Further options exist to get your project kickstarted. You can find assets on Envato and developers selling direct for example [Ionic Themes](https://ionicthemes.com/).

### Leverage existing libraries and components

Ionic currently uses the latest version of Angular. At the time of writing, this was Angular 5.0.0. As Angular is the base of your project you can leverage any open source Angular components in your project. If you need a star rating component its a simple a matter of installing a compatible component from NPM. This gives you a massive productivity boost.

Your application runs as a web view with a native wrapper. This gives you the ability to pull in any Javascript library that you would like. If you need a library to work with time or to provide a map then you can turn to Moment or Google Maps without a second thought. It just works.

### Transparent leadership, support and an active community

Ionic is an open source project and hosts its [repositories](https://github.com/driftyco/ionic) on Github. The project milestones are made publicly available along with [notes](https://docs.google.com/document/d/1LrPDUkfXpqPIsghaSCxHyN1GIZ0TK2bwFxOZx2GKWtI/edit) of their weekly framework meeting. They’ve also made their roadmap for the next year available. This view into the behind the scenes activities and the future has engendered a lot of trust.

Ionic has provided both a [support forum](http://ionicworldwide.herokuapp.com/) and [Slack channel](http://ionicworldwide.herokuapp.com/) to get assisted with issues. Both the forum and the Slack channel are active which is always a good sign. I prefer the Slack channel for getting quick answers when stuck on an issue. [Mike Hartington](https://twitter.com/mhartington), one of the Ionic team members, is omnipresent on the channel assisting users with issues. Do not ping him for the love of all things holy.

------

### What are you waiting for?

Ionic’s ease of development, agile workflow and cross-platform support make it an easy choice for your next mobile application. The wide range of plugins, their high-quality components and the cream of the web’s Javascript libraries will get you developing your next app at lightspeed.

<a href="//pluralsight.pxf.io/c/1384273/431407/7490"><img src="//a.impactradius-go.com/display-ad/7490-431407" border="0" alt="" width="728" height="90"/></a><img height="0" width="0" src="//pluralsight.pxf.io/i/1384273/431407/7490" style="position:absolute;visibility:hidden;" border="0" />
---
layout: post
title: Introduction to Ionic DevApp and first impressions using it
image: img/ionic-devapp.jpeg
author: Baadier Sydow
date: 2017-11-17T07:03:47.149Z
tags: ["Ionic"]
draft: false
---
<a href="//pluralsight.pxf.io/c/1384273/431407/7490"><img src="//a.impactradius-go.com/display-ad/7490-431407" border="0" alt="" width="728" height="90"/></a><img height="0" width="0" src="//pluralsight.pxf.io/i/1384273/431407/7490" style="position:absolute;visibility:hidden;" border="0" />

#### Ionic DevApp Launched

The Ionic team announced the release of their new [Ionic DevApp](http://blog.ionic.io/announcing-ionic-devapp/) yesterday, 31 October 2017. The team developed the new application with the aim of improving Ionic developers daily workflow.

The application is free to download and can be found on both [iOS](https://itunes.apple.com/us/app/ionic-devapp/id1233447133?mt=8) and [Android.](https://play.google.com/store/apps/details?id=io.ionic.devapp&hl=en)

This has come about as a split of their [Ionic View](https://ionicframework.com/docs/pro/view/) app which will remain focused on demoing your app to stakeholders. I use Ionic daily while working on [MobeeWash](http://mobeewash.com/) and I was keen to give it a try to see how it would improve my daily workflow.

<iframe width="560" height="315" src="https://www.youtube.com/embed/tbTo60fAJcc" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

My typical workflow is to develop and test as much as I can within the browser. The browser currently provides the most efficient development experience and feedback loop.

As a team, we try to create mocks of native functionality to allow it to be easily tested within the browser. This is not always possible and we are forced to either open an emulator or deploy to a device to continue testing. Push notifications on iOS, for example, have to be tested on real devices.

Ionic does support live reload by running either **ionic cordova run android -l** or **ionic cordova run ios -l**.

The experience is still not as responsive as the browser. Although, this experience has improved significantly over the last year.

#### How it works

The Ionic DevApp works by installing it on your [iOS](https://itunes.apple.com/us/app/ionic-devapp/id1233447133?mt=8) and [Android](https://play.google.com/store/apps/details?id=io.ionic.devapp&hl=en) device. Your device will need to be on the same network as your development machine and you will need to sign into the app using your Ionic account.

Ionic DevApp will listen in real time for Ionic builds running and will update when you make any changes.

All it takes is the usual **ionic serve** for this to work.

#### Some glitches

I decided to give this a shot on both iOS and Android to see what the experience is like.

When I tried running it to test an existing project I got no visual confirmation on the two phones I was using for testing. The application I was using pegged at **ionic-angular 3.6.0** for the time being as the update to 3.7.0 would take additional work on our end.

I then ran **npm install -g ionic** but that didn’t help either.

To see if my project was the issue I decided to create a new project with **ionic start**.

This did not work either.

The test application would build and provide feedback via the CLI but zero feedback on either of the mobile devices I was using.

I then restarted both devices and was greeted with a list of applications running on my dev machine.

iOS was working without issue but Android gave me a white-screen-of-death. I was able to run the application that I was initially wanting to, so the older version of **ionic-angular** does not appear to be an issue. At the time of writing, I believe Ionic DevApp on Android is a slightly older version in comparison to iOS so this will hopefully be resolved in future.

#### Looking much better

Moving around the application felt as fluid as normal on iOS. Running the application via Ionic DevApp did not appear to result in any performance hit.

Making changes to my codebase and saving resulted in an immediate update on the listening device. The interface displays the same *Building…* loader as shown when using live reload on via ionic cordova.

One of the major features missing from Ionic DevApp is the ability to debug the running applications. I tried to do this via Chrome Inspect but no connection was picked up.

I’m under the impression that you cannot debug applications that have been signed and deployed so I don’t see how they can resolve this in the future.

A further issue that I have not had a chance to test is how Ionic DevApp handles multiple developers working on the same project on the same WiFi network.

They mentioned the app was built using the app in their release notes so I suspect the app is smart enough to pick up specific dev machines and builds?

You can view the supported native plugins [here](http://ionicframework.com/docs/pro/view.html#plugin-support). There is a lot of plugins supported which is really positive. This should provide a large amount of coverage for most use cases.

Firebase Push Notifications are not supported but that’s not too surprising.

#### In closing

[Josh Morony](https://medium.com/@joshuamorony) has blogged about Ionic DevApp and some of its limitations after his testing on his [blog](https://www.joshmorony.com/live-reload-across-multiple-devices-with-ionic-devapp/). He some good insights into some of the apps pros and cons.

Overall, barring the glitches in getting it set up, this has left me pretty excited for the future. The ability to have a body of test devices updating live while developing will result in better quality products. I believe this is a huge step forward for mobile application development.

Hat tip to the Ionic team for another great release!

<a href="//pluralsight.pxf.io/c/1384273/431407/7490"><img src="//a.impactradius-go.com/display-ad/7490-431407" border="0" alt="" width="728" height="90"/></a><img height="0" width="0" src="//pluralsight.pxf.io/i/1384273/431407/7490" style="position:absolute;visibility:hidden;" border="0" />
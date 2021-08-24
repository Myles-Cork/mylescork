---
title: "Noise Fighter Android App"
excerpt: "Automatic volume control app"
category:
  - Mobile App Development
  - Android Studio
  - Graphic Design
  - Inkscape
layout: single
classes: wide
header:
  teaser: /assets/images/portfolio/PNG/2021_08_24_NoiseFighterIcon.png
gallery:
  - url: /assets/images/portfolio/JPEG/2021_08_24_NoiseFighterCMYO.jpg
    image_path: assets/images/portfolio/JPEG/2021_08_24_NoiseFighterCMYO.jpg
  - url: /assets/images/portfolio/JPEG/2021_08_24_NoiseFighterEvergreen.jpg
    image_path: assets/images/portfolio/JPEG/2021_08_24_NoiseFighterEvergreen.jpg
  - url: /assets/images/portfolio/JPEG/2021_08_24_NoiseFighterAncient.jpg
    image_path: assets/images/portfolio/JPEG/2021_08_24_NoiseFighterAncient.jpg
  - url: /assets/images/portfolio/JPEG/2021_08_24_NoiseFighterEngineer.jpg
    image_path: assets/images/portfolio/JPEG/2021_08_24_NoiseFighterEngineer.jpg
  - url: /assets/images/portfolio/JPEG/2021_08_24_NoiseFighterRGBY.jpg
    image_path: assets/images/portfolio/JPEG/2021_08_24_NoiseFighterRGBY.jpg
  - url: /assets/images/portfolio/JPEG/2021_08_24_NoiseFighterBrightOrange.jpg
    image_path: assets/images/portfolio/JPEG/2021_08_24_NoiseFighterBrightOrange.jpg
  - url: /assets/images/portfolio/JPEG/2021_08_24_NoiseFighterBrightCyan.jpg
    image_path: assets/images/portfolio/JPEG/2021_08_24_NoiseFighterBrightCyan.jpg
  - url: /assets/images/portfolio/JPEG/2021_08_24_NoiseFighterOriginal.jpg
    image_path: assets/images/portfolio/JPEG/2021_08_24_NoiseFighterOriginal.jpg
---

<figure class="align-center" style="display: block; width: 50%;">
	<a href="/assets/images/portfolio/PNG/2021_08_24_NoiseFighterFeature2.png"><img src="/assets/images/portfolio/PNG/2021_08_24_NoiseFighterFeature2.png"></a>
</figure>

An Android app that automatically controls an android phone's volume based on ambient noise.

I got the idea while bike riding with bone conduction headphones, as I found myself changing my phone's volume while riding at different speeds or in different locations due to wind/ambient noise. I also didn't want to just set it to a high volume all of the time because it was annoying whenever I stopped to have the music much louder than it needed to be. I also didn't like the fact that I had to take a hand off of the bike to reach to my phone's volumes buttons as it made me less stable and removed some of my attention from biking. I wanted a hands free and automatic way to change the volume based on either noise or speed. In the end I chose to focus on noise, as this would make it useful for more than just biking, and also not require GPS or internet connection to use. I also wanted to make it work in the background, which required learning more about the Android activity lifecycle and how to use notifications to keep services from being destroyed.

The name "Noise Fighter" is loosely based on the saying "fighting fire with fire", since the app's purpose is to "fight noise with noise". The app icon is a fighter jet mixed with a speaker.

The app uses the Android MediaRecorder class to get the phone's current mic audio amplitude, scales based on the scaling value and scale type, adds it to an array of the past 100 values, averages it with an exponential rolling average (calculated with the sensitivity value) to reduce noise, and then calculate the new volume using the max an min volume inputs, and then sets the volume of the phone with the AudioManager class.

The main part of the app's UI is a graph of ambient noise smoothed and scaled, with the horizontal axis being time and the vertical axis being the phone's volume settings from 0 to its maximum (changes based on phone).

<figure class="align-center" style="display: block; width: 50%;">
	<a href="/assets/images/portfolio/JPEG/2021_08_24_NoiseFighterEvergreen.jpg"><img src="/assets/images/portfolio/JPEG/2021_08_24_NoiseFighterEvergreen.jpg"></a>
</figure>

There are 5 parameters for the user to change.
 - Scale: Scales the microphone input.
 - Sensitivity: Effects the rate the smoothed audio graph changes in response to changes in the audio input (and the phone's volume if auto control is on).
 - Minimum Volume: Sets the lower limit of the range of volume the app can reach.
 - Maximum Volume: Sets the upper limit of the range of volume the app can reach.
 - Scale Type: Scales the input amplitudes either linearly or logarithmically.

I started this app as a tool for just me to use, but decided it would be good to also publish it on the Google Play Store and see if I could implement microtransactions using the Google Play Billing Library. I published it as a free app with one in app purchase to upgrade it to the full version. The free version limits the maximum volume setting to 66%, while the full version enables full volume control and gives access to different colors/themes.


## Screenshots:
{% include gallery %}

## Link to Google Play Store
Coming Soon!

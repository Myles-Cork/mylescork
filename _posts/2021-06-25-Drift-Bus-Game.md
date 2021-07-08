---
title: "Drift Bus Game"
excerpt: "Mobile game for IOS and Android"
category:
  - Mobile App Development
  - Unity
  - 3D Animation
  - Video Compositing
  - Graphic Design
  - Music Production
  - Blender
  - DaVinci Resolve
  - Krita
  - Inkscape
layout: single
classes: wide
header:
  teaser: /assets/images/portfolio/PNG/2021_06_25_DriftBusIcon.png
gallery0:
  - url: /assets/images/portfolio/PNG/2021_06_25_DBGScreenshot2.png
    image_path: assets/images/portfolio/PNG/2021_06_25_DBGScreenshot2.png
    alt: "Mountains 1"
  - url: /assets/images/portfolio/PNG/2021_06_25_DBGScreenshot3.png
    image_path: assets/images/portfolio/PNG/2021_06_25_DBGScreenshot3.png
    alt: "Mountains 2"
  - url: /assets/images/portfolio/PNG/2021_06_25_DBGScreenshot4.png
    image_path: assets/images/portfolio/PNG/2021_06_25_DBGScreenshot4.png
    alt: "City 1"
  - url: /assets/images/portfolio/PNG/2021_06_25_DBGScreenshot5.png
    image_path: assets/images/portfolio/PNG/2021_06_25_DBGScreenshot5.png
    alt: "City 2"
  - url: /assets/images/portfolio/PNG/2021_06_25_DBGScreenshot6.png
    image_path: assets/images/portfolio/PNG/2021_06_25_DBGScreenshot6.png
    alt: "Ocean 1"
  - url: /assets/images/portfolio/PNG/2021_06_25_DBGScreenshot7.png
    image_path: assets/images/portfolio/PNG/2021_06_25_DBGScreenshot7.png
    alt: "Ocean 2"
gallery1:
- url: /assets/images/portfolio/PNG/2021_06_25_DBGScreenshot1.png
  image_path: assets/images/portfolio/PNG/2021_06_25_DBGScreenshot1.png
  alt: "Menu"
- url: /assets/images/portfolio/PNG/2021_06_25_DBGScreenshot8.png
  image_path: assets/images/portfolio/PNG/2021_06_25_DBGScreenshot8.png
  alt: "Statistics"
---

<figure class="align-center" style="display: block; width: 50%;">
	<a href="/assets/images/portfolio/PNG/2021_06_25_DBGFeatureGraphic.png"><img src="/assets/images/portfolio/PNG/2021_06_25_DBGFeatureGraphic.png"></a>
</figure>

A mobile game I made with the Unity game engine. I created all of the assets including the models, textures, C# scripts, and music. Released on the Apple App Store and Google Play. The following is about version 1.

The goal of the game is to get a high score while drifting to conserve fuel and increase speed. The player loses by falling off the side of the road or running out of fuel.

## Trailer:
<iframe width="560" height="315" src="https://www.youtube.com/embed/d0pVvZUVVq0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
Made with video captured in the Unity engine and editied in Davinci Resolve. Features a cut down version of the track [WAY2DRIFT](/music%20production/3d%20animation/video%20compositing/graphic%20design/garageband/blender/davinci%20resolve/inkscape/Drift-Bus-Game-Music-WAY2DRIFT/).


# Features:
- Randomly generated levels
  - Three locations
  - Four road types
- Color changing texture-based and vertex displacement shader
- Two touch controls
- Speed-based music system
- 3D menu with a moving camera
  - Score system and Statistics page
  - Settings page



## Random Level Generation
The roads are made up of sections of Bezier curve based segments and shorter "special segments" that have terrain features attached (mountains, tunnels, islands, etc.). Meshes for the randomly generated sections are generated when the level loads. There are four types of road, listed in order of difficulty:

- Curbed
- Concave
- Flat
- Convex

The game randomly chooses which road type based on the current level the player is on, raising the probability of the harder road types with each level passed. Difficulty is reset between runs.

There are three level locations:

- Mountains
- City
- Ocean

Each level location has unique special segments and "ground scatter". Ground Scatter, or scenery that isn't part of the road, is randomly placed along the sides of the road in a way to prevent intersecting with the road.

{% include gallery id="gallery0" %}

## Shader
The game's main shader was made using the unity shader graph editor. It allows for the interpolation between two textures containing the colors of each asset, which gives the impression that the lighting of the scene is changing, when its only the colors of the textures.

One challenge I encountered was showing the player the position and direction of the bus on the road, as well as the upcoming sections in the distance with the same camera view. Top down would be ideal for showing the direction and positioning of the bus on the road, but would have limited the player's ability to see upcoming turns. A forward facing third person view would either be too low or far away to show the bus's position and direction well, or have too large of a field of view to show the road in the distance. To help solve this, the shader also displaces the vertices of meshes based on the camera's location, as if it were on the top of a hill. This gives the player both an almost top-down view of the bus and a forward facing view of the road ahead without making the camera's field of view too wide.

## Controls
Intending the game for mobile applications, I wanted to create a simple set of controls that didn't require an on screen layout of buttons. I decided on splitting the screen into two regions, left and right, and using them as two inputs in a finite state machine with 7 states that determines the way the bus moves.
The states are:
- Idle
- Left Held
- Right Held
- Wide Left Drift
- Wide Right Drift
- Small Left Drift
- Small Right Drift

Here is the rough sketch of the finite state machine that I made when I first thought up the control scheme:

<figure class="align-center" style="display: block; width: 50%;">
	<a href="/assets/images/portfolio/JPEG/2021_06_25_DBGControlFSMSketch.jpg"><img src="/assets/images/portfolio/JPEG/2021_06_25_DBGControlFSMSketch.jpg"></a>
</figure>

## Speed Based Music System
The game conveys a sense of speed to the player through visual effects, such as the delayed camera movement and speed lines, as well as dynamic music. The main theme for the game is a eurobeat-style looping track I composed called WAY2DRIFT. I made three versions of the track, which are audibly mixed in and out based on the players current speed at the end of a loop. The first loop contains a basic drumbeat and two synth pads and is audible for every speed. The second contains more drums and synth pads, as well as the bass and becomes audible when the player's speed is above 70mph. The third contains the lead synth, and becomes audible when the player's speed is above 100mph.


### Full version of WAY2DRIFT:
<iframe width="560" height="315" src="https://www.youtube.com/embed/3ugWOGQr02Y" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
[More about how I made the music and visualizer](/music%20production/3d%20animation/video%20compositing/graphic%20design/garageband/blender/davinci%20resolve/inkscape/Drift-Bus-Game-Music-WAY2DRIFT/)

## 3D Menu with Moving Camera
The main menu uses unity's cinemachine package for interpolating camera positions. The game saves statistics such as the player's high score and total number of drifts, which can be viewed on the statistics page. The save data is stored on the player's device, along with their preferred settings.

{% include gallery id="gallery1" %}

# Links:


<a href="https://apps.apple.com/us/app/drift-bus/id1573166444?itsct=apps_box_badge&amp;itscg=30200" style="display: block; overflow: hidden; border-radius: 13px; width: 250px; height: 83px; margin-left: auto; margin-right: auto;"><img src="https://tools.applemediaservices.com/api/badges/download-on-the-app-store/black/en-us?size=250x83&amp;releaseDate=1624579200&h=c72a49f19ce94bdf1477634fd665d283" alt="Download on the App Store" style="border-radius: 13px; width: 250px; height: 83px;"></a>

<a href='https://play.google.com/store/apps/details?id=com.MylesCork.DriftBus&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1'><img alt='Get it on Google Play' src='https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png' style="display: block; width: 284px;  margin-left: auto; margin-right: auto;"></a>

App Store and the Apple logo are trademarks of Apple Inc.

Google Play and the Google Play logo are trademarks of Google LLC

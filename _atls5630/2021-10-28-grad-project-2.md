---
title: "Graduate Project Milestone 2"
excerpt: "Graduate Project Prototype"
layout: single
author_profile: false
related: false
share: false
---

## Project Description:
A web page that allows a user to lookup a city, shows the location of the city on a 3D model of the Earth, and gives time and weather information about the city.

## [Mockup](https://creative.colorado.edu/~myco6347/fwd/Projects/GradProjectm2/)

## Process:

I used code from my Lab 5 for weather retrieval, and my orthoViewer module I made from Project 1 as a base for the 3D view of the globe. I started with a centered blue sphere with a smaller red sphere on its surface to test the camera controls and get the scaling of the Three.js canvas and renderer correct. The red sphere would later become the marker for the city looked up by the user.

<figure class="align-center">
	<a href="/assets/images/atls5630/gradprojectm1progress1.JPG"><img src="/assets/images/atls5630/gradprojectm1progress1.JPG"></a>
  <figcaption></figcaption>
</figure>

I found and edited a texture for the globe ([August, Blue Marble Next Generation](https://visibleearth.nasa.gov/images/74117/august-blue-marble-next-generation/74119l)):
<figure class="align-center">
	<a href="https://eoimages.gsfc.nasa.gov/images/imagerecords/74000/74117/world.200408.3x5400x2700.png"><img src="/assets/images/atls5630/world.200408.3x5400x2700.png"></a>
  <figcaption>Original image</figcaption>
</figure>

<figure class="align-center">
	<a href="/assets/images/atls5630/world.200408.3x5400x2700edit2.png"><img src="/assets/images/atls5630/world.200408.3x5400x2700edit2.png"></a>
  <figcaption>Shifted (so the prime meridian is on the right and left of the texture, making it easier to convert latitude and longitude to coordinates on the texture) and reduced colors (stylistic choice)</figcaption>
</figure>

I then got the texture on the sphere following some of the shader code in [this tutorial](https://www.youtube.com/watch?v=vM8M4QloVL0) and shader importing method from [this tutorial](https://www.youtube.com/watch?v=gDQBbDlAEKs).

I made a function for converting the latitude and longitude to X Y and Z coordinates to position the red marker. I had to flip the X axis and swap the Y and Z axes to get the latitude/longitude to XYZ conversion correct. I temporarily added some extra spheres to understand the orientation of the X, Y, and Z axes in Three.js for this.

<figure class="align-center">
	<a href="/assets/images/atls5630/gradprojectm1progress2.JPG"><img src="/assets/images/atls5630/gradprojectm1progress2.JPG"></a>
  <figcaption>Red sphere = positive X, green sphere = positive Y, blue sphere = positive Z</figcaption>
</figure>

I modified the stars from the [globe shader tutorial](https://www.youtube.com/watch?v=vM8M4QloVL0) to generate in a hollow sphere around the globe and camera, so they move in the background and don't intersect with the globe or appear in-between the camera and the globe.

<figure class="align-center">
	<a href="/assets/images/atls5630/gradprojectm1progress3.JPG"><img src="/assets/images/atls5630/gradprojectm1progress3.JPG"></a>
  <figcaption></figcaption>
</figure>

I then edited some of the css.

<figure class="align-center">
	<a href="/assets/images/atls5630/gradprojectm2mockup.gif"><img src="/assets/images/atls5630/gradprojectm2mockup.gif"></a>
  <figcaption></figcaption>
</figure>


## MVP/Todo
The MVP is a web page that allows a user to lookup a city, shows the location of the city on a 3D model of the Earth, and gives time and weather information about the city. It should support both desktop and mobile devices.

Currently I have most of the user interaction done. I still need to put in code to support mobile devices, which will involve placing the globe on top of the location lookup section, and extending the globe viewer canvas downwards behind the location lookup section. I also will continue editing the style of the location lookup section, and add in some animations for the marker and globe.

---
title: "Graduate Project Milestone 3"
excerpt: "Graduate Project Prototype"
layout: single
author_profile: false
related: false
share: false
---

## Project Description:
A web page that allows a user to lookup a city, shows the location of the city on a 3D model of the Earth, and gives time and weather information about the city.

## [Complete MVP](https://creative.colorado.edu/~myco6347/fwd/Projects/GradProject/)

## Process:

I started by finalizing the style of the output of the site. Here is a sketch I made:

<figure class="align-center">
	<a href="/assets/images/atls5630/gradprojectm3sketch.png"><img src="/assets/images/atls5630/gradprojectm3sketch.png"></a>
</figure>

I ended up moving the location of the user input to the bottom.

I then got the mobile version working. This was difficult as I had to resize the Three.js camera and renderer to cover the lower half of the window, which required a few attempts to get right and also the removal of scrolling. Also, the text would sometimes get cut off if the window was too short, so I made only the text section scrollable using ```overflow-y: auto;```.

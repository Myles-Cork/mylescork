---
title: "Graduate Project Milestone 1"
excerpt: "Graduate Project Plan"
layout: single
author_profile: false
related: false
share: false
gallery:
  - url: /assets/images/atls5630/gpprojectsketch(1).jpg
    image_path: assets/images/atls5630/gpprojectsketch(1).jpg
    title: "Desktop Layout"
  - url: /assets/images/atls5630/gpprojectsketch(2).jpg
    image_path: assets/images/atls5630/gpprojectsketch(2).jpg
    title: "Mobile Layout"
---

## Project Description:

### Inspiration:
After getting Three.js working for project 1 and wanting to use it more, I was thinking of making something with more user interaction and that makes use of some more of the library's functionality (like textures and shaders). While working with OpenWeatherMap for Lab 5, I saw that the responses include latitude and longitude information, which made me think of plotting the locations of cities on a 3D globe.

### Goal:
A web page that allows a user to lookup a city, shows the location of the city on a 3D model of the Earth, and gives time and weather information about the city.

### Target Audience:
People interested in looking up cities and getting a visualization of where they are, as well as general weather and time information.

## Wireframe:

{% include gallery %}

## Libraries/APIs/Sources Needed:
I plan on using Three.js to display the 3D model of the Earth, and the OpenWeatherMap API to look up cities and get information about them such as the latitude, longitude, time, and current weather.

I have used Three.js before for Project 1, and have used OpenWeatherMap for Lab 5.

For converting latitude and longitude to x,y,z coordinates, I plan on converting the latitude longitude returned from OpenWeatherMap to ECEF coordinates as explained [here](https://en.wikipedia.org/wiki/Geographic_coordinate_conversion), although I will assume that the earth is a sphere (semi-major axis = semi-minor axis) with uniform height/radius as the 3D model I will use will be a sphere.

I will also need a map of the earth that I can use as a texture on the 3D globe.

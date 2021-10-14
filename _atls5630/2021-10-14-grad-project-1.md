---
title: "Graduate Project Milestone 1"
excerpt: "Graduate project plan"
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
A website that allows a user to lookup a city and shows the location of the city on a 3D model of the Earth, and gives time and weather information about the city.

## Wireframe:

{% include gallery %}

## Libraries/API's Research:
I plan on using Three.js to display the 3D model of the Earth, and the OpenWeatherMap API to look up cities and get information about them such as the latitude, longitude, time, and current weather.

I have used Three.js before for Project 1, and have used OpenWeatherMap for Lab 5.

For converting latitude and longitude to x,y,z coordinates, I plan on converting latitude longitude coordinated to ECEF coordinates as explained [here](https://en.wikipedia.org/wiki/Geographic_coordinate_conversion), although I will assume that the earth is a sphere (semi-major axis = semi-minor axis) with uniform height/radius as the 3D model I will use will be a sphere.

---
title: "Terrain Visualization"
excerpt: "Terrain visualizer written in C with OpenGL and SDL 2"
category:
- OpenGL
- Computer Graphics
- 3D Animation
layout: single
classes: wide
header:
  teaser: /assets/images/portfolio/GIF/2021_12_11_terrvisplacement.gif
---

A scene of a tents in a valley at dusk and night. Written in C using OpenGL and SDL 2.

Textures a terrain generated from a height map with grass and rock based on incline. Allows the user to place and remove objects and light sources on the terrain.

# Demo Video

<iframe width="560" height="315" src="https://www.youtube.com/embed/r0K9M9pK4SQ " title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

# Features

## Camera controls

The camera looks at a point. Both that camera and look-at point can be translated in 3 axis, and the camera can be rotated about the look-at point.

<figure class="align-center">
	<a href="/assets/images/portfolio/GIF/2021_12_11_terrviscam.gif"><img src="/assets/images/portfolio/GIF/2021_12_11_terrviscam.gif"></a>
  <figcaption></figcaption>
</figure>

## Terrain Generation and Rendering

<figure class="align-center">
	<a href="/assets/images/portfolio/JPEG/2021_12_11_terrainvisopen.JPG"><img src="/assets/images/portfolio/JPEG/2021_12_11_terrainvisopen.JPG"></a>
  <figcaption></figcaption>
</figure>

On start up, the program reads in a 512x512 .bmp and converts its red channel to heights and then generates vertex positions. It then uses the generated vertex positions to calculates surface normals, and then smooths them (for smoother lighting).

Uses a custom per-pixel shader for the terrain, which samples from two textures (grass and rock), and mixes them on the normal pixel/fragment. If the dot product of the normal and the up vector of the scene is large, then the shader uses more of the grass texture's color (more horizontal area of terrain). If the dot product is small, then the shader uses more of the rock texture's color (steep slope, more vertical terrain).


## Placeable Objects

5 types of objects can be placed on the terrain (triangle tent, domed tent, tree, grass tuft, lamp) and each can be automatically rotated based on the terrain's slope/normals, and/or with a manual rotation by the user. They are all placed based on the mouse pointer's position on the terrain, and can be removed by proximity to the mouse or based on the last object placed. Lamps are a special case, and cannot be removed by proximity or by the last object placed, and instead by reducing their brightness to a set minimum.

The triangle tent, domed tent, tree, and lamp are rendered using OpenGL's fixed pipeline, while the grass uses a custom shader that discards the dark areas of a grass tuft on a black background texture, leaving just the blades of grass.

<figure class="align-center">
	<a href="/assets/images/portfolio/GIF/2021_12_11_terrvisplacement.gif"><img src="/assets/images/portfolio/GIF/2021_12_11_terrvisplacement.gif"></a>
  <figcaption></figcaption>
</figure>

In order to find the location of the mouse pointer on the terrain, the terrain is first rendered with no textures, lighting, fog or other objects. The base color of each vertex is decided based on its location in the heightmap, with the y axis corresponding to the green channel and x axis corresponding to the red channel. Once the terrain is rendered with the red and green colors, the color of the pixel at the mouse pointer is found, and then translated back into an index in heightmap and the stored vertex location and normal arrays. Once the mouse location is found, the scene is re-renderd with all of the objects, textures and lighting. Below shows how the terrain is rendered in the first pass to find the mouse position, but note that the objects would not be present until the second pass and are there for demonstration.

<figure class="align-center">
	<a href="/assets/images/portfolio/JPEG/2021_12_11_terrainvisplacement.JPG"><img src="/assets/images/portfolio/JPEG/2021_12_11_terrainvisplacement.JPG"></a>
  <figcaption></figcaption>
</figure>


<figure class="align-center">
	<a href="/assets/images/portfolio/GIF/2021_12_11_terrvisplacementcolor.gif"><img src="/assets/images/portfolio/GIF/2021_12_11_terrvisplacementcolor.gif"></a>
  <figcaption></figcaption>
</figure>


## Moveable Lights and Brightness

<figure class="align-center">
	<a href="/assets/images/portfolio/JPEG/2021_12_11_terrainvis1.JPG"><img src="/assets/images/portfolio/JPEG/2021_12_11_terrainvis1.JPG"></a>
  <figcaption></figcaption>
</figure>

<figure class="align-center">
	<a href="/assets/images/portfolio/JPEG/2021_12_11_terrainvis1dark.JPG"><img src="/assets/images/portfolio/JPEG/2021_12_11_terrainvis1dark.JPG"></a>
  <figcaption></figcaption>
</figure>

The custom shaders for the terrain and grass support 4 lights with attenuation. Changing the brightness of the moveable lights increases their linear attenuation factor, while changing the brightness of the main light changes it's color (as it doesn't use attenuation). A moveable lamp can be removed by reducing it's brightness down to a set minimum.


## Fog Distance and Color
<figure class="align-center">
	<a href="/assets/images/portfolio/GIF/2021_12_11_terrvisfog.gif"><img src="/assets/images/portfolio/GIF/2021_12_11_terrvisfog.gif"></a>
  <figcaption></figcaption>
</figure>

Fog distance can be changed by the user. Fog color changes with the main might's brightness.

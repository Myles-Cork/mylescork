---
title: "Spray Paint Simulator"
excerpt: "Spray painting simulation set in an alleyway"
category:
  - OpenGL
  - Computer Graphics
  - 3D Animation
  - Blender
  - Photoshop
layout: single
classes: wide
header:
  teaser: /assets/images/portfolio/PNG/2022_04_28_SprayPaintSim.png
---

A spray painting simulation set in an alleyway. Written in C using OpenGL and SDL2.

## Initial Attempt - Particles

The main goal for this project was to create a spray painting effect, that could be used to apply color to multiple different types of objects in a way that mimicked spray paint.
My first attempt for this was based on the idea that spray paint is made up of many particles that are sprayed in a cone like distribution. It involved a particle system using a compute shader to handle the motion and collisions of particles with objects. Below is a test of this system.

<figure class="align-center" style="display: block; width: 50%;">
	<a href="/assets/images/portfolio/GIF/2022_04_28_ParticlePaintTest.gif"><img src="/assets/images/portfolio/GIF/2022_04_28_ParticlePaintTest.gif"></a>
</figure>

### Issues

For this system to work, there must be many individual paint particles, each requiring their location and possible collisions with objects to be calculated every frame. This also means that every object in the scene must be defined in a way that can be checked for collisions. Collisions with more primitive objects, like infinite planes (like the one in the test above) or spheres are simple to calculate, but calculating collisions with more complex objects could require calculating collisions with the individual triangles that make up the objects' meshes. The test above was struggling with just one infinite plane, so I decided that my next attempt would need to limit the number of calculations for collisions, possibly by using only a few primitive shapes, like infinite planes and spheres for all objects, or remove the need for collisions entirely.

The number of particles was also an issue with the first attempt. Many small particles were required so that the paint looked natural. If there were too few particles, the paint spray pattern would look inconsistent, and too many would slow the simulation down and greatly limit the amount of time the spray paint could be sprayed. If the particles were too small, it would be hard to get a consistent spray pattern without larger numbers of particles, and if the particles were too big, there would be obviously large spots of paint and a lack of control over the size of the paint spray.

### Revised Goals

I decided that I would need to find another way to create the effect, and started by defining the qualities of spray paint I found most important to replicate in the simulation. Here are those in order of importance.

1. Consistent pattern - The pattern of paint on the objects should be as close to a soft circular shape.

2. Size and opacity is controlled by distance - The distance from the source of the paint and the object it is applied to should effect the size and opacity of the spray. Shorter distances should create smaller and more intense paint marks, while longer distances should create larger and softer areas of paint.

3. Shape is controlled by angle - The shape of the paint mark should be effected by the angle it is sprayed at the surface. Paint sprayed along the normal to a surface (directly at it) should be circular, while paint sprayed almost parallel to a surface should appear more elongated like an ellipse or the inside of a parabola.

4. Covers anything - Paint should be able to cover any object, regardless of the complexity of the object's surface.

5. Hits what is visible to the source:
  1. Paint should only be applied to the faces of an object facing towards the source of the paint.
  2. Paint is blocked by the first object it hits and shouldn't be applied to anything behind the first surface it hits.

With these points in mind, I realized some more of the limitations of the first attempt, and started to think up a way to redefine a paint "spray" as a single thing instead of a collection of individual particles.

## A New Method - Spotlights

After stepping back and thinking over the qualities I was aiming to replicate in my paint system, I realized that many of them were similar to the qualities of a spotlight. I decided to make a new system for applying paint to objects that involved representing individual paint bursts as "rays", which in close groups could approximate continuous paint marks. The staring time, location, direction, and color for all of these rays would be passed to the fragment shader of the paintable objects to apply the paint based on a spotlight-like equation.

This is the system I ended up using for the final version. I also added a particle system using geometry shader with textures for the visual look of the paint cloud. The result of the paint ray system satisfies most of the qualities of spray paint I wanted to replicate i.e.:

1. Has a consistent pattern (a soft circle along the ray). <figure class="align-center"><a href="/assets/images/portfolio/GIF/2022_04_28_SpotlightCircle.gif"><img src="/assets/images/portfolio/GIF/2022_04_28_SpotlightCircle.gif"></a></figure>

2. Opacity and size is controlled by distance (the further the surface is along the ray, the less opaque and larger in size the paint mark is). <figure class="align-center"><a href="/assets/images/portfolio/GIF/2022_04_28_SpotlightDistance.gif"><img src="/assets/images/portfolio/GIF/2022_04_28_SpotlightDistance.gif"></a></figure>

3. Paint mark elongates when sprayed at an angle to (not along the normal of) the surface. <figure class="align-center"><a href="/assets/images/portfolio/GIF/2022_04_28_SpotlightAngle.gif"><img src="/assets/images/portfolio/GIF/2022_04_28_SpotlightAngle.gif"></a></figure>

4. Can cover any object. <figure class="align-center"><a href="/assets/images/portfolio/GIF/2022_04_28_PaintEverything.gif"><img src="/assets/images/portfolio/GIF/2022_04_28_PaintEverything.gif"></a></figure>

5. Paint is applied to faces facing towards the paint source only. <figure class="align-center"> <a href="/assets/images/portfolio/GIF/2022_04_28_PaintFront.gif"><img src="/assets/images/portfolio/GIF/2022_04_28_PaintFront.gif"></a></figure>

However, it didn't satisfy quality 5.2 (paint being blocked by objects) as without collisions or any depth calculation, the paint is applied to all objects along the paint ray's path. Another limitation of this method is that all object must remain stationary in the scene, as the paint ray's are stationary and in every frame their paint is "cast" like a light source, so paint will not remain stuck to the objects if they move away, and will be applied if any other objects move into the path of the paint ray. A possible work around for this would be to bake the paint color to the object's texture buffer, removing the need for multiple spotlight-like paint rays and allowing for moving objects. This would add additional limitations to the program, requiring each object to have a non-overlapping UV map, and each copy of an object to have it's own texture so that paint isn't magically copied between all objects with the same texture.


### Some Specifics

There is a set limit on the number or rays, 2048. Each ray has a color (vec4), starting position (vec4), a direction (first three floats in a vec4), and start time (the last float in the direction vec4). The purpose of the start time is to tell the shader which rays should apply paint. Rays with negative times or future times will not be applied, while rays with non-negative times less than the current time of will apply paint. In the version of the project demonstrated, the start time is used as an on/off, as rays have their times initialized to -1 and then changed to the current time once used, although I could see a possible extension using the start time as a way to record and then playback a painting session. Once all rays are used up, it will start to overwrite/reuse older rays. It takes about a minute of spraying paint at 30fps to start reusing rays.

The rays are passed to the shader with a shader storage buffer. When initialized, all of the data for the 2048 paint rays is copied over at once. To prevent recopying all the data and rewriting the entire buffer every time one paint ray changes, the data for individual rays is updated using the "glBufferSubData" function when needed.

<figure class="align-center">
	<a href="/assets/images/portfolio/GIF/2022_04_28_Colors.gif"><img src="/assets/images/portfolio/GIF/2022_04_28_Colors.gif"></a>
</figure>

The paint cloud particle system is made up of a particle system that uses a geometry shader to turn each particle into a billboard, which then has a texture applied and colored with the current paint color passed as a uniform.

I made the scene in Blender, and the textures in Photoshop using a few textures and texture packs I found online.

<figure class="align-center">
	<a href="/assets/images/portfolio/PNG/2022_04_28_Blender.png"><img src="/assets/images/portfolio/PNG/2022_04_28_Blender.png"></a>
  <figcaption>Alleyway scene in Blender</figcaption>
</figure>

I used SDL2's audio mixers to play the ambient city sounds and spray sound effect. I found the sound effects online and edited them with Audacity.

#### Texture Sources:
- [Bricks](https://www.swtexture.com/2013/04/brick-textures-large.html)
- [Ground](https://www.swtexture.com/search/label/Ground%20Textures?&max-results=2)
- [Walls](https://www.swtexture.com/search/label/Various%20Wall%20Finishes?updated-max=2020-05-28T10%3A39%3A00-07%3A00&max-results=2#PageNo=2)
- [Doors, Windows, and Misc Features](https://opengameart.org/content/urban-jungle)
- [Dumpster Sides](https://www.textures.com/browse/garbage-containers/2534)[, Lid](https://www.textures.com/browse/plastic/33556)

#### Sound Effect Sources:
- [Spray Can](https://www.zapsplat.com/music/aerosol-can-empty-spray-just-air-2/)
- [Ambient City Sound Loop](https://freesound.org/people/knufds/sounds/345948/)

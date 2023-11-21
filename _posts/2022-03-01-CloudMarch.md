---
title: "Cloud GLSL Shader"
excerpt: "Procedural cloud texture using 3D noise"
category:
  - Computer Graphics
  - 3D Animation
layout: single
classes: wide
header:
  teaser: /assets/images/portfolio/GIF/2022_03_01_CloudMarch_5.gif
---

<figure class="align-center">
	<a href="/assets/images/portfolio/GIF/2022_03_01_CloudMarch_1.gif"><img src="/assets/images/portfolio/GIF/2022_03_01_CloudMarch_1.gif"></a>
</figure>

Shader for a cloud effect programmed in C and GLSL using OpenGL 3.

My goal was to make closed meshes appear like clouds using GLSL vertex and fragment shaders and the concept of raymarching.
The process I used to render the cloud effect has two main steps:

1. Draw everything in the scene except the cloud object to a framebuffer
2. Draw everything in the scene again, but this time with the back faces of the clouds included. Only write the depths as floats to a buffer.
3. Pass the cloud shader program the depth buffer. Draw the cloud objects with the cloud shader. The cloud shader samples from a 3D noise texture, accumulating color as it steps from the front face to the back face of the object. Blend the result of the draw with the first framebuffer ("screen" it over the previously drawn objects in step 1).

I had previously attempted this using a different method that didn't work well. My first attempt involved not using a depth buffer, and instead drawing the cloud object with each pixel of the back face drawn with it's world coordinate in x,y,z as rgb. This ended up not looking too great for a couple of reasons. The rgb values were too low of a precision, which resulted in obvious "layers" in the final render, which was made even worse since the layers were oriented in world coordinates and not camera coordinates.

Using a higher precision and camera oriented depth map improved the look greatly, and is what I ended up using in the end for the finalized shader.

<figure class="align-center" style="display: block; width: 50%;">
	<a href="/assets/images/portfolio/PNG/2022_03_01_CloudMarchMethods.png"><img src="/assets/images/portfolio/PNG/2022_03_01_CloudMarchMethods.png"></a>
  <figcaption>For the first method (demonstrated in the drawing above), the separate layers of samples were much more obvious when rotating about the cloud object, and the effect was not uniform from certain angles, especially when looking along the world axis. The second method, used for the final effect, looked much more uniform from different view angles as the layers always orient with the camera. </figcaption>
</figure>

Below is a gif of the second method, where the stepsize for the marching has been increased so the separate sample layers more visible.

<figure class="align-center">
	<a href="/assets/images/portfolio/GIF/2022_03_01_CloudMarch_6.gif"><img src="/assets/images/portfolio/GIF/2022_03_01_CloudMarch_6.gif"></a>
</figure>

I also experimented with adding shadows by accumulating the noise function towards the light position, hoping it would provide a rough estimate of how a dense cloud could cast a shadow on the rest of itself. As there wasn't a depth texture in this direction, I set a constant step count for the accumulation.

<figure class="align-center" style="display: block; width: 50%;">
	<a href="/assets/images/portfolio/PNG/2022_03_01_CloudMarchShadow.png"><img src="/assets/images/portfolio/PNG/2022_03_01_CloudMarchShadow.png"></a>
</figure>

<figure class="align-center">
	<a href="/assets/images/portfolio/GIF/2022_03_01_CloudMarch_0.gif"><img src="/assets/images/portfolio/GIF/2022_03_01_CloudMarch_0.gif"></a>
</figure>

Some more animations of the effect:

<figure class="align-center">
	<a href="/assets/images/portfolio/GIF/2022_03_01_CloudMarch_4.gif"><img src="/assets/images/portfolio/GIF/2022_03_01_CloudMarch_4.gif"></a>
  <figcaption>One limitation of the effect is that it can only work on convex meshes. In this example, when the torus is viewed from the side, the center of the appears darker than the top and bottom, when it should be the brightest part. It isn't because the backface of the hole in the center of the torus stops the marching before it can reach the other side of the torus.</figcaption>
</figure>

<figure class="align-center">
	<a href="/assets/images/portfolio/GIF/2022_03_01_CloudMarch_2.gif"><img src="/assets/images/portfolio/GIF/2022_03_01_CloudMarch_2.gif"></a>
  <figcaption>Using the same idea as my previous holepunch shader to offset the sampling of the noise and create volumetric ripples in the cloud.</figcaption>
</figure>

<figure class="align-center">
	<a href="/assets/images/portfolio/GIF/2022_03_01_CloudMarch_3.gif"><img src="/assets/images/portfolio/GIF/2022_03_01_CloudMarch_3.gif"></a>
</figure>

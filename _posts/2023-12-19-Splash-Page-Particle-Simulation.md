---
title: "Splash Page Particle Simulation"
excerpt: "Simulation of particles with gravity and collisions made with ThreeJS"
category:
  - Computer Graphics
  - 3D Animation
  - Computer Science
layout: single
classes: wide
header:
  teaser: /assets/images/portfolio/GIF/2023_12_19_Splash_Page_Particle_Sim.gif
---

<script src="https://polyfill.io/v3/polyfill.min.js?features=es6"></script>
<script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>

A simulation/visualization I made for the <a href="/">home page of my website</a>. Features spherical particles with gravity and collisions, and was designed to fit visually with my website's color scheme and with responsive web design in mind.

<object data="/assets/simulation/splash_simulation.html" style="position:relative; pointer-events: all; height:50vw; width: 100%;"></object>



# Particle Simulation
My goals for the particle simulation were to support circular/spherical particles in a 2D space, have gravity and elastic collisions between them, and have the simulation be fast enough to run on most devices. As I was making something that only needed to work for as long as people looked at the home page of my website, it would not need to run for an infinite amount of time. Because of this, perfect physics (e.g. completely elastic collisions, conservation of momentum) were not required. I also took some physics-bending artistic liberties in order to make it more interesting.

## Gravity
I used the Euler method for integrating force due to gravity over time. This choice introduced some room for error but was sufficient in this use case. An improvement would be to use Verlet integration instead. 

### Equation
The base of the equation I used for the gravity force between two particles is:

$$ F_g = \frac{G * m_1 * m_2}{d^2} $$

where $$G$$ is the gravitational constant, $$m_1$$ and $$m_2$$ are the quantities of mass for the two interacting particles, and $$d$$ is the distance between the two particle's centers.

I modified the equation slightly to reduce the maximum force and prevent the force from growing exponentially when masses overlap.

$$ F_{gm} = \frac{G * m_1 * m_2}{\max(d-(r_1+r_2)+s,s)^2} $$

$$r_1$$ and $$r_2$$ are the radii of the two interacting particles, and $$s$$ is for shifting the equation. The addition of the radii keeps the force constant when the masses overlap (when $$d<(r_1+r_2)$$), and higher values of $$s$$ reduce the maximum gravitational force and smoothen the curve over distance. Both of these help prevent intersecting particles from collapsing on each other due to the large gravitational forces.


### Extra Pulling Force
I added an extra force to keep the particles from traveling very far away from the center of the simulation:

$$ F_{wall} = \begin{cases}\frac{G * m_1}{(\max(d_{center}-d_{wall},0))^2}&d_{center} \geqq d_{wall}\\0&d_{center} \lt d_{wall}\end{cases} $$

where $$d_{center}$$ is the particle's distance from the center and $$d_{wall}$$ is the distance the force "wall" is from the center.

## Collisions

### Euler Step/Force Based
I first considered a force based approach by adding a repulsive force that would act when the particles were colliding. This had some obvious issues, as particles would often pass through each other and only occasionally seem to bounce off each other.

### Euler Step/Velocity Reflection
Then I tried to reflect the particles velocities along the vector of collision. This worked well, although required either limited particle velocity or additional simulation steps per frame in order to work well most of the time. It also would suffer from particles collapsing on each other if more than two particles collided with each other.

### Event Driven Simulation
I also considered using an event driven approach, where collisions in a given time frame are added to a priority queue based on time of collision, resolved in order of time by calculating the new particle velocities positions, and then new collisions are detected and added to the priority queue until all collisions in the time frame are resolved (look up "Event Driven Molecular Dynamics"). This approach proved to be too computationally expensive, with the possibility of reaching O($$N^2$$) number of collisions to calculate per given frame where $$N$$ is the number of particles (without complex optimizations such as sectoring).

### Combined Force Based and Velocity Reflection
The method I used for the final simulaition is based on the Euler step method, with additional simulation steps per frame and an extra repulsion force for when masses are colliding with each other.

The additional force is:

$$ F_{r} = \begin{cases}-\frac{G * m_1 * m_2}{\max(d-(r_1+r_2)+s_{rt},s_{rt}-0.1s_{rt}(r_1+r_2))^n}&d \lt r_1+r_2\\0&d \geqq r_1+r_2\end{cases} $$

where $$n$$ is the power of the denominator of the repulsion curve and $$s_{rt}=s^{\frac{2}{n}}$$ (based on the shift $$s$$ from the modified gravity force equation). This equation is loosely based on the gravity equation, but modified through experimentation until it produced an effect I wanted. The force is only active when the particles are colliding, in order to not affect the normal gravitational force.

<script src="/assets/simulation/plot_line.js" defer></script> 
<figure class="align-center" style="width:30%; float:inline-end; margin:0 0 0 2%">
  <h5 style="margin:0">Graph: Attraction Force Magnitude vs Distance Between Particle Centers</h5>
  <div  style="height:50vh; overflow:scroll; border-style:solid; border-width:1px;">
	  <canvas id = "plot" style="width:100%"></canvas>
  </div>
  <figcaption>(You may need to scroll to view the full graph) <br> Graph of the magnitude of force (y) acting on one particle due to another particle x distance away (exact scale depends on particle properties and choice of constants). <br> The x intercept is when the particles are colliding.</figcaption>
</figure>

In addition to experimenting with the repulsion equation, I also added additional artistic tweaks including making static particles (e.g. the star) impart more force on colliding particles, to prevent moving particles from grouping up on static ones.

#### Benefits
- Particles collapse into one another less than the base Euler Step/Reflect Velocity method. This is due to a limited max gravitational pull and strong repulsion when colliding (see graph).
- Not as computationally heavy and variable as the Event Driven approach.

#### Downsides
- Particles can still collapse with large masses, high gravitational constant, and/or low number of steps.
- Collisions are not perfectly elastic.

#### Possible Improvements
Besides optimizations such as remove duplicate calculations (e.g. only calculating particle pair distances once each step and storing them in an array for lookup), the physics could benefit from using Verlet integration, or an optimized Event Driven approach instead of a time-driven simulation method.

## 3D Simulation
The 2D simulation can be modified to work in three dimensions:

<object data="/assets/simulation/examplehtml/sim_3d.html" style="position:relative; pointer-events: all; height:20vw; width: 100%;"></object>

<div style="display:inline-block; width:100%;"></div>

# Visualization
The visualization was made using ThreeJS.

## Scene
The planets are represented by spheres with randomized color, mass, and size (based on mass).

The star is the static mass in the center of the simulation. Its unlit shader uses FBM (Fractal Brownian Motion noise) to generate a wavy pattern, which is then used as a value for interpolating between a dark and bright color, the bright color being the orange color used in for text on my website: <span style="color:#aa5b32">#AA5B32</span>. 

The bloom effect is a screen space created by performing multiple render passes. The first pass is rendered with only the bright objects (in this case only the star) with their normal materials and all other objects with a basic black material. I also disabled the grid object for the first pass so it wouldn't affect the bloom. The scene is then rendered normally, and finally combined with the result of the bloom pass using a mix shader. 

In the center of the star is a point light, colored to match the bright color of the star, which is used for lighting the sun facing sides of the planets and shadow casting. An additional ambient light is used to brighten the shadowed parts of the planets.

The gravity well grid is a plane geometry which is modified every frame to visualize the gravitational potential of the particles in the xy plane. It is rendered with a shader that projects a grid onto the xy plane, and makes the grid fall off at a certain distance from the center (roughly the distance of the gravity wall from the simulation). The grid is transparent, rendered double sided, and the lines are colored to match the green color I use on my website: <span style="color:#417b6d">#417B6D</span>.

The scene is rendered with a clear background by default.

## Camera
There are two control schemes for the camera, the Orbit Controls ThreeJS addon, and a mouse position-based one I made that is used on the home page.

### Orbit Controls
These controls were made using the ThreeJS Orbit Controls addon. I primarily used these when testing the visualization.
<object data="/assets/simulation/examplehtml/orbit_controls.html" style="position:relative; pointer-events: all; height:20vw; width: 100%;"></object>

### Mouse Position Controls
Although the orbit controls work well for testing, I wanted a simpler control method that was less jerky for the splash page, and also one that didn't require the scroll wheel, pinch zooming, or button presses. This control scheme is made by getting the position of the mouse in the viewer and interpolating between a set of camera and look at positions. The camera motion is smoothed by adding a fraction of distance between the positions current location and target every frame.

<style>
.grid-container {
  display: grid;
  height:30vh;
  grid-template-columns: auto 30vh auto;
}
.grid-item {
  text-align: center;
  margin: auto;
  color: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.2);
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 1;
  pointer-events: none;
  width: 50%;
  min-width: max-content;
}
</style>


<object data="/assets/simulation/splash_simulation.html" style="pointer-events:all; height:30vh; width:100%;"></object>
<div class="grid-container">
  <div class="grid-item">Far</div>
  <div class="grid-item"></div>
  <div class="grid-item">Under</div>  
  <div class="grid-item"></div>
  <div class="grid-item">Default</div>
  <div class="grid-item"></div>  
  <div class="grid-item">Top</div>
  <div class="grid-item"></div>
  <div class="grid-item">Close</div>  
</div>


#### Aspect Ratio and Angle
With responsive web design in mind, the mouse position controls also take into account the aspect ratio of the element containing them, orienting the roll of the camera so that the angle of the simulation matches the diagonal of the screen.

<div style="display: flex; align-items: center; justify-content: center;">
  <div style="display:flex; justify-content:center; overflow: auto; height:30vh; width: 20%; resize:horizontal;">
    <object data="/assets/simulation/splash_simulation.html" style="pointer-events:none; height:30vh; width:100%;"></object>
    <div style="position: absolute; align-self: center; color:#ffffff; pointer-events:none">Resize Me!</div>
  </div>
</div>


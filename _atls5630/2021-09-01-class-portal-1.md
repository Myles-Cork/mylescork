---
title: "Class Portal Milestone 1"
excerpt: "Plan for class portal"
layout: single
author_profile: false
related: false
share: false
gallery:
  - url: /assets/images/atls5630/portalsketch(1).jpg
    image_path: assets/images/atls5630/portalsketch(1).jpg
    title: "Home Page (>600px max width)"
  - url: /assets/images/atls5630/portalsketch(2).jpg
    image_path: assets/images/atls5630/portalsketch(2).jpg
    title: "Home Page (<600px max width)"
  - url: /assets/images/atls5630/portalsketch(3).jpg
    image_path: assets/images/atls5630/portalsketch(3).jpg
    title: "Lab/Project Page (>600px max width)"
  - url: /assets/images/atls5630/portalsketch(4).jpg
    image_path: assets/images/atls5630/portalsketch(4).jpg
    title: "Lab/Project Page (<600px max width)"
---

## Portal Concept
My portal site will mimic the parallax effect used on the [Firewatch website](http://www.firewatchgame.com/). The Firewatch site's parallax effect is created by 8 layers which are all translated at different rates using javascript. Each layer has parallax class and a data-speed value, and the firewizard.js file modifies each layer's css transformation3D property based on their 'data-speed' values whenever user scrolls.

Each page on my portal will have the same parallax effect, but with a different title. For smaller screens, the parallax effect will be replaced by a single image that follows the user's scrolling like normal. Since ATLS5630 is about 'designing' an 'building', I plan on making the parallax images a surreal landscape with oversized drafting and construction tools mixed in.

## Visual Design

Below are sketches of the portal site's design. Notes are in <em style="color: red">red</em>.

{% include gallery %}

## Site Structure
### File Organization:
- index.html
- style.css
- sections/
  - classLabs.html
  - projects.html


## Responsive Design Description
The parallax effect will only be active for max-device-width's greater than 600px. For smaller screens, the parallax effect will be replaced by a single image. The section bar along the top will be removed and placed at the bottom of the page when the items get too crowded.

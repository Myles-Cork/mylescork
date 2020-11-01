---
title: "Drift BUS IRL"
excerpt: "Computer animation of a bus composited with real video"
category:
  - 3D Animation
  - Video Compositing
layout: single
classes: wide
header:
  teaser: /assets/images/portfolio/GIF/2020_6_22_DriftBUS-IRL-anim.gif
gallery0:
  - url: /assets/images/portfolio/JPEG/2020_6_22_DriftBUS-IRL-blender0.jpg
    image_path: assets/images/portfolio/JPEG/2020_6_22_DriftBUS-IRL-blender0.jpg
    alt: "Scene from camera view"
  - url: /assets/images/portfolio/JPEG/2020_6_22_DriftBUS-IRL-blender1.jpg
    image_path: assets/images/portfolio/JPEG/2020_6_22_DriftBUS-IRL-blender1.jpg
    alt: "Scene from the opposite side of the overpass"
gallery1:
  - url: /assets/images/portfolio/JPEG/2020_6_22_DriftBUS-IRL.jpg
    image_path: assets/images/portfolio/JPEG/2020_6_22_DriftBUS-IRL.jpg
    alt: "Bus in shadow"
  - url: /assets/images/portfolio/JPEG/2020_6_22_DriftBUS-IRL-pillar.jpg
    image_path: assets/images/portfolio/JPEG/2020_6_22_DriftBUS-IRL-pillar.jpg
    alt: "Bus behind pillar"
  - url: /assets/images/portfolio/JPEG/2020_6_22_DriftBUS-IRL-light-and-shadows.jpg
    image_path: assets/images/portfolio/JPEG/2020_6_22_DriftBUS-IRL-light-and-shadows.jpg
    alt: "Bus in light with shadows"
---

<figure class="align-center">
	<a href="/assets/images/portfolio/GIF/2020_6_22_DriftBUS-IRL-anim.gif"><img src="/assets/images/portfolio/GIF/2020_6_22_DriftBUS-IRL-anim.gif"></a>
  <figcaption>Drift BUS IRL gif animation</figcaption>
</figure>

Above is a gif animation of the final composited video. The bus is a 3D model animated and then composited with the real video. I was aiming to make the fake bus look as realistic as possible. The animation and compositing was all done in Blender.

The footage was taken with a stationary camera pointing out of a window. I purposely made the camera stationary, as I didn't want to do motion tracking for this shot, and instead wanted to focus on accurately recreating a 3D space by projecting video onto geometry. In the #D scene, I replicated the overpass and its supports, the train (for the part at the end where the bus passes behind it), the position of the sun, and the buildings casting shadows (on the bus' path). I used fSpy to get the perspective of the camera correct.

{% include gallery id="gallery0" caption="Images of the scene in Blender" %}


The main issues I ran into while doing this were related to the quality of the original video. Blurring, color correcting, and adding noise/grain to the 3d render in a way that matched the video was very hard to do. One method that worked well was to apply a blur or grain over both the 3d animation and real video, giving both a common quality which greatly made the 3d animation and real video look more unified. I could only rely on this method until the real footage started to lose to much quality. The original footage was taken with a SLR camera not really intended for high quality video with a high dynamic range, which was a real blunder on my part that I paid for in compositing. Through working with the less than ideal footage, I had to figure out more methods that only focused on modifying the 3D render, such as applying a subtle screen-space gradient over the 3D model frames that replicated the glare and bloom qualities of the original video.

{% include gallery id="gallery1" caption="Isolated frames from the video showing the bus in shadow, behind a pillar, and in light" %}


I also made an [animated graphic](/posts/2020-06-22-Drift-BUS-Wireframe-Animation/) using Blender's freestyle export option and a [shirt design](/posts/2020-06-22-Drift-BUS-Shirt/) related to this video.


### Final video on my YouTube channel:
<iframe width="560" height="315" src="https://www.youtube.com/embed/NO3P2kM0YG4" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

Video made in Adobe Premiere with frames exported by Blender.

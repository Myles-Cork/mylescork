---
title: "Developability of Meshes in Blender"
excerpt: "Python scripts for analyzing and optimizing meshes in Blender"
category:
  - Geometry Processing
  - Blender
layout: single
classes: wide
header:
  teaser: /assets/images/portfolio/PNG/2021_04_30_DoTMCube1.png
gallery0:
  - url: /assets/images/portfolio/PNG/2021_04_30_DoTMCube1.png
    image_path: assets/images/portfolio/PNG/2021_04_30_DoTMCube1.png
    title: "Cube subdivided similarly to one in the paper. Energy heat map shader, white vertexes have higher energy and are therefore less developable. The next two images show results of optimization to minimize the energy of the whole mesh"
  - url: /assets/images/portfolio/PNG/2021_04_30_DoTMCube2.png
    image_path: assets/images/portfolio/PNG/2021_04_30_DoTMCube2.png
    title: "Cube optimized without the gradient. Optimization took ~3hrs."
  - url: /assets/images/portfolio/PNG/2021_04_30_DoTMCube3.png
    image_path: assets/images/portfolio/PNG/2021_04_30_DoTMCube3.png
    title: "Cube optimized with the gradient. Optimization took ~15sec."
gallery1:
  - url: /assets/images/portfolio/PNG/2021_04_30_DoTMBunnyVertCol1.png
    image_path: assets/images/portfolio/PNG/2021_04_30_DoTMBunnyVertCol1.png
    title: "Unoptimized bunny. White vertexes have higher energy and are therefore less developable."
  - url: /assets/images/portfolio/PNG/2021_04_30_DoTMBunnyMetal1.png
    image_path: assets/images/portfolio/PNG/2021_04_30_DoTMBunnyMetal1.png
    title: "Unoptimized bunny. Metallic shader."
gallery2:
  - url: /assets/images/portfolio/PNG/2021_04_30_DoTMBunnyVertCol2.png
    image_path: assets/images/portfolio/PNG/2021_04_30_DoTMBunnyVertCol2.png
    title: "Optimized bunny (gradient used). White vertexes have higher energy and are therefore less developable. Optimization took ~3mins."
  - url: /assets/images/portfolio/PNG/2021_04_30_DoTMMetal2.png
    image_path: assets/images/portfolio/PNG/2021_04_30_DoTMBunnyMetal2.png
    title: "Optimized bunny (gradient used). Metallic shader."
gallery3:
  - url: /assets/images/portfolio/2021_04_30_DoTMIco1.png
    image_path: assets/images/portfolio/PNG/2021_04_30_DoTMIco1.png
    title: "Unoptimized icosahedron."
  - url: /assets/images/portfolio/PNG/2021_04_30_DoTMIco2.png
    image_path: assets/images/portfolio/PNG/2021_04_30_DoTMIco2.png
    title: "Optimized icosahedron (gradient used). Note how the developability energy concentrates into a sparse set of vertex stars. Optimization took ~33sec."
---
# Description

A project for a geometry processing class where I implemented calculations and tried to optimize meshes based on the energies from the paper [“Developability of Triangle Meshes” by Oded Stein, Eitan Grinspun, and Keenan Crane](https://dl.acm.org/doi/10.1145/3197517.3201303). My implementation was written for Blender 2.91 and consists of Python scripts for preforming the energy calculation and mesh optimization in the paper.

I used the NumPy library for its matrix data structures and operations, and the SciPy library for the optimize.minimize function, which is used to optimize the vertex position of an inputted mesh with the L-BFGS-B method. SciPy is also used to solve for the eigenvalues of the normal covariance matrices. The Blender Python API’s BMesh module is used to calculate and get mesh details such as face normals, and the mesh data structure is used to update the mesh with new vertex colors and locations after performing energy calculation and optimization. The loop data structure is used to iterate over edges of faces to properly calculate the interior angles.

# Background

A developable surface is a smooth surface with straight ruling lines. Mathematically, developable surfaces are Locally isometric to the Euclidean plane, are twice differentiable (C^2) immersions, and their gauss maps are a network of curves that meet at flat regions. The paper “Developability of Triangle Meshes” formulates two energies that can be used to give a notion of the developability of a triangle mesh, and that can also be minimized to produce a developability optimized mesh (in the paper they found the L-BFGS optimization produced the best results). The first method, combinatorial width, measures the energies of each vertex by partitioning the connected faces (the vertex star) into two edge connected regions for which normal are constant. This idea of two regions where normal are constant is called a “hinge”, and if every vertex star of a mesh is a hinge, then the mesh is discrete developable. However, the calculation of this energy is computationally expensive, as it requires computing the energies of each possible grouping of triangle normals in each vertex star and finding the group with the minimum energy.

The paper presents an alternative characterization of a hinge to develop a less computationally expensive energy calculation. This characterization, used in the paper’s covariance method, defines a hinge as a vertex star that has all triangle normals contained in a common plane. The calculation of this energy for a vertex star involves calculating the covariance matrix of the face normals, and finding it’s smallest eigenvalue, which is associated with the smallest width of the vertex star’s covariance matrix.

I calculated both energies while writing my implementation, but chose to go with the covariance method as the energy when optimizing meshes as the runtime of the combinatorial energy was mush longer and produced less obvious results. I also calculated and used the gradient of the covariance energy, which helped reduced the time it took for the optimization function to converge.

# Results

The energy calculation works as expected from the paper. Vertex stars that are either flat or hinge like are given a lower energy, while others that are less hinge like are assigned higher values. The black and white meshes have their vertexes colored based the developability of the vertex's associated star.

The results replicate the expected behaviors of minimizing the energies, in that they concentrate the energy into a sparse set of edges/vertices. That said, the mesh optimization were less transformative than I expected, and the optimization takes a large amount of time to complete on larger meshes, so I had trouble testing the combinatorial method (since it was mush slower and did not have a analytical gradient).  


## Cube
{% include gallery id="gallery0" %}

## Bunny
### Unoptimized:
{% include gallery id="gallery1" %}
### Optimized:
{% include gallery id="gallery2" %}

## Icosahedron
{% include gallery id="gallery3" %}

---
title: "Crater Detection using Convolutional Neural Networks"
excerpt: "Machine learning project"
category:
  - Computer Science
layout: single
classes: wide
header:
  teaser: /assets/images/portfolio/PNG/2022_12_12_Photo_Segmented_Example.png
---

Experiments in detecting craters in lunar/Martian surface satellite imagery. Written in Python using OpenCV, Scikit Image, Keras, and Tensorflow. Class project for CSCI5622: Machine Learning at University of Colorado Boulder in Fall 2022 made in a team of 3.

## Goal

The initial goal was to provide data about the locations of craters in images, with the goal of aiding autonomous navigation of ground based vehicles. Prior research with similar goals output bounding boxes and ellipses to mark where craters were, but we decided our output should segmented images, as it would provide a more accurate representation of crater shapes and location. Our final goal was to develop a process for translating cratered surface photos into segmented crater images.

## Dataset

Our dataset consisted of ~150 images of lunar/Martian surfaces (<a href="https://www.kaggle.com/datasets/lincolnzh/martianlunar-crater-detection-dataset">link</a>), which we then manually segmented to create labels. We eventaully reduced the dataset size to remove images with artifacts, such as cropped/black regions and measurement overlays.

<figure class="align-center" style="display: block; width: 50%;">
	<a href="/assets/images/portfolio/PNG/2022_12_12_Photo_Segmented_Example.png"><img src="/assets/images/portfolio/PNG/2022_12_12_Photo_Segmented_Example.png"></a>
  <figcaption>Example pair of satellite image and segmented label.</figcaption>
</figure>

## Architecture Research

Initial investigations found a few different options . I found a paper called <a href="https://arxiv.org/abs/1505.04597">U-Net: Convolutional Networks for Biomedical Image Segmentation</a>, which is about image segmentation of cells based on cell walls. The experiment in the paper had similar dataset limitations to our project (most notably a small dataset size for training), but demonstrated the effectiveness of the U-Net architecture with those limitations. We eventually decided on U-Net due to it's effectiveness in this paper and similar research.

## Image Pre-Processing and Augmentation

In the development phase of the project, I primarily experimented with image preprocessing and augmentation. I found that a mixture of histogram equalization (to even the contrast of crater images) and Sobel edge detection (to help find the edges of craters) yielded the best results. Image Augmentation was a must due to the limited data set size, and was performed by shifting, scaling, and rotating images from the training set. Only the training set was augmented to prevent data leakage into the test set.

<figure class="align-center" style="display: block; width: 50%;">
	<a href="/assets/images/portfolio/PNG/2022_12_12_Preprocessing_Augmentation.png"><img src="/assets/images/portfolio/PNG/2022_12_12_Preprocessing_Augmentation.png"></a>
  <figcaption>Image pre-processing and augmentation steps.</figcaption>
</figure>

<figure class="align-center" style="display: block; width: 100%;">
	<a href="/assets/images/portfolio/PNG/2022_12_12_Preprocessing_Result_Comparison.png"><img src="/assets/images/portfolio/PNG/2022_12_12_Preprocessing_Result_Comparison.png"></a>
  <figcaption>Results comparison with and without preprocessing.</figcaption>
</figure>

## Poster

<figure class="align-center" style="display: block; width: 100%;">
	<a href="/assets/images/portfolio/PNG/2022_12_12_CraterDetection_Poster.png"><img src="/assets/images/portfolio/PNG/2022_12_12_CraterDetection_Poster.png"></a>
</figure>

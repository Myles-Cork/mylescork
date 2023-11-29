---
title: "Image Tag Recommendation Web App"
excerpt: "Content-based image tag recommendation system"
category:
  - Web Development
  - Computer Science
layout: single
classes: wide
header:
  teaser: /assets/images/portfolio/PNG/2023_05_04_Home_Page_5.png
---

System for recommending tags for images based on image content. Includes a React-based frontend, Flask API, and MongoDB database, contanierized with Docker. Class project for CSCI6502: Big Data at University of Colorado Boulder in Spring 2023 made in a team of 2.

<a href="https://github.com/Myles-Cork/ImageTagRecommendationApp">GitHub</a>

## Goal

The goal of this system is to aid users of a database of images by providing contextual data to image entries. With machine learning based computer vision techniques, it is possible to classify the content of images and refine a model by retraining it with new data.

My contributions were primarilly to set up the tech stack (React, Flask, MongoDB, and Docker), implement the API-Database interaction for image uploading and querying, and add image upload and basic tag selection functionality to the React app.

## Architecture

<figure class="align-center" style="display: block; width: 100%;">
	<a href="/assets/images/portfolio/PNG/2023_05_04_Tag_Recommendation_Architecture.png"><img src="/assets/images/portfolio/PNG/2023_05_04_Tag_Recommendation_Architecture.png"></a>
  <figcaption>Architecture diagram of the tag recommendation system.</figcaption>
</figure>

## Proof of Concept

<a href="https://github.com/Myles-Cork/ImageTagRecommendationApp">GitHub for proof of concept.</a>

<figure class="align-center" style="display: block; width: 100%;">
	<a href="/assets/images/portfolio/PNG/2023_05_04_Home_Page.png"><img src="/assets/images/portfolio/PNG/2023_05_04_Home_Page.png"></a>
  <figcaption>Home page menu for filtering by tag and adding new images.</figcaption>
</figure>

<figure class="align-center" style="display: block; width: 100%;">
	<a href="/assets/images/portfolio/PNG/2023_05_04_Home_Page_1.png"><img src="/assets/images/portfolio/PNG/2023_05_04_Home_Page_1.png"></a>
  <figcaption>Empty tag filter options field as there no images with tags in the database.</figcaption>
</figure>

<figure class="align-center" style="display: block; width: 100%;">
	<a href="/assets/images/portfolio/PNG/2023_05_04_Home_Page_2.png"><img src="/assets/images/portfolio/PNG/2023_05_04_Home_Page_2.png"></a>
  <figcaption>Using a image url to add an image to the database.</figcaption>
</figure>

<figure class="align-center" style="display: block; width: 100%;">
	<a href="/assets/images/portfolio/PNG/2023_05_04_Tag_Selection_1.png"><img src="/assets/images/portfolio/PNG/2023_05_04_Tag_Selection_1.png"></a>
  <figcaption>Tag selection page shown when adding a new image or editing an already existing image's tags. Shows loading dots while the backend is predicting image tags.</figcaption>
</figure>

<figure class="align-center" style="display: block; width: 100%;">
	<a href="/assets/images/portfolio/PNG/2023_05_04_Tag_Selection_2.png"><img src="/assets/images/portfolio/PNG/2023_05_04_Tag_Selection_2.png"></a>
  <figcaption>Tag selection page with menu to select from recommended image tags. Displays the top 5 tag predictions.</figcaption>
</figure>

<figure class="align-center" style="display: block; width: 100%;">
	<a href="/assets/images/portfolio/PNG/2023_05_04_Home_Page_3.png"><img src="/assets/images/portfolio/PNG/2023_05_04_Home_Page_3.png"></a>
  <figcaption>Home page with a single image in the database.</figcaption>
</figure>

<figure class="align-center" style="display: block; width: 100%;">
	<a href="/assets/images/portfolio/PNG/2023_05_04_Home_Page_4.png"><img src="/assets/images/portfolio/PNG/2023_05_04_Home_Page_4.png"></a>
  <figcaption>Multiple images in the database.</figcaption>
</figure>

<figure class="align-center" style="display: block; width: 100%;">
	<a href="/assets/images/portfolio/PNG/2023_05_04_Home_Page_5.png"><img src="/assets/images/portfolio/PNG/2023_05_04_Home_Page_5.png"></a>
  <figcaption>Filtering for images based on tags in the database.</figcaption>
</figure>

<figure class="align-center" style="display: block; width: 100%;">
	<a href="/assets/images/portfolio/PNG/2023_05_04_Architecture_Example_Implementation.png"><img src="/assets/images/portfolio/PNG/2023_05_04_Architecture_Example_Implementation.png"></a>
  <figcaption>Architecture diagram for the proof of concept.</figcaption>
</figure>
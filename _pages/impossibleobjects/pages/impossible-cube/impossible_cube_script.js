import {setupOrthoViewer} from '../../orthoViewer.js';

setupOrthoViewer("viewer", "resetview", "screenshotview", "../../models/impossibleCube.gltf", "tilt");

setupOrthoViewer("viewer1", "resetview1", "screenshotview1", "../../models/impossibleCubeEscher.gltf", "tilt");

setupOrthoViewer("viewer2", "resetview2", "screenshotview2", "../../models/impossibleCubeEscherSmooth.gltf", "tilt");

setupOrthoViewer("viewer3", "resetview3", "screenshotview3", "../../models/impossibleCubeIsometric.gltf", "iso");

setupOrthoViewer("viewer4", "resetview4", "screenshotview4", "../../models/impossibleCubeTriangleIsometric.gltf", "iso");

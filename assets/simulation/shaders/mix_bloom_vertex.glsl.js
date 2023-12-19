// Myles Cork
// Based on: https://threejs.org/examples/?q=bloom#webgl_postprocessing_unreal_bloom_selective

const mix_bloom_vertex_shader = `
varying vec2 vUv;

void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}
`;

export default mix_bloom_vertex_shader;
// Myles Cork
// Based on: https://threejs.org/examples/?q=bloom#webgl_postprocessing_unreal_bloom_selective

const mix_bloom_fragment_shader = `
uniform sampler2D baseTexture;
uniform sampler2D bloomTexture;

varying vec2 vUv;

void main() {
    gl_FragColor = ( texture2D( baseTexture, vUv ) + vec4( texture2D( bloomTexture, vUv ).rgb, 0.0 ) );
}
`;

export default mix_bloom_fragment_shader;
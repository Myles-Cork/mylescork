// Myles Cork

const basic_vertex_shader = `
varying vec3 vPos;

void main() {
    vPos = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
}
`;

export default basic_vertex_shader;
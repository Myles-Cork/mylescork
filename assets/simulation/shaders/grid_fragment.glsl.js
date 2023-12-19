// Myles Cork
// Based on: https://madebyevan.com/shaders/grid/

const grid_fragment_shader = `
uniform vec3 color;
uniform float opacity;
uniform float max_dist;
varying vec3 vPos;

void main(){      
    float cellSize = 1.;
    vec2 coord = vPos.xy / cellSize;

    // Reduce opacity when not on a line
    vec2 grid = abs(fract(coord - 0.5) - 0.5) / fwidth(coord*2.0);
    float line = min(grid.x, grid.y);
    float line_opacity = 1.0 - min(line, 1.0);

    // Reduce opacity when farther from the center
    float dist_from_center_sq = dot(vPos,vPos);
    float dist_opacity = 1.0 - min(pow(dist_from_center_sq/(max_dist*max_dist),2.0),1.0);

    gl_FragColor.rgba = vec4(color,opacity*line_opacity*dist_opacity);
}
`;

export default grid_fragment_shader;
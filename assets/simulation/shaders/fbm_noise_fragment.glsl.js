// Myles Cork
// Based on: https://codepen.io/prisoner849/pen/VwdZGNm and https://github.com/yiwenl/glsl-fbm/blob/master/3d.glsl

const fbm_noise_fragment_shader =`
  uniform float time; 
  uniform vec3 color_bright;
  uniform vec3 color_dark;
  varying vec3 vPos;

  // FBM noise
  #define NUM_OCTAVES 5

  float mod289(float x){return x - floor(x * (1.0 / 289.0)) * 289.0;}
  vec4 mod289(vec4 x){return x - floor(x * (1.0 / 289.0)) * 289.0;}
  vec4 perm(vec4 x){return mod289(((x * 34.0) + 1.0) * x);}

  float noise(vec3 p){
      vec3 a = floor(p);
      vec3 d = p - a;
      d = d * d * (3.0 - 2.0 * d);

      vec4 b = a.xxyy + vec4(0.0, 1.0, 0.0, 1.0);
      vec4 k1 = perm(b.xyxy);
      vec4 k2 = perm(k1.xyxy + b.zzww);

      vec4 c = k2 + a.zzzz;
      vec4 k3 = perm(c);
      vec4 k4 = perm(c + 1.0);

      vec4 o1 = fract(k3 * (1.0 / 41.0));
      vec4 o2 = fract(k4 * (1.0 / 41.0));

      vec4 o3 = o2 * d.z + o1 * (1.0 - d.z);
      vec2 o4 = o3.yw * d.x + o3.xz * (1.0 - d.x);

      return o4.y * d.y + o4.x * (1.0 - d.y);
  }

  float fbm(vec3 x){
    float v = 0.0;
    float a = 0.5;
    vec3 shift = vec3(100);
    for (int i = 0; i < NUM_OCTAVES; ++i) {
      v += a * noise(x);
      x = x * 2.0 + shift;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    float d = fbm(vPos * 0.5);
    for(int i = 0; i < 4; i++){
      d = fbm((vPos + vec3(sin(time),cos(time),sin(time))) * (float(i) + 1.) * d);
    }

    gl_FragColor = vec4(mix(color_dark, color_bright*10.0, pow(d, 2.)),1.0);
  }
`

export default fbm_noise_fragment_shader;
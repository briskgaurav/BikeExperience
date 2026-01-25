import React, { useRef, forwardRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const vertexShader = `
  varying vec2 vUv;
  varying vec3 vPosition;
  varying vec3 vNormal;
  
  void main() {
    vUv = uv;
    vPosition = position;
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const fragmentShader = `
  varying vec2 vUv;
  varying vec3 vPosition;
  varying vec3 vNormal;
  
  uniform float time;
  uniform float particleDensity;
  uniform float swirlingSpeed;
  uniform float dispersalAmount;
  uniform float noiseScale;
  uniform float brightness;
  uniform float opacity;
  uniform vec3 particleColor;
  uniform float trailLength;
  uniform float explosionForce;
  uniform float vortexStrength;
  uniform float dustAmount;
  uniform float grainAmount;
  uniform float fineDetailScale;

  #define PI 3.14159265359
  #define MAX_DENSITY 20.0 // Clamp max density for performance

  // Fast hash - cheaper than full simplex for high frequencies
  float hash(vec3 p) {
    p = fract(p * 0.3183099 + .1);
    p *= 17.0;
    return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
  }

  float hash2(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  // Simplex noise (optimized)
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise(vec3 v) {
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod289(i);
    vec4 p = permute(permute(permute(
        i.z + vec4(0.0, i1.z, i2.z, 1.0))
      + i.y + vec4(0.0, i1.y, i2.y, 1.0))
      + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }

  // Optimized FBM with early exit
  float fbm(vec3 p, int octaves) {
    float value = 0.0;
    float amplitude = 0.5;
    float frequency = 1.0;
    
    for (int i = 0; i < 3; i++) {
      if (i >= octaves) break;
      value += amplitude * snoise(p * frequency);
      amplitude *= 0.5;
      frequency *= 2.0;
    }
    return value;
  }

  // Fast grain using hash instead of expensive simplex at high frequencies
  float fastGrain(vec3 p) {
    float g = 0.0;
    g += hash(p * 10.0) * 0.5;
    g += hash(p * 20.0) * 0.3;
    g += hash(p * 40.0) * 0.2;
    return g;
  }

  // Adaptive particle density - uses cheaper noise at high densities
  float adaptiveDenseParticles(vec3 pos, float t, float density) {
    float particles = 0.0;
    float swirl = t * swirlingSpeed;
    
    // Clamp density to prevent performance issues
    float safeDensity = min(density, MAX_DENSITY);
    
    // Use fewer octaves at high density
    int octaves = density > 10.0 ? 3 : 4;
    
    for (float i = 0.0; i < 4.0; i++) {
      if (i >= float(octaves)) break;
      
      float scale = 1.0 + i * 2.5;
      vec3 p = pos * scale * safeDensity;
      
      float swirlOffset = swirl * (0.3 + i * 0.15);
      p.x += sin(p.y * 0.3 + swirlOffset) * vortexStrength;
      p.y += cos(p.x * 0.3 + swirlOffset * 0.8) * vortexStrength;
      p.z += sin(p.x * 0.2 + p.y * 0.2 + swirlOffset * 0.5) * vortexStrength * 0.5;
      
      // Use hash for very high frequencies (cheaper)
      float n;
      if (safeDensity > 15.0 && i > 1.0) {
        n = hash(p + vec3(t * 0.1));
      } else {
        n = snoise(p + t * 0.1 * (1.0 + i * 0.3));
        n = n * 0.5 + 0.5;
      }
      
      n = pow(n, 1.4);
      particles += n * (1.0 / (1.0 + i * 0.4));
    }
    
    return particles / 2.0;
  }

  // Optimized grain - uses fast hash at high density
  float optimizedFineGrain(vec3 pos, float t, float density) {
    vec3 p = pos * fineDetailScale;
    
    // Use fast hash-based grain for high densities
    if (density > 15.0) {
      return fastGrain(p) * grainAmount;
    }
    
    // Use simplex for lower densities (better quality)
    float grain = 0.0;
    grain += snoise(p * 8.0 + t * 0.05) * 0.5;
    grain += snoise(p * 16.0 - t * 0.03) * 0.35;
    grain += hash(p * 32.0) * 0.15; // Mix in hash for highest freq
    return grain;
  }

  float powderCloud(vec3 pos, float t) {
    vec3 p = pos * noiseScale;
    p += vec3(sin(t * 0.2) * 0.3, cos(t * 0.15) * 0.3, sin(t * 0.25) * 0.2);
    
    float cloud = fbm(p, 3);
    cloud += fbm(p * 2.0 + t * 0.08, 2) * 0.5;
    cloud += fbm(p * 4.0 - t * 0.1, 2) * 0.25;
    
    // Simplified voronoi approximation using hash
    float clumps = hash(floor(p * 3.0));
    cloud *= (1.0 - clumps * 0.3);
    return cloud;
  }

  float swirlPattern(vec3 pos, float t) {
    float swirl = 0.0;
    vec2 p2d = pos.xy;
    float angle = atan(p2d.y, p2d.x);
    float dist = length(p2d);
    
    for (float i = 0.0; i < 3.0; i++) {
      float spiralAngle = angle + dist * (3.0 + i * 1.5) - t * swirlingSpeed * (0.2 + i * 0.1);
      float spiral = sin(spiralAngle * (2.0 + i)) * 0.5 + 0.5;
      spiral = pow(spiral, 2.0);
      spiral *= exp(-dist * (0.8 + i * 0.3));
      
      float noise = snoise(pos * (5.0 + i * 4.0) + t * 0.1);
      spiral *= (0.6 + noise * 0.4);
      swirl += spiral * (1.0 / (1.0 + i * 0.6));
    }
    return swirl;
  }

  float dispersalTrails(vec3 pos, float t) {
    float trails = 0.0;
    
    for (float i = 0.0; i < 6.0; i++) {
      float angle = i * PI * 2.0 / 6.0 + t * 0.1;
      float elevation = sin(i * 1.7) * 0.5;
      vec3 dir = vec3(cos(angle), sin(angle) * 0.6 + elevation, sin(angle * 0.7) * 0.3);
      
      float alongTrail = dot(normalize(pos), dir);
      float distFromTrail = length(pos - dir * dot(pos, dir));
      float trail = exp(-distFromTrail * (8.0 - trailLength * 5.0));
      trail *= smoothstep(-0.2, 0.8, alongTrail);
      trail *= (0.5 + snoise(pos * 10.0 + dir * t) * 0.5);
      trails += trail * explosionForce;
    }
    return trails;
  }

  void main() {
    vec3 pos = vPosition;
    float t = time;
    
    // Calculate distance from center to reduce brightness in middle
    float distFromCenter = length(pos);
    float centerFalloff = smoothstep(0.0, 1.5, distFromCenter);
    centerFalloff = mix(0.5, 1.0, centerFalloff); // Middle gets 50%, edges get 100%
    
    // Adaptive quality based on particle density
    float dense = adaptiveDenseParticles(pos, t, particleDensity);
    float grain = optimizedFineGrain(pos, t, particleDensity) * grainAmount;
    float powder = powderCloud(pos, t) * dustAmount;
    float swirl = swirlPattern(pos, t);
    float trails = dispersalTrails(pos, t);
    
    // Combine
    float combined = 0.0;
    combined += dense * 0.35;
    combined += grain * 0.25;
    combined += powder * 0.2;
    combined += swirl * 0.15;
    combined += trails * 0.15;
    
    // Dispersal
    float dispersal = fbm(pos * dispersalAmount + t * 0.3, 3);
    dispersal = dispersal * 0.5 + 0.5;
    combined *= (0.7 + dispersal * 0.5);
    
    // Micro detail - use hash at high density for performance
    float microDetail;
    if (particleDensity > 15.0) {
      microDetail = hash(pos * 50.0 + vec3(t * 0.1)) * hash(pos * 100.0);
    } else {
      microDetail = snoise(pos * 50.0 + t * 0.1) * 0.5 + 0.5;
      microDetail *= snoise(pos * 100.0) * 0.5 + 0.5;
    }
    combined += microDetail * 0.1;
    
    // Contrast
    combined = smoothstep(0.15, 0.85, combined);
    combined = pow(combined, 0.8);
    
    // Apply center falloff to reduce middle brightness
    combined *= centerFalloff;
    
    // Clamp combined to 50-60% range for uniform brightness
    combined = clamp(combined, 0.0, 0.6);
    
    // Brightness variation - reduced to keep uniform
    float brightVar = fbm(pos * 2.0 + t * 0.1, 2) * 0.2 + 0.8;
    combined *= brightVar;
    
    // Color
    vec3 color = particleColor;
    color = mix(color * 0.3, vec3(1.0), combined * 0.7);
    color = mix(vec3(0.6, 0.65, 0.7), color, combined);
    
    vec3 finalColor = color * combined * brightness;
    
    // Glow - reduced for center
    float glow = exp(-length(vUv - 0.5) * 1.5) * 0.1 * centerFalloff;
    finalColor += particleColor * glow * combined;
    
    float alpha = combined * opacity;
    
    if (alpha < 0.01) discard;
    
    gl_FragColor = vec4(finalColor, alpha);
  }
`

const RichetMaterial = forwardRef(function RichetMaterial({
  particleDensity = 100.0,
  particleSize = 1.0,
  particleColor = "#ffffff",
  swirlingSpeed = 0.05,
  vortexStrength = 0.8,
  dispersalAmount = 3.0,
  explosionForce = 1.4,
  trailLength = 0.6,
  noiseScale = .5,
  dustAmount = .8,
  grainAmount = 0.7,
  fineDetailScale = 5.0,
  brightness = 10.0,
  opacity = 1.0,
  depthTest = true,
  depthWrite = false,
  blendMode = THREE.AdditiveBlending,
  side = THREE.DoubleSide,
  ...props
}, ref) {
  const materialRef = useRef()
  const actualRef = ref || materialRef

  useFrame((state) => {
    if (actualRef.current) {
      actualRef.current.uniforms.time.value = state.clock.elapsedTime
    }
  })

  return (
    <shaderMaterial
      ref={actualRef}
      vertexShader={vertexShader}
      fragmentShader={fragmentShader}
      uniforms={{
        time: { value: 0 },
        particleDensity: { value: particleDensity },
        particleSize: { value: particleSize },
        particleColor: { value: new THREE.Color(particleColor) },
        swirlingSpeed: { value: swirlingSpeed },
        vortexStrength: { value: vortexStrength },
        dispersalAmount: { value: dispersalAmount },
        explosionForce: { value: explosionForce },
        trailLength: { value: trailLength },
        noiseScale: { value: noiseScale },
        dustAmount: { value: dustAmount },
        grainAmount: { value: grainAmount },
        fineDetailScale: { value: fineDetailScale },
        brightness: { value: brightness },
        opacity: { value: opacity },
      }}
      transparent
      depthTest={depthTest}
      depthWrite={depthWrite}
      blending={blendMode}
      side={side}
      {...props}
    />
  )
})

export default RichetMaterial
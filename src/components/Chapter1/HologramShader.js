import React, { useRef, forwardRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const vertexShader = `
  #define STANDARD
  varying vec3 vViewPosition;
  #ifdef USE_TRANSMISSION
  varying vec3 vWorldPosition;
  #endif

  varying vec2 vUv;
  varying vec4 vPos;
  varying vec3 vNormalW;
  varying vec3 vPositionW;
  varying vec3 vLocalPosition;
  varying vec3 vBarycentric;
  varying vec3 vViewDir;
  
  #include <common>
  #include <uv_pars_vertex>
  #include <envmap_pars_vertex>
  #include <color_pars_vertex>
  #include <fog_pars_vertex>
  #include <morphtarget_pars_vertex>
  #include <skinning_pars_vertex>
  #include <logdepthbuf_pars_vertex>
  #include <clipping_planes_pars_vertex>
  
  attribute vec3 barycentric;
  
  void main() {
    
    #include <uv_vertex>
    #include <color_vertex>
    #include <morphcolor_vertex>
  
    #if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
  
      #include <beginnormal_vertex>
      #include <morphnormal_vertex>
      #include <skinbase_vertex>
      #include <skinnormal_vertex>
      #include <defaultnormal_vertex>
  
    #endif
  
    #include <begin_vertex>
    vLocalPosition = transformed;
    vBarycentric = barycentric;
    #include <morphtarget_vertex>
    #include <skinning_vertex>
    #include <project_vertex>
    #include <logdepthbuf_vertex>
    #include <clipping_planes_vertex>
  
    #include <worldpos_vertex>
    #include <envmap_vertex>
    #include <fog_vertex>
    mat4 modelViewProjectionMatrix = projectionMatrix * modelViewMatrix;
    vUv = uv;
    vPos = projectionMatrix * modelViewMatrix * vec4( transformed, 1.0 );
    vPositionW = vec3( vec4( transformed, 1.0 ) * modelMatrix);
    vNormalW = normalize( vec3( vec4( normal, 0.0 ) * modelMatrix ) );
    vViewDir = normalize(cameraPosition - vPositionW);
    
    gl_Position = modelViewProjectionMatrix * vec4( transformed, 1.0 );
  }
`

const fragmentShader = `
  varying vec2 vUv;
  varying vec3 vPositionW;
  varying vec4 vPos;
  varying vec3 vNormalW;
  varying vec3 vBarycentric;
  varying vec3 vLocalPosition;
  varying vec3 vViewDir;

  uniform float time;
  uniform float fresnelOpacity;
  uniform float scanlineSize;
  uniform float fresnelAmount;
  uniform float signalSpeed;
  uniform float hologramBrightness;
  uniform float hologramOpacity;
  uniform bool blinkFresnelOnly;
  uniform bool enableBlinking;
  uniform vec3 hologramColor;
  uniform vec3 secondaryColor;
  uniform vec3 accentColor;
  uniform float glitchIntensity;
  uniform float scanlineSpeed;
  uniform float wireframeThickness;
  uniform float wireframeIntensity;
  uniform float gridSize;
  uniform float gridLineWidth;
  uniform float hexScale;
  uniform float dataStreamSpeed;
  uniform float pulseSpeed;
  uniform float chromaticStrength;
  uniform bool enableHexPattern;
  uniform bool enableDataStreams;
  uniform bool enablePulseWaves;
  uniform bool enableGrid;
  uniform float meshMinY;
  uniform float meshMaxY;
  
  #define PI 3.14159265359
  #define TAU 6.28318530718
  
  // Noise functions
  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }
  
  float hash3(vec3 p) {
    return fract(sin(dot(p, vec3(127.1, 311.7, 74.7))) * 43758.5453123);
  }
  
  float noise(float t) {
    return fract(sin(t * 12.9898) * 43758.5453);
  }
  
  float noise2D(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }
  
  float flicker(float amt, float time) {
    return clamp(fract(cos(time) * 43758.5453123), amt, 1.0);
  }
  
  // 4x4 Grid wireframe pattern
  float gridPattern(vec3 pos, float size, float lineWidth) {
    vec3 grid = abs(fract(pos * size - 0.5) - 0.5) / fwidth(pos * size);
    float line = min(min(grid.x, grid.y), grid.z);
    return 1.0 - min(line, 1.0);
  }
  
  // Enhanced grid with glowing intersections
  float enhancedGrid(vec3 pos, float size, float lineWidth) {
    vec3 scaled = pos * size;
    vec3 grid = abs(fract(scaled - 0.5) - 0.5);
    vec3 deriv = fwidth(scaled);
    
    // Main grid lines
    vec3 lines = smoothstep(deriv * lineWidth, vec3(0.0), grid);
    float gridLine = max(max(lines.x, lines.y), lines.z);
    
    // Intersection glow (where lines meet)
    float intersectionX = lines.x * lines.y;
    float intersectionY = lines.y * lines.z;
    float intersectionZ = lines.x * lines.z;
    float intersections = max(max(intersectionX, intersectionY), intersectionZ);
    
    return gridLine + intersections * 2.0;
  }
  
  // Hexagonal pattern
  vec2 hexCoords(vec2 p) {
    vec2 q = vec2(p.x * 2.0 * 0.5773503, p.y + p.x * 0.5773503);
    vec2 pi = floor(q);
    vec2 pf = fract(q);
    float v = mod(pi.x + pi.y, 3.0);
    float ca = step(1.0, v);
    float cb = step(2.0, v);
    vec2 ma = step(pf.xy, pf.yx);
    return pi + ca - cb * ma;
  }
  
  float hexPattern(vec2 p, float scale) {
    p *= scale;
    vec2 h = hexCoords(p);
    vec2 hp = p - vec2(h.x * 0.5, h.y + h.x * 0.5);
    float d = length(hp);
    float edge = smoothstep(0.5, 0.45, d);
    float ring = smoothstep(0.48, 0.45, d) - smoothstep(0.45, 0.42, d);
    return ring * 0.8 + edge * 0.2;
  }
  
  // Data stream effect
  float dataStream(vec3 pos, float speed) {
    float stream = 0.0;
    
    // Vertical streams
    float vStream = sin(pos.x * 30.0 + time * speed) * 0.5 + 0.5;
    vStream *= step(0.95, fract(pos.x * 8.0 + time * 0.1));
    
    // Horizontal streams
    float hStream = sin(pos.y * 30.0 - time * speed * 1.5) * 0.5 + 0.5;
    hStream *= step(0.95, fract(pos.y * 8.0 - time * 0.15));
    
    // Diagonal data flow
    float dStream = sin((pos.x + pos.y) * 20.0 + time * speed * 2.0) * 0.5 + 0.5;
    dStream *= step(0.97, fract((pos.x + pos.y) * 5.0 + time * 0.2));
    
    stream = max(max(vStream, hStream), dStream);
    return stream;
  }
  
  // Pulse wave effect
  float pulseWave(vec3 pos, float speed) {
    float dist = length(pos);
    float wave = sin(dist * 10.0 - time * speed) * 0.5 + 0.5;
    wave *= smoothstep(0.1, 0.0, abs(fract(dist * 2.0 - time * speed * 0.2) - 0.5) - 0.4);
    return wave;
  }
  
  // Circuit pattern
  float circuitPattern(vec2 uv, float scale) {
    vec2 p = uv * scale;
    vec2 i = floor(p);
    vec2 f = fract(p);
    
    float r = hash(i);
    float circuit = 0.0;
    
    // Horizontal line
    if (r < 0.25) {
      circuit = step(0.45, f.y) * step(f.y, 0.55);
    }
    // Vertical line
    else if (r < 0.5) {
      circuit = step(0.45, f.x) * step(f.x, 0.55);
    }
    // Corner
    else if (r < 0.75) {
      circuit = step(0.45, f.x) * step(f.x, 0.55) * step(0.5, f.y);
      circuit += step(0.45, f.y) * step(f.y, 0.55) * step(f.x, 0.5);
    }
    // Node
    else {
      float d = length(f - 0.5);
      circuit = smoothstep(0.15, 0.1, d);
    }
    
    return circuit;
  }
  
  // Edge wireframe from barycentric
  float edgeFactor() {
    vec3 d = fwidth(vBarycentric);
    vec3 a3 = smoothstep(vec3(0.0), d * wireframeThickness, vBarycentric);
    return min(min(a3.x, a3.y), a3.z);
  }
  
  void main() {
    // Use LOCAL position for effects - stays fixed relative to model during rotation
    float localY = vLocalPosition.y;
    float normalizedCoord = clamp((localY - meshMinY) / (meshMaxY - meshMinY), 0.0, 1.0);
    
    // === GLITCH SYSTEM ===
    float glitchTime = floor(time * 8.0);
    float glitchTrigger = step(0.92, noise(glitchTime));
    
    float distortedCoord = normalizedCoord;
    if (glitchTrigger > 0.5) {
      distortedCoord += (noise(glitchTime + normalizedCoord * 20.0) - 0.5) * glitchIntensity * 0.3;
    }
    
    // === SCANLINE (normalized, runs across whole mesh uniformly) ===
    // Scanline position cycles from 0 to 1 over time
    float scanlinePosition = fract(time * scanlineSpeed * 0.5);
    float scanlineWidth = 0.005 * scanlineSize;
    
    // Calculate distance from scanline plane (using normalized Y position)
    // The scanline sweeps from bottom (0) to top (1) of the mesh
    float distFromScanline = abs(normalizedCoord - scanlinePosition);
    
    // Create sharp scanline that illuminates all fragments at the same Y-level simultaneously
    float sharpScanline = smoothstep(scanlineWidth, 0.0, distFromScanline);
    
    // Secondary scanline going opposite direction
    float scanlinePosition2 = fract(-time * scanlineSpeed * 0.3 + 0.5);
    float distFromScanline2 = abs(normalizedCoord - scanlinePosition2);
    float sharpScanline2 = smoothstep(scanlineWidth * 0.5, 0.0, distFromScanline2) * 0.5;
    
    // === BASE HOLOGRAM COLOR ===
    vec3 baseColor = hologramColor;
    float brightness = mix(hologramBrightness, normalizedCoord, 0.5);
    
    // === 4x4 GRID WIREFRAME ===
    float grid = 0.0;
    if (enableGrid) {
      grid = enhancedGrid(vLocalPosition, gridSize, gridLineWidth);
      
      // Animated grid pulse
      float gridPulse = sin(time * 2.0) * 0.3 + 0.7;
      grid *= gridPulse;
      
      // Add secondary finer grid
      float fineGrid = enhancedGrid(vLocalPosition, gridSize * 4.0, gridLineWidth * 0.5) * 0.3;
      grid += fineGrid;
    }
    
    // === HEXAGONAL PATTERN ===
    float hex = 0.0;
    if (enableHexPattern) {
      hex = hexPattern(vUv, hexScale);
      hex *= sin(time * 1.5 + vUv.y * 10.0) * 0.3 + 0.7;
    }
    
    // === DATA STREAMS ===
    float streams = 0.0;
    if (enableDataStreams) {
      streams = dataStream(vLocalPosition, dataStreamSpeed);
    }
    
    // === PULSE WAVES ===
    float pulse = 0.0;
    if (enablePulseWaves) {
      pulse = pulseWave(vLocalPosition, pulseSpeed);
    }
    
    // === FRESNEL (EDGE GLOW) ===
    vec3 viewDirectionW = normalize(cameraPosition - vPositionW);
    float fresnelEffect = dot(viewDirectionW, vNormalW);
    fresnelEffect = clamp(fresnelAmount - fresnelEffect, 0.0, fresnelOpacity);
    
    // Enhanced rim light with color gradient
    float rimLight = pow(1.0 - max(dot(vNormalW, viewDirectionW), 0.0), 3.0);
    
    // === BLINKING ===
    float blinkValue = enableBlinking ? 0.6 - signalSpeed : 1.0;
    float blink = flicker(blinkValue, time * signalSpeed * 0.02);
    
    // === TRIANGLE WIREFRAME ===
    float wireframe = 1.0 - edgeFactor();
    
    // === COMPOSE FINAL COLOR ===
    vec3 finalColor = baseColor * brightness;
    
    // Add grid with secondary color
    finalColor += secondaryColor * grid * 0.8;
    
    // Add hex pattern with accent
    finalColor += accentColor * hex * 0.5;
    
    // Add data streams
    finalColor += hologramColor * streams * 1.5;
    
    // Add pulse waves
    finalColor += secondaryColor * pulse * 0.6;
    
    // Add scanlines
    finalColor += hologramColor * sharpScanline * 3.0;
    finalColor += secondaryColor * sharpScanline2 * 2.0;
    
    // Add fresnel and rim
    finalColor += (blinkFresnelOnly) 
      ? fresnelEffect * blink * hologramColor
      : fresnelEffect * hologramColor;
    finalColor += rimLight * accentColor * 0.4;
    
    // Add triangle wireframe
    finalColor += hologramColor * wireframe * wireframeIntensity;
    
    // Apply overall blink if not fresnel only
    if (!blinkFresnelOnly) {
      finalColor *= blink;
    }
    
    // === GLITCH COLOR SHIFT ===
    if (glitchTrigger > 0.5) {
      finalColor.r += 0.2 * glitchIntensity;
      finalColor.b += 0.15 * glitchIntensity;
      
      // Chromatic aberration during glitch
      float aberration = glitchIntensity * 0.1;
      finalColor.r *= 1.0 + aberration;
      finalColor.b *= 1.0 - aberration;
    }
    
    // === CHROMATIC ABERRATION (subtle) ===
    float edgeDist = length(vUv - 0.5) * 2.0;
    float chromatic = edgeDist * chromaticStrength * 0.05;
    finalColor.r *= 1.0 + chromatic;
    finalColor.b *= 1.0 - chromatic;
    
    // === VIGNETTE GLOW ===
    float vignette = 1.0 - edgeDist * 0.3;
    finalColor *= vignette;
    
    // === FINAL OUTPUT ===
    // Add subtle noise for texture
    float filmGrain = hash(vUv * time) * 0.03;
    finalColor += filmGrain;
    
    gl_FragColor = vec4(finalColor, hologramOpacity);
  }
`

const HolographicMaterial = forwardRef(function HolographicMaterial({ 
  // Core hologram settings
  fresnelOpacity = .1,
  fresnelAmount = 0.8,
  scanlineSize = 1.5,
  hologramBrightness = .1,
  signalSpeed = 1.0,
  hologramColor = "#00ffff",      // Cyan
  secondaryColor = "#00ffff",     // Magenta
  accentColor = "#00ffff",        // Yellow
  enableBlinking = false,
  blinkFresnelOnly = true,
  hologramOpacity = .8,
  
  // Render settings
  depthTest = false,
  depthWrite = true,
  blendMode = THREE.AdditiveBlending,
  side = THREE.FrontSide,
  
  // Effect intensities
  glitchIntensity = 0.0,
  scanlineSpeed = .5,
  wireframeThickness = 1.5,
  wireframeIntensity = 0.,
  
  // Grid settings (4x4 wireframe)
  enableGrid = true,
  gridSize = 1.5,                  // 4x4 grid
  gridLineWidth = 1.0,
  
  // Hex pattern
  enableHexPattern = false,
  hexScale = 8.0,
  
  // Data streams
  enableDataStreams = false,
  dataStreamSpeed = 3.0,
  
  // Pulse waves
  enablePulseWaves = true,
  pulseSpeed = 2.0,
  
  // Chromatic aberration
  chromaticStrength = 0.5,
  
  // Mesh bounds for normalized scanline (adjust to your model's bounding box)
  meshMinY = -3,
  meshMaxY = 3,
  
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
      transparent
      depthWrite={depthWrite}
      depthTest={depthTest}
      blending={blendMode}
      side={side}
      uniforms={{
        time: { value: 0 },
        fresnelOpacity: { value: fresnelOpacity },
        fresnelAmount: { value: fresnelAmount },
        scanlineSize: { value: scanlineSize },
        hologramBrightness: { value: hologramBrightness },
        signalSpeed: { value: signalSpeed },
        hologramColor: { value: new THREE.Color(hologramColor) },
        secondaryColor: { value: new THREE.Color(secondaryColor) },
        accentColor: { value: new THREE.Color(accentColor) },
        enableBlinking: { value: enableBlinking },
        blinkFresnelOnly: { value: blinkFresnelOnly },
        hologramOpacity: { value: hologramOpacity },
        glitchIntensity: { value: glitchIntensity },
        scanlineSpeed: { value: scanlineSpeed },
        wireframeThickness: { value: wireframeThickness },
        wireframeIntensity: { value: wireframeIntensity },
        enableGrid: { value: enableGrid },
        gridSize: { value: gridSize },
        gridLineWidth: { value: gridLineWidth },
        enableHexPattern: { value: enableHexPattern },
        hexScale: { value: hexScale },
        enableDataStreams: { value: enableDataStreams },
        dataStreamSpeed: { value: dataStreamSpeed },
        enablePulseWaves: { value: enablePulseWaves },
        pulseSpeed: { value: pulseSpeed },
        chromaticStrength: { value: chromaticStrength },
        meshMinY: { value: meshMinY },
        meshMaxY: { value: meshMaxY },
      }}
      {...props}
    />
  )
})

export default HolographicMaterial

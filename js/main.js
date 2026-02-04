import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js'

// ================= SCENE =================
const scene = new THREE.Scene()

// ================= CAMERA =================
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  100
)
camera.position.z = 4

// ================= RENDERER =================
const canvas = document.getElementById('webgl')
const renderer = new THREE.WebGLRenderer({
  canvas,
  alpha: true,
  antialias: true
})

renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// ================= OBJECT =================
const geometry = new THREE.TorusKnotGeometry(1, 0.35, 120, 16)
const material = new THREE.MeshStandardMaterial({
  color: 0x00ffff,
  metalness: 0.8,
  roughness: 0.25
})

const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// ================= LIGHTS =================
scene.add(new THREE.AmbientLight(0xffffff, 0.5))

const dirLight = new THREE.DirectionalLight(0xffffff, 1)
dirLight.position.set(3, 3, 3)
scene.add(dirLight)

// ================= MOUSE PARALLAX =================
const mouse = {
  x: 0,
  y: 0
}

window.addEventListener('mousemove', (event) => {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
})

// ================= ANIMATION LOOP =================
const clock = new THREE.Clock()

function animate() {
  const elapsedTime = clock.getElapsedTime()

  // Object rotation
  mesh.rotation.x = elapsedTime * 0.25
  mesh.rotation.y = elapsedTime * 0.4

  // Smooth camera movement
  camera.position.x += (mouse.x * 0.8 - camera.position.x) * 0.05
  camera.position.y += (mouse.y * 0.8 - camera.position.y) * 0.05
  camera.lookAt(mesh.position)

  renderer.render(scene, camera)
  requestAnimationFrame(animate)
}

animate()

// ================= RESIZE =================
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
})

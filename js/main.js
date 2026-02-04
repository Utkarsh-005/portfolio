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

// ================= OBJECT (TEMP BASIC SHAPE) =================
// We use a simple shape for now. Later we’ll replace it with your final model.
const geometry = new THREE.IcosahedronGeometry(1.2, 1)
const material = new THREE.MeshStandardMaterial({
  color: 0x00ffff,
  metalness: 0.6,
  roughness: 0.3
})

const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// ================= LIGHTS =================
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
directionalLight.position.set(3, 3, 3)
scene.add(directionalLight)

// ================= MOUSE PARALLAX =================
const mouse = {
  x: 0,
  y: 0
}

window.addEventListener('mousemove', (event) => {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
})

// ================= SCROLL CONTROL =================
let scrollY = window.scrollY

window.addEventListener('scroll', () => {
  scrollY = window.scrollY
})

// ================= ANIMATION LOOP =================
const clock = new THREE.Clock()

function animate() {
  const elapsedTime = clock.getElapsedTime()

  // Rotate object slowly
  mesh.rotation.x = elapsedTime * 0.2
  mesh.rotation.y = elapsedTime * 0.35

  // Scroll-based depth
  camera.position.z = 4 + scrollY * 0.001

  // Smooth mouse parallax
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

import {
  CameraHelper,
  CircleBufferGeometry,
  ConeBufferGeometry,
  CylinderBufferGeometry,
  DirectionalLight,
  DirectionalLightHelper,
  Group,
  Math as ThreeMath,
  Mesh,
  MeshLambertMaterial,
  PCFSoftShadowMap,
  PerspectiveCamera,
  Scene,
  SphereBufferGeometry,
  Vector2,
  WebGLRenderer,
} from 'three'
import camera from './camera'
import debounce from './debounce'
import light from './light'

light.shadow.camera.near = camera.near
light.shadow.camera.far = camera.far

const D2R = ThreeMath.DEG2RAD
const mouse = new Vector2(window.innerWidth / 2, window.innerHeight / 2)
const slerp = 10

window.addEventListener('mousemove', e => {
  mouse.x = e.clientX
  mouse.y = e.clientY
})
const convertMouse = (position, size) => (((position / size) * 2) - 1) * (60 * D2R)
const draw = time => {
  const x = convertMouse(mouse.y, window.innerHeight) + 30 * D2R
  const y = convertMouse(mouse.x, window.innerWidth)

  meshes.position.y += time ? Math.cos(time * 0.0025) * 0.025 : 0
  meshes.rotation.x += (x - meshes.rotation.x) / (time ? slerp : 1)
  meshes.rotation.y += (y - meshes.rotation.y) / (time ? slerp : 1)
  renderer.render(scene, camera)
}
const meshes = new Group()
const cameraHelper = new CameraHelper(light.shadow.camera)
const lightHelper = new DirectionalLightHelper(light, 15)

const renderer = new WebGLRenderer({ alpha: true })
renderer.shadowMap.type = PCFSoftShadowMap
renderer.shadowMap.enabled = true
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setAnimationLoop(draw)

const scene = new Scene()
const init = () => {
  const ratio = 0.67 + ((window.innerWidth / window.innerHeight) * 0.5)

  renderer.setSize(window.innerWidth, window.innerHeight)
  meshes.scale.set(ratio, ratio, ratio)
}
const update = () => {
  init()
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
}

init()
window.addEventListener('resize', debounce(update))

const islandSize = 16
const islandSegments = 12
const island = new Mesh(
  new SphereBufferGeometry(
    islandSize,
    islandSegments / 2,
    islandSegments / 2,
    0,
    180 * D2R
  ),
  new MeshLambertMaterial({
    color: 0xffffff,
  })
)
island.rotateX(90 * D2R)
const surface = new Mesh(
  new CircleBufferGeometry(islandSize, islandSegments),
  new MeshLambertMaterial({
    color: 0xffffff,
  })
)
surface.receiveShadow = true
surface.rotateX(-90 * D2R)
const tree = new Group()
const top = new Mesh(
  new ConeBufferGeometry(4, 6, 5),
  new MeshLambertMaterial({
    color: 0xffffff,
  })
)
top.castShadow = true
const trunkHeight = 5
const trunk = new Mesh(
  new CylinderBufferGeometry(2, 2, trunkHeight, 10),
  new MeshLambertMaterial({
    color: 0xffffff,
  })
)
trunk.castShadow = true
top.translateY(trunkHeight)
tree.add(trunk, top)
tree.translateY(trunkHeight / 2)

meshes.add(island, surface, tree)
scene.add(meshes, light, lightHelper, cameraHelper)

draw()

document.body.appendChild(renderer.domElement)

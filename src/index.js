import {
  CameraHelper,
  CircleBufferGeometry,
  ConeBufferGeometry,
  CylinderBufferGeometry,
  DirectionalLight,
  DirectionalLightHelper,
  Math as ThreeMath,
  Mesh,
  MeshLambertMaterial,
  Object3D,
  PCFSoftShadowMap,
  PerspectiveCamera,
  Scene,
  SphereBufferGeometry,
  WebGLRenderer,
} from 'three'
import camera from './camera'
import light from './light'

light.shadow.camera.near = camera.near
light.shadow.camera.far = camera.far

const draw = () => {
  meshes.rotateY(-0.01)
  renderer.render(scene, camera)
}
const meshes = new Object3D()
const cameraHelper = new CameraHelper(light.shadow.camera)
const lightHelper = new DirectionalLightHelper(light, 15)

const renderer = new WebGLRenderer({
  alpha: true,
  antialias: true,
})
renderer.shadowMap.type = PCFSoftShadowMap
renderer.shadowMap.enabled = true
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setAnimationLoop(draw)

const scene = new Scene()
const init = () => {
  const ratio = 0.25 + (window.innerWidth * window.innerHeight) / 2500000

  renderer.setSize(window.innerWidth, window.innerHeight)
  meshes.scale.set(ratio, ratio, ratio)
}
const update = () => {
  init()
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
}

init()
window.addEventListener(
  'resize',
  (() => {
    let debounced

    return () => {
      if (debounced) {
        clearTimeout(debounced)
      }

      debounced = setTimeout(update, 100)
    }
  })()
)

const islandSize = 20
const islandSegments = 16
const island = new Mesh(
  new SphereBufferGeometry(islandSize, islandSegments / 2, islandSegments / 2, 0, Math.PI),
  new MeshLambertMaterial({
    color: 0xffffff,
  })
)
island.rotateX(90 * ThreeMath.DEG2RAD)
const surface = new Mesh(
  new CircleBufferGeometry(islandSize, islandSegments),
  new MeshLambertMaterial({
    color: 0xffffff,
  })
)
surface.receiveShadow = true
surface.rotateX(-90 * ThreeMath.DEG2RAD)
const tree = new Object3D()
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
meshes.rotateX(30 * ThreeMath.DEG2RAD)
scene.add(meshes, light, lightHelper, cameraHelper)

draw()

document.body.appendChild(renderer.domElement)

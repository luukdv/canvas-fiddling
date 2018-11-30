import {
  BoxBufferGeometry,
  ConeBufferGeometry,
  DirectionalLight,
  Mesh,
  MeshLambertMaterial,
  Object3D,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
  DirectionalLightHelper,
  CameraHelper
} from 'three'

const draw = () => {
  renderer.render(scene, camera)
}
const meshes = new Object3D()
const camera = new PerspectiveCamera(50, window.innerWidth / window.innerHeight)
camera.position.z = 100

const light = new DirectionalLight(0xffffff, 1)
light.position.set(-50, 0, 50)
light.castShadow = true

const directionalLightHelper = new DirectionalLightHelper(light, 15);
const cameraHelper = new CameraHelper(light.shadow.camera);

const renderer = new WebGLRenderer({
  alpha: true,
})
renderer.shadowMap.enabled = true
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setAnimationLoop(draw)

const scene = new Scene()
const init = () => {
  const ratio = 0.25 + ((window.innerWidth * window.innerHeight) / 2500000)

  renderer.setSize(window.innerWidth, window.innerHeight)
  meshes.scale.set(ratio, ratio, ratio)
}
const update = () => {
  init()
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
}

init()
window.addEventListener('resize', (() => {
  let debounced

  return () => {
    if (debounced) {
      clearTimeout(debounced)
    }

    debounced = setTimeout(update, 100)
  }
})())

const floorHeight = 1
const floor = new Mesh(
  new BoxBufferGeometry(30, floorHeight, 30),
  new MeshLambertMaterial({
    color: 0xffffff,
  })
)
floor.receiveShadow = true
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
  new BoxBufferGeometry(2, trunkHeight, 2),
  new MeshLambertMaterial({
    color: 0xffffff,
  })
)
trunk.castShadow = true
top.translateY(trunkHeight)
tree.add(trunk, top)
tree.translateY(floorHeight + ((trunkHeight - floorHeight) / 2))

meshes.add(floor, tree)
meshes.rotateX(0.5)
meshes.rotateY(0.5)
scene.add(meshes, light, directionalLightHelper, cameraHelper)

draw()

document.body.appendChild(renderer.domElement)

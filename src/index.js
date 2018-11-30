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
} from 'three'

const initialRatio = window.innerWidth / window.innerHeight
const meshes = new Object3D()
const camera = new PerspectiveCamera(50, initialRatio)
const light = new DirectionalLight(0xffffff, 1)
const renderer = new WebGLRenderer({
  alpha: true,
})
const scene = new Scene()

const draw = () => {
  meshes.rotateX(0.005)
  meshes.rotateY(0.01)
  meshes.rotateZ(0.01)
  renderer.render(scene, camera)
}
const init = () => {
  renderer.setSize(window.innerWidth, window.innerHeight)
}
const update = () => {
  const ratio = (initialRatio * (window.innerWidth * window.innerHeight)) / 1500000

  init()
  meshes.scale.set(ratio, ratio, ratio)
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

const plane = new Mesh(
  new BoxBufferGeometry(20, 1, 20),
  new MeshLambertMaterial({
    color: 0xffffff,
  })
)
const tree = new Object3D()
const top = new Mesh(
  new ConeBufferGeometry(4, 6, 5),
  new MeshLambertMaterial({
    color: 0xffffff,
  })
)
const trunkHeight = 5
const trunk = new Mesh(
  new BoxBufferGeometry(2, trunkHeight, 2),
  new MeshLambertMaterial({
    color: 0xffffff,
  })
)
top.translateY(trunkHeight)
tree.add(top, trunk)

// meshes.add(plane);
meshes.add(tree)
light.castShadow = true
camera.position.z = 100
scene.add(meshes, light)

draw()
renderer.shadowMap.enabled = true
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setAnimationLoop(draw)

document.body.appendChild(renderer.domElement)

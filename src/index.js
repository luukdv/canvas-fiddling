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

const meshes = new Object3D()
const camera = new PerspectiveCamera(50, window.innerWidth / window.innerHeight)
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
const setDimensions = () => {
  renderer.setSize(window.innerWidth, window.innerHeight)
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
}
const resize = () => {
  let debounced

  return () => {
    if (debounced) {
      clearTimeout(debounced)
    }

    debounced = setTimeout(setDimensions, 100)
  }
}

setDimensions()
window.addEventListener('resize', resize())

const plane = new Mesh(
  new BoxBufferGeometry(10, 1, 10),
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
light.position.set(150, 350, 350)
camera.position.z = 50
scene.add(meshes, light)

draw()
renderer.shadowMap.enabled = true
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setAnimationLoop(draw)

document.body.appendChild(renderer.domElement)

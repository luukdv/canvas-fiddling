import {
  BoxBufferGeometry,
  Color,
  DirectionalLight,
  FogExp2,
  Mesh,
  MeshLambertMaterial,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
} from 'three'

const camera = new PerspectiveCamera(50, window.innerWidth / window.innerHeight)
const canvas = document.querySelector('canvas')
const geometry = new BoxBufferGeometry(10, 1, 10)
const light = new DirectionalLight(0xffffff, 1)
const material = new MeshLambertMaterial({
  color: 0xf00000,
})
const mesh = new Mesh(geometry, material)
const renderer = new WebGLRenderer({
  alpha: true,
})
const scene = new Scene()

const draw = () => {
  mesh.geometry.rotateX(0.005)
  mesh.geometry.rotateY(0.01)
  mesh.geometry.rotateZ(0.01)
  renderer.render(scene, camera)
}
const setDimensions = () =>
  renderer.setSize(window.innerWidth, window.innerHeight)
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

light.position.set(150, 350, 350)
camera.position.z = 50
scene.add(
  mesh,
  light
)

draw()
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setAnimationLoop(draw)

document.body.appendChild(renderer.domElement)

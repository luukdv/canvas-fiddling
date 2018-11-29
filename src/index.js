import {
  BoxBufferGeometry,
  Color,
  FogExp2,
  Mesh,
  MeshNormalMaterial,
  PerspectiveCamera,
  Scene,
  WebGLRenderer
} from 'three'

const camera = new PerspectiveCamera(50, window.innerWidth / window.innerHeight)
const canvas = document.querySelector('canvas')
const geometry = new BoxBufferGeometry(0.2, 0.2, 0.2)
const material = new MeshNormalMaterial()
const mesh = new Mesh(geometry, material)
const renderer = new WebGLRenderer({
  alpha: true,
  antialias: true,
})
const scene = new Scene()

const draw = () => renderer.render(scene, camera)
const setDimensions = () => renderer.setSize(window.innerWidth, window.innerHeight)
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

mesh.geometry.rotateX(0.4)
mesh.geometry.rotateY(0.4)

camera.position.z = 1
scene.add(mesh)

draw()
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setAnimationLoop(draw)

document.body.appendChild(renderer.domElement)

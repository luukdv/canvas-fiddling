import { BoxGeometry, Mesh, MeshNormalMaterial, PerspectiveCamera, Scene, WebGLRenderer } from 'three'

const camera = new PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 10)
const canvas = document.querySelector('canvas')
const geometry = new BoxGeometry(0.2, 0.2, 0.2)
const material = new MeshNormalMaterial()
const mesh = new Mesh(geometry, material)
const renderer = new WebGLRenderer()
const scene = new Scene()

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

camera.position.z = 1
scene.add(mesh)
renderer.render(scene, camera)

document.body.appendChild(renderer.domElement)
